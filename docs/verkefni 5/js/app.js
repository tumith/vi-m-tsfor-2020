window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

const frown = "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.001 14c-2.332 0-4.145 1.636-5.093 2.797l.471.58c1.286-.819 2.732-1.308 4.622-1.308s3.336.489 4.622 1.308l.471-.58c-.948-1.161-2.761-2.797-5.093-2.797zm-3.501-6c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z";
const smile = "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.507 13.941c-1.512 1.195-3.174 1.931-5.506 1.931-2.334 0-3.996-.736-5.508-1.931l-.493.493c1.127 1.72 3.2 3.566 6.001 3.566 2.8 0 4.872-1.846 5.999-3.566l-.493-.493zm-9.007-5.941c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z";


const boxbox = document.querySelector('#no_smile')
let toggle = false;

recognition.addEventListener('result', e => {
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
                {value: toggle ? smile : frown}
            ]
        }).add({
            targets: "#no_smile",
            rotate: toggle ? 0 : 360
        }, "-= 350").add({
            targets: "section",
            backgroundColor: toggle ? "rgb(255,255,255)" : "rgb(22,22,22)",
            color: toggle ? "rgb(22,22,22)" : "rgb(255,255,255)"
        }, "-= 700");

        if (!toggle){
            toggle = true;
            console.log(`frown : ${frown}`);
        }
        else{
            toggle = false;
            console.log(`smile : ${smile}`);
        }
     }
});

recognition.addEventListener('end', recognition.start);

recognition.start();