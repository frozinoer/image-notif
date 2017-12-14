import fs from 'fs';
import assert from 'assert';
import Canvas from 'canvas-prebuilt';

const exportCanvasAsPNG = (canvas, path) => {

    assert.ok(canvas, "canvas cannot be undefined");
    assert.ok(path, "path cannot be undefined");

	return new Promise((resolve) => {
		const out = fs.createWriteStream(path);
        const stream = canvas.pngStream();
                
        stream.on('data', chunk => {
            out.write(chunk);
        }); 

        stream.on('end', () => {
            resolve(path);
        });
    });
}

const createCanvasForGoogleAssistant = () => {
    return new Canvas(1000, 666);
}

export default {
	exportCanvasAsPNG, createCanvasForGoogleAssistant
}
