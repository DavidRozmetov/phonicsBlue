import React, {useState} from 'react'
import '../style/login.css'
import Icon from '../components/Icon.js'
import PrimaryButton from '../components/PrimaryButton.js'
import { AiOutlineUsergroupAdd} from "react-icons/ai";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref } from "firebase/database";
import { auth, database } from '../firebase-config.js'

import { ReadUser } from '../firebase/ModifyUser.js';
import { CreateALevel, ReadALevel } from '../firebase/ModifyLevel.js';

const generateId = (role)=>{
		const result = (role + Math.round(Math.random()*9) + Math.round(Math.random()*9)+ Math.round(Math.random()*9) + Math.round(Math.random()*9)+ Math.round(Math.random()*9) + Math.round(Math.random()*9));
		return (result);
}

const levelId = generateId("L");
let adminId = '';
let adminUid = '';
let levelName = '';

const readAdminId = async(uid) =>{
	await ReadUser(uid).then((res) => {adminId =  res.visibleId});
}

const updateLevelName = (newName) =>{
	levelName = newName;
}




export default function CreateLevel (){
	const db = getDatabase();
	const auth = getAuth();
	
	onAuthStateChanged(getAuth(), (user) => {
		if(user){
			adminUid = auth.currentUser.uid;
			readAdminId(adminUid);
		}else{
			console.log("user is not signed in")
		}
	});

	return(
		
		<div className = "container">
			<div className = "main-page create-classroom-page">
				<Icon text={<AiOutlineUsergroupAdd/>}/>

				<div className ="login-form forgot-password-form">
					<h2 className ="page-title"> Create a Level </h2>
					<p>Please Enter Class name</p>
					<input type="text" placeholder="Classroom Name" onChange = {e=>{updateLevelName(e.target.value)}}/>
					<h3 id="classroom-id">Level ID:  {levelId}</h3>
					<button onClick = {()=>{
						CreateALevel(levelId, levelName, adminId);
					}}> Create Level </button>
				
				</div>

				


       		</div>
		</div>
	)
}