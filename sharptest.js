const sharp = require('sharp');
var fs = require('fs');

//const image = sharp('test.jpeg');
//const watermarkRaw = sharp('point.jpeg');

//image.metadata().then(metadata => console.log(metadata))

/*
sharp('test.jpeg')
.resize(10,10)
.toFile('point.png')
.then(data => console.log(data));
*/
/*
img=sharp('test.jpeg')
  .rotate()
  .resize(200)
  .toBuffer()
  .then( data => 'out' )
  .catch( err => 'error' );
*/
//input=sharp('test.jpeg')
//.composite([{ input: 'point.jpeg', gravity: 'southeast' }])
/*
const width = 10,
    r = width / 2,
    circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`);

sharp('download.png')
    .resize(width, width)
    .composite([{
        input: circleShape,
        blend: 'dest-in'
    }])
    .toFile('outputpoint.png', (err, info) => err ?
        console.error(err.message) :
        console.log(info)
    );
*/

/*
sharp('demo2_1.jpg').metadata().then(metadata => console.log(metadata))

combined=sharp('demo2_1.jpg')
.composite([{ input: 'outputpoint.png',top:261,left:397 }])
.composite([{ input: 'outputpoint.png',top:1140,left:367 }])
.withMetadata()
.toFile('output.png')
*/

const options = {
    raw: {
      width: 200,
      height: 100,
      channels: 4
    }
  };
  
  const base = sharp('demo2_1.jpg').raw().toBuffer();
  
  const composite = [
    'outputpoint.png',
    'outputpoint.png',
  ].reduce( function(input, overlay) {
    return input.then( function(data) {
      return sharp(data, options).composite(overlay).raw().toBuffer();
    });
  }, base);
  
  composite.then(function(data) {
    // data contains the multi-composited image as raw pixel data
  });

//397.0789571680448,261.9197907800341
//409.30162481760703,230.5622026614178
//'leftKnee: (367.19580268117704,1140.078656979572)',