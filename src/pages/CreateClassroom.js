import React, {useState} from 'react'
import '../style/login.css'
import Icon from '../components/Icon.js'
import PrimaryButton from '../components/PrimaryButton.js'
import { AiOutlineUsergroupAdd} from "react-icons/ai";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref } from "firebase/database";
import { auth, database } from '../firebase-config.js'

import { ReadUser } from '../firebase/ModifyUser.js';
import { CreateAClassroom, ReadAClassroom } from '../firebase/ModifyClassroom.js';

const generateId = (role)=>{
		const result = (role + Math.round(Math.random()*9) + Math.round(Math.random()*9)+ Math.round(Math.random()*9) + Math.round(Math.random()*9)+ Math.round(Math.random()*9) + Math.round(Math.random()*9));
		return (result);
}

const classroomId = generateId("C");
let teacherId = '';
let teacherUid = '';
let classroomName = '';

const readTeacherId = async(uid) =>{
	await ReadUser(uid).then((res) => {teacherId =  res.visibleId});
}

const updateClassroomName = (newName) =>{
	classroomName = newName;
}




export default function CreateClassroom (){
	const db = getDatabase();
	const auth = getAuth();
	
	onAuthStateChanged(getAuth(), (user) => {
		if(user){
			teacherUid = auth.currentUser.uid;
			readTeacherId(teacherUid);
		}else{
			console.log("user is not signed in")
		}
	});

	return(
		
		<div className = "container">
			<div className = "main-page create-classroom-page">
				<Icon text={<AiOutlineUsergroupAdd/>}/>

				<div className ="login-form forgot-password-form">
					<h2 className ="page-title"> Create a Classroom </h2>
					<p>Please Enter Class name</p>
					<input type="text" placeholder="Classroom Name" onChange = {e=>{updateClassroomName(e.target.value)}}/>
					<h3 id="classroom-id">Classroom ID:  {classroomId}</h3>
					<button onClick = {()=>{
						CreateAClassroom(classroomId, classroomName, teacherId);
					}}> Create Classroom </button>
				
				</div>

				


       		</div>
		</div>
	)
}