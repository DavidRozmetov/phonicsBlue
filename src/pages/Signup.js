import { React, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth } from 'firebase/auth'
import { getDatabase, ref, set } from "firebase/database";
import { CreateUser } from '../firebase/ModifyUser.js';
import { CreateStudent } from '../firebase/ModifyStudent.js'
import { auth, database } from '../firebase-config.js'
import {useNavigate} from 'react-router-dom';
import '../style/login.css'
import Icon from '../components/Icon.js'
import PrimaryButton from '../components/PrimaryButton.js'

import { IoPersonAdd} from "react-icons/io5";
import { FiMail} from "react-icons/fi";
import { AiFillEyeInvisible, AiFillEye} from "react-icons/ai";




export default function Signup (){
	let navigate = useNavigate();
	const [generatedId, setGeneratedId] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [userRole, setUserRole] = useState("S");

	const[userName, setUserName] = useState("Montira");
	const[userSurname, setUserSurname] = useState("Tongnongbua");
	
		// getAuth().currentUser.uid
		// get current User Id

	function writeUserData(userId, email, name, surname, level) {
	  const db = getDatabase();
	  set(ref(db, 'users/' + userId), {
	    visibleid: generatedId,
	    email: email,
	    username: name,
	    usersurname: surname,
	    userrole: userRole,
	    userlevel: level
	  });
	}

	const register = async() =>{
		try{
			const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
			const uid = getAuth().currentUser.uid;
			await CreateUser( uid, registerEmail, userRole, generatedId);
			if(userRole == 'S'){
				await CreateStudent(generatedId);	
			}
			navigate("/profile/" + generatedId)
			
		} catch(error){
			console.log(error.message)
		}
		
	}




	const generateId = (role)=>{
		
		setUserRole(role)
		setGeneratedId(role + Math.round(Math.random()*9) + Math.round(Math.random()*9)+ Math.round(Math.random()*9) + Math.round(Math.random()*9)+ Math.round(Math.random()*9) + Math.round(Math.random()*9));
		document.getElementById('user-id').style.visibility = "visible"

	}

	const showPassword = ()=>{
		document.getElementById('user-password').type = "text";
		document.getElementById('btn-show-password').style.display = "none";
		document.getElementById('btn-hide-password').style.display = "block";
		
	}
const hidePassword = ()=>{
		document.getElementById('user-password').type = "password";
		document.getElementById('btn-hide-password').style.display = "none";
		document.getElementById('btn-show-password').style.display = "block";
		
	}

	

	return(
		<div className = "container">
			<div className = "main-page signup-page">
				<Icon text={<IoPersonAdd/>}/>

				<div className ="signup-form">
					<h2 className ="page-title"> Create an Account </h2>
					<p>Please enter your Username and Password</p>
					<div className = "input-with-icon">
						<input type="text" placeholder="Email"
							onChange = {(e)=>{
								setRegisterEmail(e.target.value);
							}}
						/>
						<FiMail className="icon-small"/>
					</div>
					<div className = "input-with-icon" id="div-password">
						<input 
							placeholder="Password" 
							id="user-password" 
							type="password" 
							onChange = {(e)=>{
								setRegisterPassword(e.target.value);
							}}
							/>
						<AiFillEyeInvisible className="icon-small" onClick = {showPassword} id="btn-show-password"/>
						<AiFillEye className="icon-small" onClick = {hidePassword} id="btn-hide-password"/>
					</div>
					
					<p className ="i-am-a">I am a :</p>
					<div className = "role-options">
						<div className="role-option">
							<input type="radio" value ="S" name="role" 
								onChange = {e=> generateId(e.target.value)}
							/> student
						</div>
						<div className="role-option">
							<input type="radio" value ="T" name="role" 
								onChange = {e=> generateId(e.target.value)}
							/> teacher
						</div>
						<div className="role-option">
							<input type="radio" value ="P" name="role" 
								onChange = {e=> generateId(e.target.value)}
							/> parent
						</div>

					</div>

					<h3 id = "user-id" className="user-id">User ID: {generatedId}</h3>

					<button onClick={register}>Create an Account</button>
					
					

					<div className = "secondary-buttons signup-secondary-button">
						Already have an account? <a href ="/login">Log in</a> here
					</div>
				</div>

				


       		</div>
		</div>
	)
}