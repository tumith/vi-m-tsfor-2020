window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

const firstPath = "M151 70C151 108.66 117.197 140 75.5 140C33.8025 140 0 108.66 0 70C0 31.3401 33.8025 0 75.5 0C117.197 0 151 31.3401 151 70Z";

const secoundPath = "M68.5 63.5C68.5 98.5701 106.332 127 68.5 127C30.6685 127 0 98.5701 0 63.5C0 28.4299 30.6685 0 68.5 0C106.332 0 68.5 28.4299 68.5 63.5Z";

const no_smile = document.querySelector('#no_smile')
let toggle = false;

recognition.addEventListener('result', e =>{
    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    const poopScript = transcript.replace(/poop|poo|shit|dump/gi, 'poop');
    p.textContent = poopScript;
    console.log(poopScript);
    p.textContent = transcript;

     if (e.results[0].isFinal) {
       p = document.createElement('p');
       words.appendChild(p);
     }

     if (transcript.includes('smile')){ 
        const timeline = anime.timeline({
            duration : 750,
            easing : "easeOutExpo"
        });
        timeline.add({
            targets : ".smile",
            d : [
                {value: secoundPath}
            ]
        });
    }
});
console.log(p)
recognition.addEventListener('end', recognition.start);

recognition.start();