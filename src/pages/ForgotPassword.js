import React, {useState} from 'react'
import {auth} from '../firebase-config.js'
import '../style/login.css'
import Icon from '../components/Icon.js'
import PrimaryButton from '../components/PrimaryButton.js'
import { MdSecurity} from "react-icons/md";
import { FiMail} from "react-icons/fi";
import { sendPasswordResetEmail, getAuth } from 'firebase/auth'

export default function ForgotPassword (){
	const [email, setEmail] = useState("")
	const auth = getAuth();

const resetPassword = () => {

}

	return(
		<div className = "container">
			<div className = "main-page forgot-password-page">
				<Icon text={<MdSecurity/>}/>

				<div className ="login-form forgot-password-form">
					<h2 className ="page-title"> Reset Password </h2>
					<p>Please enter your email address and we will send you the link</p>
					<div className = "input-with-icon">
						<input type="text" placeholder="email" onChange = { (e)=>{
							setEmail(e.target.value)
						}
						}/>
						<FiMail className="icon-small"/>
					</div>
					<button onClick = {()=>{

						auth.sendPasswordResetEmail(email)

						
				}}	>Send Link </button>

					<div className = "secondary-buttons">
						<a href ="/login">Log in</a>
						<a href ="/signup">Create an Account</a>

					</div>
				</div>

				


       		</div>
		</div>
	)
}