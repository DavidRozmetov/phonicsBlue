import React from 'react'
import './App.css';
import './style/primaryButton.css'
import './index.css'

import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { signOut,onAuthStateChanged  } from 'firebase/auth'
import { auth } from './firebase-config.js'
import { ReadUser } from './firebase/ModifyUser.js';

//icons
import {MdManageAccounts, MdOutlineQuiz, MdGroups, MdFamilyRestroom} from "react-icons/md";
import {AiOutlineUsergroupAdd} from "react-icons/ai";
import {CgEnter} from "react-icons/cg";
import {IoHomeOutline} from "react-icons/io5";

//pages
import PrimaryButton from './components/PrimaryButton.js'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Signup from './pages/Signup.js'
import ForgotPassoword from './pages/ForgotPassword.js'
import CreateClassroom from './pages/CreateClassroom.js'
import JoinClassroom from './pages/JoinClassroom.js'
import EditClassroom from './pages/EditClassroom.js'
import MyClassrooms from './pages/MyClassrooms.js'
import Classroom from './pages/Classroom.js'
import Profile from './pages/Profile.js'
import AddStudent from './pages/AddStudent.js'
import AddFamilyMember from './pages/AddFamilyMember.js'
import FamilyMembers from './pages/FamilyMembers.js'
import Quiz from './pages/Quiz.js'
import QuizLevels from './pages/QuizLevels.js'
import AddQuestions from './pages/AddQuestions.js'
import UpdateQuestion from './pages/UpdateQuestion.js'
import Levels from './pages/Levels.js'
import CreateLevel from './pages/CreateLevel.js'
import Questions from './pages/Questions.js'

let userData = {};

 export const hideButtons = (groupName) =>{
    const list = document.querySelectorAll(groupName);
    list.forEach((l)=>{
      l.style.display = "none";
    });
  }

  export const showButtons = (groupName) =>{
    const list = document.querySelectorAll(groupName);
    list.forEach((l)=>{
      l.style.display = "flex";
    });
  }





function App() {

  const [userRole, setUserRole] = useState("");


  const logout = async () =>{
    await signOut(auth);
    console.log("logged out")

  
  }


  onAuthStateChanged(auth, async (user) => {
        hideButtons('.show-while-teacher');
        hideButtons('.show-while-student');
        hideButtons('.show-while-parent');
        hideButtons('.show-while-logout');


        showButtons('.always-show');
    if (user) {
      const uid = user.uid;

      //Load the user Data from ModifyU.js
      await ReadUser(uid).then((res) => {
        userData = res;
      });
    
      setUserRole(userData.userRole);

        upDateUI(userRole)
        
    } else {

        showButtons('.show-while-logout');
    }
  });


  const upDateUI = async (userRole) => {
    hideButtons('.show-while-teacher');
    hideButtons('.show-while-student');
    hideButtons('.show-while-parent');
    hideButtons('.show-while-logout');
    hideButtons('.show-while-admin');


    if(userRole == 'S'){
     showButtons('.show-while-student');

    // readStudentInformation(userProfileInformation.visibleId);
    
    } else if(userRole == 'T'){
      showButtons('.show-while-teacher');
    } else if (userRole == 'P'){
      showButtons('.show-while-parent');
    } else if (userRole == 'A'){
      showButtons('.show-while-admin');
    }

}


  return (
    <Router>
    <nav className = "nav-bar">

          <button onClick={logout} className = "primary-button show-while-student show-while-teacher show-while-parent show-while-admin">Sign out </button >
          <PrimaryButton text="Go back home" link="/" group = "always-show" buttonIcon = {<IoHomeOutline/>}/>
          <PrimaryButton text = "log in" link = "/login" group = "show-while-logout" buttonIcon = {<CgEnter/>}/>
          <PrimaryButton text = "Join a Classroom" link = "/joinclassroom" group = "show-while-student" buttonIcon={<AiOutlineUsergroupAdd/>}/>
          <PrimaryButton text = "My Classrooms" link = "/classrooms" group ="show-while-teacher" buttonIcon = {<CgEnter/>}/>
          <PrimaryButton text = "Profile" link = {"/profile/" + userData.visibleId} group = "show-while-student show-while-teacher show-while-parent show-while-admin" buttonIcon = {<MdManageAccounts/>}/>
          <PrimaryButton text = "My Family Members" link = {"/familymembers/" + userData.visibleId} group = "show-while-parent" buttonIcon = {<MdFamilyRestroom/>}/>
          <PrimaryButton text = "Quiz" link = {"/quiz/levels"} group = "always-show" buttonIcon = {<MdOutlineQuiz/>}/>
          <PrimaryButton text = "Questions" link = {"/levels"} group = "show-while-admin" />



      </nav>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/forgotpassword" element = {<ForgotPassoword />}/> 
        <Route path = "/createclassroom" element = {<CreateClassroom />} />
        <Route path = "/joinclassroom" element = {<JoinClassroom />} />
        <Route path = "/classrooms/:classroomId/editclassroom" element = {<EditClassroom />} />
        <Route path = "/classrooms/:classroomId/addstudent" element = {<AddStudent />} />
        <Route path = "/quiz/levels/:levelId" element = {<Quiz />} />
        <Route path = "/levels/:levelId/:questionId" element = {<UpdateQuestion />} />
        <Route path = "/quiz/levels" element = {<QuizLevels />} />
        
        <Route path = "/classrooms" element = {<MyClassrooms />} />
        <Route path = "/classrooms/:classroomId" element = {<Classroom />} />
        <Route path = "/profile/:userId" element = {<Profile />} />
        <Route path = "/familymembers/:parentId" element = {<FamilyMembers />} />
        <Route path = "/familymembers/:parentId/addstudent" element = {<AddFamilyMember />} />
        <Route path = "//levels/:levelId/new" element = {<AddQuestions />} />
        <Route path = "/levels" element = {<Levels />} />
        <Route path = "/levels/new" element = {<CreateLevel />} />
        <Route path = "/levels/:levelId" element = {<Questions />} />
        
      </Routes>
    </Router>
    
  );
}

export default App;
