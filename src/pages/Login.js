import { React, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase-config.js'
import {useNavigate} from 'react-router-dom';
import '../style/login.css'
import Icon from '../components/Icon.js'
import PrimaryButton from '../components/PrimaryButton.js'
import { BsPersonFill as AccountIcon} from "react-icons/bs";
import { FiMail} from "react-icons/fi";
import { AiFillEyeInvisible, AiFillEye} from "react-icons/ai";
export default function Login (){
	
const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");
let navigate = useNavigate();

// import {useNavigate} from 'react-router-dom';
// let navigate = useNavigate();
// navigate("/")

const login = async() =>{
		try{

			const user = await signInWithEmailAndPassword(
				auth, 
				loginEmail, 
				loginPassword)
			document.getElementById('error-message').innerText = "Logged in successfully"
			navigate("/")
		} catch(error){
			document.getElementById('error-message').innerText = error.message
		}
		
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
			<div className = "main-page login-page">
				<Icon text={<AccountIcon />}/>

				<div className ="login-form">
					<h2 className ="page-title"> Login </h2>
					<p>Please enter your Username and Password</p>
					<div className = "input-with-icon">
						<input 
							type="text" 
							placeholder="email"
							onChange = {(e)=>{
								setLoginEmail(e.target.value);
							}}
						/> 
						<FiMail className ="icon-small"/>
					</div>
					<div className = "input-with-icon" id="div-password">
						<input 
							id="user-password" 
							type="password" 
							placeholder="Password"
							onChange = {(e)=>{
								setLoginPassword(e.target.value);
							}}
							/>
						<AiFillEyeInvisible className="icon-small" onClick = {showPassword} id="btn-show-password"/>
						
						<AiFillEye 
							className="icon-small" 
							onClick = {hidePassword} 
							id="btn-hide-password"
							onChange = {(e)=>{
								setLoginPassword(e.target.value);
							}}
							/>
					</div>
					<button onClick={login}>Log in </button>

					<div className = "secondary-buttons">
						<a href ="forgotpassword">Forgot Password</a>
						<a href ="/signup">Create an Account</a>

					</div>

					<div className="error-messages">
						<p id="error-message"></p>
					</div>
				</div>

				


       		</div>
		</div>
	)
}