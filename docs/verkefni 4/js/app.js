const video = document.getElementById('video');
let predictedAges = [];

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUrl('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUrl('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUrl('/models'),
    faceapi.nets.FaceExpressionNet.loadFromUrl('/models'),
    faceapi.nets.ageGenderNet.loadFromUrl('/models')
]).then(startVideo);


function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => (video.srcObject = stream),
        err =>  console.error(err)
    )
}

video.addEventListener('playing', () => {
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
    }, 100);
});