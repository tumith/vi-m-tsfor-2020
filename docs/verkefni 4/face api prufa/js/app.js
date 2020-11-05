const imageUpload = document.getElementById('imageUpload');
// let predictedAges = [];

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.FaceExpressionNet.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models'),
    faceapi.nets.ssMobilenetv1.loadFromUri('/models')
]).then(start)    // var .then(startVideo)


function start() {
    const container = document.createElement('div');
    container.style.position = 'relative';
    document.body.append(container);
    document.body.append('Loaded');

    imageUpload.addEventListener('change', async () => {
        const image = faceapi.bufferToImage(imageUpload.file[0]);
        document.body.append(image);
        const canvas = faceapi.createCanvasFromMedia(image);
        container.append(canvas);
        const displaySize = { width: image.width, height: image.height };
        faceapi.matchDimensions( canvas,displaySize );
        const detections = await faceapi.detectAllFaces(imgae).withFaceLandmarks().withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        resizedDetections.forEach(detection =>{
            const box = detection.detection.box
            const drawBox = new faceapi.draw.drawBox(box,{ lable: 'Face' });
            drawBox.draw(canvas);
        })
    });
}

/* function startVideo() {
     navigator.getUserMedia(
         { video: {} },
         stream => (video.srcObject = stream),
         err =>  console.error(err)
     )
}*/

/*video.addEventListener('playing', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval( async () =>{
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetector()).withFaceLandmarks().withFaceExpressions().withAgeAndGender();
        const resizedDetections = faceapi.resizedResults(detections, displaySize);

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        const age = resizedDetections[0].age;
        const interpolatedAge = interpolatedAgePredictions(age);
        const bottomRight = {
            x: resizedDetections[0].detection.box.bottomRight.x - 50,
            y: resizedDetections[0].detection.box.bottomRight.y
        }

        new faceapi.draw.DrawTextField(
            [`${faceapi.utils.round(interpolatedAge, 0)} years`],
            bottomRight
        ).draw(canvas);

        console.log(interpolatedAge);
    }, 100);
});

function interpolatedAgePredictions(age) {
    predictedAges = [age].concat(predictedAges).slice(0,30);
    const avgPredictedAge = predictedAges.reduce((total, a) => total + a) / predictedAges.length;
    return avgPredictedAge;
}*/