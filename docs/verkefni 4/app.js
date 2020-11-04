// https://www.youtube.com/watch?v=CVClHLwv-4I fínt video fyrir hjálp með face-api.js
// https://www.youtube.com/watch?v=WQRK0UbNKOo fínt fyrir sma uplisingar um azure

// speech recocnision
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    const poopScript = transcript.replace(/poop|hello|shit|dump/gi, 'lkæjg');
    p.textContent = poopScript;
    console.log(poopScript);
    p.textContent = transcript;

     if (e.results[0].isFinal) {
       p = document.createElement('p');
       words.appendChild(p);
     }
});

recognition.addEventListener('end', recognition.start);

recognition.start();