import fs from 'fs';
import assert from 'assert';

const writeAsPNG = (canvas, path) => {

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

export default {
	writeAsPNG
}
