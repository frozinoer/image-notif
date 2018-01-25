const assert = require('assert');
const path = require('path');
const {imageLoader, background, utils, draw} = require("../dist/index");

const imagePath = path.resolve("test", "download.jpg");

const bannerParams = {
    style: "rgba(100, 0, 0, .95)",
    heightRatio: 0.2,
    text: {
        font: `400 40px "Open Sans"`,
        style: "#FFF",
        baseline: "middle"
    }
}

const images = {};

const createImageCanvasWithBanner = (imagePath, text, bannerParams, images) => {
    return imageLoader(imagePath, {})
        .then(image => {

            const canvas = utils.createCanvasForFacebookMessenger(image.width);
            background.image(canvas, image);

            const bannerHeight = image.height * bannerParams.heightRatio;
            draw.banner(canvas, {height: bannerHeight, y: canvas.height - bannerHeight, style: bannerParams.style});
            bannerParams.text.y = canvas.height - bannerHeight / 2;
            draw.text(canvas, bannerParams.text, text);
            return canvas;
        })
}



describe('Images with banner', function() {
  describe('Simple banner', function() {

    it('should generate an image', function() {

        createImageCanvasWithBanner(imagePath, "Pause coca de 4 heures", bannerParams, images)
            .then(canvas => {
                return utils.exportCanvasAsPNG(canvas, path.resolve("test", "withbanner.png"));
            })
        .catch(e => {
            console.log(e);
        });
    });
  });
});
