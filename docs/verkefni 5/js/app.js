window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

const frown = "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.001 14c-2.332 0-4.145 1.636-5.093 2.797l.471.58c1.286-.819 2.732-1.308 4.622-1.308s3.336.489 4.622 1.308l.471-.58c-.948-1.161-2.761-2.797-5.093-2.797zm-3.501-6c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z";
const smile = "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.507 13.941c-1.512 1.195-3.174 1.931-5.506 1.931-2.334 0-3.996-.736-5.508-1.931l-.493.493c1.127 1.72 3.2 3.566 6.001 3.566 2.8 0 4.872-1.846 5.999-3.566l-.493-.493zm-9.007-5.941c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z";

const baby = "M21.292 10.349c-.36-3.908-2.698-6.58-6.2-7.562-.874-.246-2.617-.622-1.092-2.787-4.87 0-10.729 4.235-11.292 10.349-1.859.165-2.708 1.921-2.708 3.964 0 1.755.975 3.967 3.104 4.891 2.935 5.371 7.534 5.796 8.896 5.796s5.961-.425 8.896-5.796c2.129-.925 3.104-3.136 3.104-4.891 0-2.019-.841-3.798-2.708-3.964zm-1.425 7.11c-.246.083-.45.259-.569.491-2.406 4.686-6.194 5.05-7.298 5.05s-4.892-.364-7.298-5.05c-.119-.231-.323-.407-.569-.491-2.448-.829-2.553-4.364-1.553-5.012.235-.152.531-.116.671-.053.661.293 1.406-.191 1.406-.914 0-1.019.151-1.938.43-2.757 1.092-2.56 3.121 1.364 6.913 1.364 3.793 0 5.822-3.925 6.913-1.363.278.819.43 1.738.43 2.756 0 .725.746 1.207 1.406.914.14-.063.436-.1.671.053 1 .648.895 4.183-1.553 5.012zm-3.367-3.959c0 .828-.56 1.5-1.25 1.5s-1.25-.672-1.25-1.5.56-1.5 1.25-1.5 1.25.672 1.25 1.5zm-7.75 1.5c-.69 0-1.25-.672-1.25-1.5s.56-1.5 1.25-1.5 1.25.672 1.25 1.5-.56 1.5-1.25 1.5zm.25 3h6s-.765 2.354-3 2.354c-2.153 0-3-2.354-3-2.354z";
const man = "M16.5 13.5c0 .828-.56 1.5-1.25 1.5s-1.25-.672-1.25-1.5.56-1.5 1.25-1.5 1.25.672 1.25 1.5zm-7.75-1.5c-.69 0-1.25.672-1.25 1.5s.56 1.5 1.25 1.5 1.25-.672 1.25-1.5-.56-1.5-1.25-1.5zm15.25 2.313c0 1.765-.985 3.991-3.139 4.906-2.063 3.295-4.987 5.781-8.861 5.781-3.741 0-6.846-2.562-8.861-5.781-2.154-.916-3.139-3.142-3.139-4.906 0-2.053.754-3.026 1.417-3.489-.39-1.524-1.03-5.146.963-7.409.938-1.065 2.464-1.54 4.12-1.274.719-1.532 3.612-2.141 5.5-2.141 3 0 6.609.641 9.141 3.516 1.969 2.236 1.648 5.741 1.388 7.269.676.446 1.471 1.419 1.471 3.528zm-9.6 4.687h-4.8s.678 1.883 2.4 1.883c1.788 0 2.4-1.883 2.4-1.883zm7.063-6.508c-4.11.393-7.778-3.058-9.073-5.274-.081.809.186 2.557.969 3.355-3.175.064-5.835-1.592-7.46-3.868-.837 1.399-1.242 3.088-1.242 4.775 0 .722-.746 1.208-1.406.914-.14-.063-.436-.101-.671.053-1 .648-.895 4.183 1.553 5.012.224.076.413.228.536.43.655 1.086 1.354 1.98 2.086 2.722.922.633 1.056-1.875 1.667-2.72.686-.949 2.455-1.126 3.578-.322 1.124-.804 2.892-.627 3.578.322.611.846.745 3.354 1.667 2.72.731-.741 1.43-1.636 2.086-2.722.123-.202.313-.354.536-.43 2.363-.8 2.596-4.185 1.596-4.967z";

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
      document.getElementsByClassName('smile')[0].setAttribute('d',(toggle ? smile : frown));

       if (!toggle){
           toggle = true;
           console.log(`frown : ${frown}`);
       }
       else{
           toggle = false;
           console.log(`smile : ${smile}`);
       }
    }

    if (transcript.includes('grow')){
        document.getElementsByClassName('smile')[0].setAttribute('d',(toggle ? man : baby));

       if (!toggle){
           toggle = true;
           console.log(`frown : ${baby}`);
       }
       else{
           toggle = false;
           console.log(`smile : ${man}`);
       }
    }

    if (transcript.includes('break')){
        let x = 1
        while(x === 1){
        window.location.reload()
        }
        window.onbeforeunload = confirmExit;
            function confirmExit() {
                return "You have attempted to leave this page. Are you sure?";
            }
    }
});

recognition.addEventListener('end', recognition.start);

recognition.start();