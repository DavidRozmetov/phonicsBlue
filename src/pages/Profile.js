
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getAuth, onAuthStateChanged, deleteUser } from 'firebase/auth';
import { auth, database } from '../firebase-config.js'
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import {hideButtons, showButtons} from '../App.js'
import '../style/login.css'
import '../style/profile.css'
import Icon from '../components/Icon.js'
import FamilyMember from '../components/FamilyMember.js'
import { MdManageAccounts} from "react-icons/md";
import SecondaryInfo from '../components/SecondaryInfo.js'
import { findAUserByVisualId, ReadUser, UpdateUser, DeleteUser } from '../firebase/ModifyUser.js';
import { ReadStudent, RemoveAllStudentsFromParent, RemoveAllStudentsFromClassroom, DeleteStudent } from '../firebase/ModifyStudent.js';
import { ReadAClassroom, TeacherClassrooms, DeleteClassroom } from '../firebase/ModifyClassroom.js';

export default function Profile (){

let {userId} = useParams();
const [uid, setUid] = useState("");
const [submitEnabled, setSubmitEnabled] = useState(false);
const inputUserName = document.getElementById("inputUserName");
const inputUserSurname = document.getElementById("inputUserSurname");

const [userProfileInformation, setUserProfileInformation] = useState({})
const [currentUserInformation, setCurrentUserInformation]  = useState({})
const [studentProfileInformation, setStudentProfileInformation] = useState({})
const [classroomInformation, setClassroomInformation]  = useState({})
let newUserProfileInformation = {}
let familyMembers = {}

onAuthStateChanged(getAuth(), async (user) => {
			if(user){

				setUid(user.uid)
				
			}else{
				console.log("User is not logged in yet")
			}

			
		});

	useEffect(()=>{
			if(uid){


				ReadUser(uid).then((res) => {
					setCurrentUserInformation(res)

				});

				findAUserByVisualId(userId).then((res) =>{
					setUserProfileInformation(res)

				
					if(res.userRole === "S"){
						ReadStudent(res.visibleId).then((st)=>{
							if(st.studentClassroom){
								ReadAClassroom(st.studentClassroom).then((cl)=>{
									setClassroomInformation(cl) 
								})

							}
						})
						
					}
				    
			})
		}
		
	},[uid])


	if(currentUserInformation.visibleId && (currentUserInformation.visibleId === userProfileInformation.visibleId)){
		document.getElementById('delete-account').style.display = "block"
		if(document.getElementById('inputUserName')){
			document.getElementById('inputUserName').disabled = false;	
		}
		if(document.getElementById('inputUserSurname')){
			document.getElementById('inputUserSurname').disabled = false;	
		}
		if(document.getElementById('emailField')){
			document.getElementById('emailField').style.visibility = "visible"
		}
	}else{
		if(document.getElementById('inputUserName')){
			document.getElementById('inputUserName').disabled = true;	
		}
		if(document.getElementById('inputUserSurname')){
			document.getElementById('inputUserSurname').disabled = true;	
		}
		if(document.getElementById('emailField')){
			document.getElementById('emailField').style.visibility = "hidden"	
		}
	}

	const readCurrentUserInformation = async(uid) => {
		await ReadUser(uid).then((res) => {
			setCurrentUserInformation(res)
		});
	}

	const UpdateUserInformation = async(uid, info) => {
		await UpdateUser(uid, info).then((msg)=>{
			if(document.getElementById('error-message')){
				document.getElementById('error-message').innerText = msg	
			}			
		})
		
	}







	const DeleteAccount =  async(uid) =>{

		let role = userProfileInformation.userRole;
		let vid = userProfileInformation.visibleId;



		if(role === 'T'){
			await TeacherClassrooms(vid).then((res)=>{
				let classrooms = res;
				Object.entries(classrooms).map(st=>{
					RemoveAllStudentsFromClassroom(st[0])
					try{
						DeleteClassroom(st[0])	
					} catch(e){
						console.log(e.message)
					}
					
				}
				)
			})


		} else if(role === 'P'){
			try{
				RemoveAllStudentsFromParent(vid);
			} catch (e) {
				console.log(e.message)
			}
		} else if (role === 'S'){
			try{
				DeleteStudent(vid);
			} catch (e) {
				console.log(e.message)
			}
		}

		//delete user
		try{
			DeleteUser(uid)	
		} catch (e) {
			console.log(e.message)
		}
		


		
		// firebase delete user
		deleteUser(uid).then(() => {
		  console.log("User has been deleted")
		}).catch((error) => {
			console.log(error)
		});
		

	}



		const recordChanges = () =>{
			document.getElementById('submit').style.display = "block";
			newUserProfileInformation = {
			   	 userName: inputUserName.value,
			   	 userSurname: inputUserSurname.value,
			}
		}



		
		

	


	
	return(
		<div className = "container">
			<div className = "main-page profile-page">
				<Icon text={<MdManageAccounts />}/>

				<div className ="login-form forgot-password-form">
					<SecondaryInfo 
					infoLeft= {`${userProfileInformation.userName} ${userProfileInformation.userSurname}`} 
					infoTopRight = {`User Id: ${userProfileInformation.visibleId}`} 
					infoBottomRight = {classroomInformation.classroomName} />

					<p className = "student-level-big"> Level {userProfileInformation.userLevel} </p>
					<div className="label-input">
						<label id = "profile-label-name">Name</label>
						<input 
							id = "inputUserName"
							type="text" 
							defaultValue={userProfileInformation?.userName}
							onChange = {recordChanges}
						/>
					</div>
					<div className="label-input">
						<label id = "profile-label-surname">Surmame:</label>
						<input 
							id = "inputUserSurname"
							type="text" 
							defaultValue={userProfileInformation?.userSurname}
							onChange = {recordChanges}
						/>
					</div>
					<div className="label-input" id = "emailField">
						<label id = "profile-label-email">Email</label>
						<input 
							id = "inputEmail"
							type = "text"
							defaultValue={getAuth().currentUser?.email}
							disabled
						/>
					</div>

					<div className = "secondary-buttons single-line-button">
						
						<a id="delete-account" style={{display: "none"}} href ="#" onClick ={()=>{
							DeleteAccount(getAuth().currentUser.uid)
						}}

						>Delete Account</a>
					</div>
					<button id="submit" style = {{display: "none"}} onClick={ ()=>{

						UpdateUserInformation(getAuth().currentUser.uid, newUserProfileInformation)
					}
					}> Save Changes </button>
					<p id="error-message"></p>
				</div>

				


       		</div>
		</div>
	)
}