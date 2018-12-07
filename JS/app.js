// variables declaration

const start = document.getElementsByClassName('btn__reset')[0];
const qwerty = document.getElementById('qwerty');
const phrase = document.querySelector('#phrase');
var missed = 0;
const keyrows = document.getElementsByClassName('keyrow');
const overlay = document.getElementById('overlay');
const phrases = [
  'I know that I know nothing',
  'I have a dream',
  'Only Thing We Have to Fear Is Fear Itself',
  'I love you',
  'Keep it cool',
  'Keep going',
  'Keep your chin up',
  'Follow your heart'
  ];


  start.addEventListener('click',()=>{
      overlay.style.display ='none';

  });


  function getRandomPhraseAsArray(arr){
    var n=Math.floor(Math.random()*9);
    var phraseArray = arr[n].split("");
    return phraseArray;
  }

/*this function create an li, and append it to the ul element.
Also add a class to each li with a letter */

const phraseArray = getRandomPhraseAsArray(phrases);

  function addPhraseToDisplay(arr){
    arr.forEach(function(e){
      const ul=phrase.getElementsByTagName('ul')[0];
        let li= document.createElement('li');
        li.textContent=e;
        // console.log(li.textContent);
        if(e===' '){
          li.className = ' ';
        }else{
          li.className = "letter";
        }
        ul.appendChild(li);
    });
  }
addPhraseToDisplay(phraseArray);


/* Check letter function*/

function checkLetter(button){
      var buttonText= button.textContent;
      var buttonMatch= null;
  const letters = document.getElementsByTagName('li');
  Array.from(letters).forEach(function(letter){
        if(button.textContent === letter.textContent.toLowerCase()){

          letter.classList.add('show');
         buttonMatch= buttonText;

        }
    });
    return buttonMatch;
}

/* Click event added to the BUTTONS*/
qwerty.addEventListener('click',(e)=>{
  if (e.target.tagName== 'BUTTON'){
    const button = e.target;
    checkLetter(button);
    if(checkLetter(button) == null){
      missed+= 1;
      var hearts = document.querySelectorAll('.tries');
      hearts[missed-1].style.display='none';

    }
}

checkWin();
});
function checkWin(){
  var letterCount = document.querySelectorAll('.letter');
  var showCount = document.querySelectorAll('.show');
  letterCount = letterCount.length;
  showCount = showCount.length;
  if(letterCount == showCount){
    overlay.style.display ='';
    overlay.className='win';
  }
   if(missed>= 5) {
    overlay.style.display ='';
    overlay.className='lose';
  }
}
