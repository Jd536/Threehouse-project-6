document.addEventListener('DOMContentLoaded',()=>{

    // variables declaration

    const start = document.getElementsByClassName('btn__reset')[0];
    const qwerty = document.getElementById('qwerty');
    const phrase = document.querySelector('#phrase');
    const ul=phrase.getElementsByTagName('ul')[0];
    const hearts = document.querySelectorAll('.tries');
    const keyrows = document.getElementsByClassName('keyrow');
    const overlay = document.getElementById('overlay');
    let missed = 0;
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

    // start button reveals Game
    start.addEventListener('click',()=>{
        overlay.style.display ='none';

    });

    // pick a random sentence from the phrases array.
    function getRandomPhraseAsArray(arr){
      var n=Math.floor(Math.random()*9);
      var phraseArray = arr[n].split("");
      return phraseArray;
    }



    const phraseArray = getRandomPhraseAsArray(phrases);


    /*this function create an li, and append it to the ul element.
    Also add a class to each li with a letter */
    // add the random sentence to the phrase div ul
    function addPhraseToDisplay(arr){
    arr.forEach(function(e){

        let li= document.createElement('li');
        li.textContent=e;
      if(e===' '){
          li.className = ' ';
        }else{
          li.className = "letter";
        }
        ul.appendChild(li);
    });
    }

    addPhraseToDisplay(phraseArray);

    /*This function ReplacephraseToDisplay will replace
    the ul inside the phrase div by a new ul with a new random sentence */

    function replacePhraseToDisplay(arr){
    phrase.innerHTML=" ";
    let newUl =document.createElement('ul');
    arr.forEach(function(e){
        let li= document.createElement('li');
        li.textContent=e;
      if(e===' '){
          li.className = ' ';
        }else{
          li.className = "letter";
        }
          newUl.appendChild(li);
    });
    phrase.appendChild(newUl);
    }

    /* Check letter function*/

    function checkLetter(button){
    // checks whether the text content of the buttong clicked is equal to the text content of the li element added
    var buttonText= button.textContent;
        var buttonMatch= null; // used in the checkwin function
    const letters = document.getElementsByTagName('li');
    Array.from(letters).forEach(function(letter){
          if(button.textContent === letter.textContent.toLowerCase()){
          letter.classList.add('show');
            buttonMatch= buttonText;

          }
      });
      return buttonMatch;
    }


    // reset the game

    function reset (){
    start.textContent='Reset Game';
    start.addEventListener('click', ()=>{
    replacePhraseToDisplay(getRandomPhraseAsArray(phrases));
      missed=0;
      for(var i=0; i<hearts.length;i++){
        hearts[i].style.display='';
        const heartimage= hearts[i].querySelectorAll('img')[0];
        heartimage.src='images/liveHeart.png';
      }
    });
    return overlay.style.display
    }

    /* Click event added to the BUTTONS*/
    qwerty.addEventListener('click',(e)=>{
    if (e.target.tagName== 'BUTTON'){
      const button = e.target;
      checkLetter(button);
      if(checkLetter(button) == null){
        missed+= 1;
        const heartimage= hearts[missed-1].querySelectorAll('img')[0];
        heartimage.src='images/lostHeart.png';
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
      reset();
    }
        if(missed>= 5) {
      overlay.style.display ='';
      overlay.className='lose';
      reset();
      }
    }
});