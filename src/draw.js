const getImageClipping = (image) => {

	let clipping = {x: 0, y:0, width:image.width, height:image.width};

	if (image.width > image.height) {
		const shift = image.width - image.height;
		clipping = {x: shift/2, y:0, width:image.height, height:image.height};
	} else if (image.width < image.height) {
		const shift = image.height - image.width;
		clipping = {x: 0, y: shift/2, width:image.width, height:image.width};		
	}

	return clipping;

}

const contour = (canvas, round, contour) => {
	const ctx = canvas.getContext("2d");
	ctx.strokeStyle = contour.style;
	ctx.lineWidth = contour.width;
	ctx.beginPath();
	ctx.arc(round.x + round.width / 2, round.y + round.width / 2, round.width / 2 - 1, 0, Math.PI * 2, true);
	ctx.stroke();

}

const roundedImage = (canvas, round, ct, image) => {

	const ctx = canvas.getContext("2d");

	ctx.save();

	ctx.beginPath();
	ctx.arc(round.x + round.width / 2, round.y + round.width / 2, round.width / 2, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const clipping = getImageClipping(image);


	ctx.drawImage(image, clipping.x, clipping.y, clipping.width, clipping.width, round.x, round.y, round.width, round.width);

	ctx.restore();
//	ctx.restore();

	contour(canvas, round, ct);
}

const centeredImage = (canvas, p, img) => {
	const ctx = canvas.getContext("2d");
	if (!p.height) {
		p.height = img.height * p.width / img.width;
	}
	ctx.drawImage(img, 0, 0, img.width, img.height, (canvas.width - p.width) / 2, p.y, p.width, p.height);

}

const roundedText = (canvas, round, contour, plus, text) => {
	const ctx = canvas.getContext("2d");

//	ctx.drawImage(image, round.x, round.y, round.width, round.width);
	ctx.fillStyle = "rgba(19, 130, 126, 1)";
	ctx.lineWidth = 0;
	ctx.beginPath();
	ctx.arc(round.x + round.width / 2, round.y + round.width / 2, round.width / 2, 0, Math.PI * 2, true);
	ctx.fill();
	drawText(canvas, plus, text);

	drawContour(canvas, round, contour);
}

const getTextWidth = (canvas, p, text) => {

	const ctx = canvas.getContext("2d");

	ctx.font = `normal ${p.font.weight} ${p.font.size}px ${p.font.family}`;
	ctx.textAlign = p.align;
	ctx.fillStyle = p.style;
	return ctx.measureText(text).width;
}

const text = (canvas, p, text) => {

	const ctx = canvas.getContext("2d");

	ctx.font = p.font;
	ctx.textAlign = (p.align) ? p.align : "left";		
	ctx.fillStyle = (p.style) ? p.style : "#000";
	ctx.textBaseline = (p.baseline) ? p.baseline : "alphabetic";	

	const width = ctx.measureText(text).width;

	if (!p.x) {
		p.x = (canvas.width - width) / 2;
	}

	ctx.fillText(text, p.x, p.y);
	return width;
}

const multiLineText = (canvas, p, text, maxLineWidth) => {

	const ctx = canvas.getContext("2d");

	ctx.font = p.font;
	ctx.textAlign = (p.align) ? p.align : "left";		
	ctx.fillStyle = (p.style) ? p.style : "#000";

	const width = ctx.measureText(text).width;

	let y = p.y;

	if (width <= maxLineWidth) {
		y += p.font.lineHeight;
		ctx.fillText(text, p.x, y + p.font.size);

	} else {
		const words = text.split(/\s+/);
		let line = '';

	    for (let i = 0; i < words.length; i++) {
	    	const testLine = line + words[i] + ' ';
	      	const testWidth = ctx.measureText(testLine).width;
	      	if (testWidth > maxLineWidth && i > 0) {
				ctx.fillText(line, p.x, y + p.font.size);
	        	line = words[i] + ' ';
	        	y += p.font.lineHeight;
	      	}
	      	else {
	        	line = testLine;
		    }
	    }
		ctx.fillText(line, p.x, y + p.font.size);
	}

}

const banner = (canvas, p) => {
	const ctx = canvas.getContext("2d");
	ctx.fillStyle = p.style;
    ctx.fillRect(0, p.y, canvas.width, p.y + p.height);	
}

export default {
  getImageClipping, centeredImage, roundedImage, roundedText, contour, getTextWidth, text, multiLineText, banner
}

