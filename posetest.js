
//home brew ffmepg
//npm install @tensorflow/tfjs-node
//npm install @tensorflow-models/posenet
//npm install ffmpeg
const tf = require('@tensorflow/tfjs-node');
const posenet = require('@tensorflow-models/posenet');
const fs = require('fs');
const {
    createCanvas, Image
} = require('canvas')
const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;

let poses = [];

var ffmpeg = require('ffmpeg');

let video_name='demo.avi'

function posenetWrapper(video_name){


try {
	var process = new ffmpeg(video_name);
	process.then(function (video) {
        console.log(video.metadata)
		// Callback mode
		fr=video.fnExtractFrameToJPG('frames', {
            every_n_seconds : 1,
            start_time:0,
            //duration_time:2,
			//frame_rate : 10,
			//number : 5,
			//file_name : 'my_frame'
		}, function (error, files) {
			if (!error)
				console.log('Frames: ' + files);
        });
        console.log(fr)
	}, function (err) {
		console.log('Error: ' + err);
	});
} catch (e) {
	console.log(e.code);
	console.log(e.msg);
}



const tryModel = async(img) => {
    //console.log('start');
    const net = await posenet.load();
    //console.log(img)
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const input = tf.browser.fromPixels(canvas);
    const pose = await net.estimateSinglePose(input, imageScaleFactor, flipHorizontal, outputStride);
    //console.log(pose);
    let temp=[]
    for(const keypoint of pose.keypoints) {
        //console.log(`${keypoint.part}: (${keypoint.position.x},${keypoint.position.y})`);
        temp=temp.concat(`${keypoint.part}: (${keypoint.position.x},${keypoint.position.y})`)
    }
    poses=poses.concat(temp);
    //console.log(poses)
    console.log('end');
}


async function tryModel2 (img,net){

    console.log(img)
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const input = tf.browser.fromPixels(canvas);
    const pose =  await net.estimateSinglePose(input, imageScaleFactor, flipHorizontal, outputStride);

    let temp=[]
    for(const keypoint of pose.keypoints) {
        //console.log(`${keypoint.part}: (${keypoint.position.x},${keypoint.position.y})`);
        temp=temp.concat(`${keypoint.part}: (${keypoint.position.x},${keypoint.position.y})`)
    }
    poses=poses.concat(temp);
 
}

var img_name

async function tasks(){
    const net =  await posenet.load();

    
    for(i=1;i<30;i++){
        const img = new Image();
        img_name='frames/demo_'+i+'.jpg'
        //console.log(img_name)
        img.src = img_name;
        
        await tryModel2(img,net);
            
    }
    console.log(poses)
   
 
let data = JSON.stringify(poses);
fs.writeFileSync('save.json', data);
}


tasks();

}

posenetWrapper(video_name);
