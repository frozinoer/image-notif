const color = (canvas, style) => {
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = style;
    ctx.fillRect(0, 0, canvas.width, canvas.height);	
}

const image = (canvas, image) => {
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);	
}

export default {
  color, image
}
