import React, { useState, useEffect } from 'react';
import { auth } from '../firebase-config.js';
import { onAuthStateChanged } from 'firebase/auth';
import PrimaryButton from '../components/PrimaryButton.js'
import {ReadUser} from '../firebase/ModifyUser.js'
import {hideButtons, showButtons} from '../App.js'
import {ImTrophy} from "react-icons/im";
import {MdManageAccounts, MdOutlineQuiz, MdGroups, MdFamilyRestroom} from "react-icons/md";
import {AiOutlineUsergroupAdd} from "react-icons/ai";
import {CgEnter} from "react-icons/cg";



export default function Home(){


  const [user, setUser] = useState({});
  const [uid, setUid] = useState("")
  const [userData, setUserData] = useState({})
  const [userLevel, setUserLevel] = useState(localStorage.getItem("level"))



  onAuthStateChanged(auth, (currentUser) => {
    if(currentUser){
      setUid(currentUser.uid);
      setUser(currentUser); 
    }
    
  })

  useEffect(()=>{
    
    if(uid){
       ReadUser(uid).then((u)=>{
      setUserData(u)
      setUserLevel(u.userLevel)

    })   
    }

  },[uid]);

   

  return (        
        <div className = "main-page home-page">
          
            <h1 className = "page-title " > Hello {userData.userName}</h1>
            <h1  className = "page-title" > <ImTrophy/> Level {userLevel}</h1>
          <PrimaryButton text = "log in" link = "/login" group = "show-while-logout" buttonIcon = {<CgEnter/>}/>
          <PrimaryButton text = "Join a Classroom" link = "/joinclassroom" group = "show-while-student" buttonIcon={<AiOutlineUsergroupAdd/>}/>
          <PrimaryButton text = "My Classrooms" link = "/classrooms" group ="show-while-teacher" buttonIcon = {<MdGroups/>}/>
          <PrimaryButton text = "Profile" link = {"/profile/" + userData.visibleId} group = "show-while-student show-while-teacher show-while-parent show-while-admin" buttonIcon = {<MdManageAccounts/>}/>
          <PrimaryButton text = "My Family Members" link = {"/familymembers/" + userData.visibleId} group = "show-while-parent" buttonIcon ={<MdFamilyRestroom/>}/>
          <PrimaryButton text = "Quiz" link = {"/quiz/levels"} group = "always-show" buttonIcon = {<MdOutlineQuiz/>}/>
          <PrimaryButton text = "Questions" link = {"/levels"} group = "show-while-admin"/>
        </div>
  )
}
  