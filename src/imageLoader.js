import _ from 'lodash';
import axios from 'axios';
import isNode from 'detect-node';
import assert from 'assert';


if (typeof Image == "undefined") {
    System.import('canvas-prebuilt').then(Canvas => {
        global.Image = Canvas.Image;
    });
//    global.Image = require('canvas-prebuilt').Image;
}


const httpRegex = /^https?:\/\//i;

export default (path, images) => {

    assert.ok(path, "path cannot be undefined");
    assert.ok(images, "images cannot be undefined");

    if (images[path]) {
        return Promise.resolve(images[path]);
    }

    let fn = loadLocal;
    if (httpRegex.exec(path) || !isNode) {
        fn = loadHttp;
    }

    return fn(path).then(image => {
        images[path] = image;
        return Promise.resolve(image);
    });
}


const loadHttp = url => {
    return new Promise((resolve, reject) => {

        axios.request({
                responseType: 'arraybuffer',
                url: url,
                method: 'get'
            })
            .then((result) => {

                const image = new Image;
                image.onload = () => {
                    resolve(image);
                };
                image.onerror = err => {
                    console.log("Error loading url: " + url);
                    reject(err);
                };
                image.src = new Buffer(result.data, 'binary');
            })
    });
};

const loadLocal = path => {

    return System.import('fs')
        .then(fs => {
            return new Promise((resolve, reject) => {
                fs.readFile(path, (err, content) => {
                    if (err) {
                        reject(err);
                    } else {
                        const image = new Image;
                        image.src = content;
                        resolve(image);
                    }
                });
            });

        });
};
