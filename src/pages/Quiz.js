import React, {useState, useEffect} from 'react'
import '../style/quiz.css'
import '../index.css'
import {storage, db} from '../firebase-config.js'
import { getStorage, ref } from "firebase/storage";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import speakerIcon from "../assets/img/speaker.png";
import soundCorrect from "../assets/audio/correct.mp3";
import {ReadQuestion, getLevelQuestions} from "../firebase/ModifyQuestion.js"
import { ReadUser, UpdateUserLevel} from '../firebase/ModifyUser.js';
import { useParams } from "react-router-dom";

export default function Quiz (){

let {levelId} = useParams();  


let clicked = false;




let sCorrect = `</p>
        <div class = "check-box">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path class="hero-correct" fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>`;

let sIncorrect = `
      </p>
        <div class = "check-box">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" "
             viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve">
             <polygon points="11.387,490 245,255.832 478.613,490 489.439,479.174 255.809,244.996 489.439,10.811 478.613,0 245,234.161 
             11.387,0 0.561,10.811 234.191,244.996 0.561,479.174 "/>
        </svg>
        </div>
      
`;
  
const auth = getAuth();
 onAuthStateChanged(auth, async (user) => {
       if (user) {
        // setCurrentUserInformation(user);

        if(!currentUserInformation.userLevel){
          readCurrentUserInformation(user.uid).then(points = (currentUserInformation.userLevel * 100))
        }
        

        document.getElementById('level').innerText = ("Level " + currentUserInformation.userLevel);
        points = currentUserInformation.userLevel*100;
       } else{
        points = parseInt(localStorage.getItem('points'))
        oldPoints = parseInt(localStorage.getItem('oldPoints'))

       }
      
      
      
  });
    // const audioCorrect = new Howl({
    //   soundCorrect,
    //   html: true
    // });

  // console.log(soundCorrect)
  // function playCorrectSound(){
      


    // audioIncorrect.play()
  // }
  


// let audioIncorrect = document.getElementById("audioIncorrect");
// audioIncorrect.volume = 0.3;
// audioCorrect.volume = 0.3;

let question = [];
let points = 0;
let oldPoints = 0; 


let questionImage = ""



try{
  document.getElementById('level').innerText = ("Level " + Math.ceil(points/100));
} catch(e){

}
// document.getElementById('progress-bar').style = "--width:" + points%100;

changeProgress(oldPoints%100, points%100);






// // document.getElementById('question').addEventListener('click', ()=>{say(question[3]);});
// // document.getElementById('speaker').addEventListener('click', ()=>{say(question[3]);});


// //console.log(document.getElementById('a').innerText === 'ant')

function evaluate (choice){
  question[3] = (question[3] + "").toUpperCase()
  question[2] = (question[2] + "").toUpperCase()
  question[1] = (question[1] + "").toUpperCase()
  question[0] = (question[0] + "").toUpperCase()
  if(!clicked){
   clicked = true;
    let oldPoints = points;
    if(question[3] === choice.innerText){
      points += 10;

      // playCorrectSound();
      choice.classList.add("correct-button");
      // document.getElementById().classList.add("correct-button");
    // class = "black-and-white"
    } else{
      if(points >= 5 ){
        points -= 5;  
      }
      
      // audioIncorrect.play();
      choice.classList.add("incorrect-button");
      if(question[3] === question[0]){
        document.getElementById('a').classList.add("correct-button");
      } else if(question[3] === question[1]){
        document.getElementById('b').classList.add("correct-button");
      }else if(question[3] === question[2]){
        document.getElementById('c').classList.add("correct-button");
      }
    }
    
    //updateUserLevel

    if(Math.ceil(oldPoints/100) != Math.ceil(points/100)){
      if(auth.currentUser){
         UpdUserLevel(auth.currentUser.uid, Math.ceil(points/100))   
      }
     

    }

    document.getElementById('level').innerText = ("Level " + Math.ceil(points/100));
  // document.getElementById('progress-bar').style = "--width:" + points%100;

  changeProgress(oldPoints, points);
    localStorage.setItem("oldPoints", oldPoints);
    localStorage.setItem("points", points);
    
    if (Math.ceil(points/100) > Math.ceil(oldPoints/100)){

      localStorage.setItem("level", Math.ceil(points/100));    



    }
    setTimeout(function(){
      
      clicked = false;
      newQuestion();
    }, 1500);

  }
}

function newQuestion(){
 let tempQuestions = getRandomQuestion()
if(tempQuestions){
  questionImage = tempQuestions["url"] 
  let tempArray = [tempQuestions["optionA"], tempQuestions["optionB"], tempQuestions["optionC"]]
 question = pickQuestion(tempArray, 3);
}
 

 

  



  document.getElementById('a').classList.remove('correct-button');
  document.getElementById('b').classList.remove('correct-button');
  document.getElementById('c').classList.remove('correct-button');
  document.getElementById('a').classList.remove('incorrect-button');
  document.getElementById('b').classList.remove('incorrect-button');
  document.getElementById('c').classList.remove('incorrect-button');


  document.getElementById('a').innerHTML ="<p> " + question[0] +sIncorrect;
  document.getElementById('b').innerHTML ="<p> " + question[1] +sIncorrect;
  document.getElementById('c').innerHTML = "<p> " + question[2] +sIncorrect;


if (question[0] === question[3]){
  document.getElementById('a').innerHTML = "<p> " + question[0] +sCorrect; 
}
if (question[1] === question[3]){
  document.getElementById('b').innerHTML = "<p> " + question[1] +sCorrect;
}
if (question[2] === question[3]){
  document.getElementById('c').innerHTML = "<p> " + question[2] +sCorrect;
} 
  // say(question[3]);
  document.getElementById('question').src = questionImage;


} 



function pickQuestion(e, l) {
  let tempData =  [];
  let r = Math.floor(Math.random()*6)

  if(r == 0){
    tempData = [e[0], e[1], e[2], e[0]]
  } else if(r == 1){
    tempData = [e[0], e[2], e[1], e[0]]
  } else if(r == 3){
    tempData = [e[1], e[0], e[2], e[0]]
  }  else if(r == 4){
    tempData = [e[1], e[2], e[0], e[0]]
  }  else if(r == 5){
    tempData = [e[2], e[0], e[1], e[0]]
  }  else if(r == 2){
    tempData = [e[2], e[1], e[0], e[0]]
  }

  return tempData;
} 



function changeProgress(number1, number2){
 let i = 0;
 let num = number1;
 let n = (number2 - number1)/100;

  let intervalA = setInterval(()=>{
    num = num + n;  
    try{
      document.getElementById('progress-bar').style = "--width:" + num%100;  
    } catch(e){
      
    }
    

    i = i + 1;
    if (i == 100){
      clearInterval(intervalA);
    }
  },5)


}



  const [cloudQuestions, setCloudQuestions] = useState([]);
  const [currentUserInformation, setCurrentUserInformation] = useState({});

  const getQuestions = async(level) => {
    await getLevelQuestions(level).then((res)=>{
      setCloudQuestions(res);

  })
}



 const getRandomQuestion = () => {
    return(cloudQuestions[Math.floor(Math.random() * cloudQuestions.length)])
  }


  const readCurrentUserInformation = async(uid) => {
  await ReadUser(uid).then((res) => {
    setCurrentUserInformation(res);
    
  });
}

const UpdUserLevel = async(uid, lvl) => {

  await UpdateUserLevel(auth.currentUser.uid, lvl);  
}


useEffect(() => { 
    
      

  if(auth.currentUser){
   const uid = auth.currentUser.uid; 
    readCurrentUserInformation(uid).then(points = (currentUserInformation.userLevel * 100))


  } else{
    if (localStorage.getItem("points")){
      points = parseInt(localStorage.getItem("points"));
    } else {
      points = 0;

    }

    if (!localStorage.getItem("level")){
      localStorage.setItem("level", Math.ceil(points/100));
    }
  }

  getQuestions(levelId)


  newQuestion()
}, []);

  
 


  return(

<div className = "main-page quiz-container">
    <audio id="audioCorrect">
      <source src="https://firebasestorage.googleapis.com/v0/b/phonicsproject-9da80.appspot.com/o/assets%2Fcorrect.mp3?alt=media&token=9c5db970-7c04-494c-8eb6-6371247b1fe8" type="audio/mp3" />
    </audio>
    <audio id="audioIncorrect">
      <source src="https://firebasestorage.googleapis.com/v0/b/phonicsproject-9da80.appspot.com/o/assets%2Fincorrect.mp3?alt=media&token=2b049a3b-acde-4e0f-bf05-21cc8ecb9459" type="audio/mp3" />
    </audio>
    <div className ="top-box">    
      <p id = "level"></p>
      <div className="progress-bar" id="progress-bar" data-label = "&nbsp;" ></div> 
    </div>
    <div className="image-box">
       <img src="https://firebasestorage.googleapis.com/v0/b/phonicsproject-9da80.appspot.com/o/level-1%2FAnt.png?alt=media&token=5c94e475-fca7-4192-86ca-554ce720890b" id="question" />
      <button id="speaker"><img src={speakerIcon} id="speaker" /></button>
    </div>

    <div className="choice-box">
  
      <button id="a" 
      className="hero-button" 
      onClick={(e)=>{
          evaluate(document.getElementById('a'));

      }}> <p></p></button>
      <button 
        id="b" 
        className="hero-button"
        onClick={(e)=>{
          evaluate(document.getElementById('b'))
        }}> 
        <p></p></button>
      <button 
        id="c" 
        className="hero-button"
        onClick={(e)=>{
          evaluate(document.getElementById('c'))
        }}
      > 
        <p></p>
        <div className="check-box">
          <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path className="hero-correct" fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>

      </button>
      
    </div>

  </div>
  )

}