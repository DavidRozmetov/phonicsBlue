import React, {useState, useEffect} from 'react'
import '../style/login.css'
import Icon from '../components/Icon.js'
import SecondaryInfo from '../components/SecondaryInfo.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth, database } from '../firebase-config.js'
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { TbDoorEnter, TbSearch} from "react-icons/tb";
import { ReadAClassroom } from '../firebase/ModifyClassroom.js';
import { ReadUser } from '../firebase/ModifyUser.js';
import { ReadStudent, UpdateStudent } from '../firebase/ModifyStudent.js';
import {useNavigate} from 'react-router-dom';

export default function JoinClassroom (){
	
	let navigate = useNavigate();
	const [uid, setUid] = useState("")
	const [userProfileInformation, setUserProfileInformation] = useState({});
	const [studentInformation, setStudentInformation] = useState({});

	let classroomInfo = {};
	let classroomId = "";

	const updateClassroomId = (e) => {
		classroomId = e;
	}

	onAuthStateChanged(getAuth(), async (user) => {
		if(user){
			setUid(user.uid)
		}else{
			console.log("user is not logged in")
		}
	});

	useEffect(()=>{
		if(uid){
			ReadUser(uid).then((upi) => {
					setUserProfileInformation(upi)

					ReadStudent(upi.visibleId).then((st) => {
						setStudentInformation(st)
					});
			});			
		}

	},[uid]);


	const loadClassroom = async(id)=> {
		classroomInfo =  await ReadAClassroom(id);
		
		if (classroomInfo == "no classroom found"){
			document.getElementById('classroom-info').style.display = 'none';
			document.getElementById('classroom-info-empty').style.display = 'flex';

		} else if(studentInformation.studentClassroom === id){
		
		document.getElementById('classroom-info-empty').style.display = 'flex';
		document.getElementById('classroom-info-empty').innerText = "You are already in " + classroomInfo.classroomName;

		 }else {
			document.getElementById('classroom-info').style.display = 'flex';
			document.getElementById('classroom-info-empty').style.display = 'none';
			document.getElementById('classroom-info-id').innerText = id;
			document.getElementById('classroom-info-name').innerText = classroomInfo.classroomName;
			document.getElementById('classroom-info-teacher').innerText = classroomInfo.teacherId;

		}
		
	}


	const UpdateStudentClassroom = async (sid,  cid) => {
		UpdateStudent(sid, {
			 studentClassroom: cid,
		   	 parentId: studentInformation.parentId
		}).then((msg)=>{
				alert(`You are now a member of  ${classroomInfo.classroomName}`)
						})
		navigate('/quiz/levels')

	}


	return(
		<div className = "container">
			<div className = "main-page join-classroom-page">
				<Icon text={<TbDoorEnter/>}/>

				<div className ="login-form forgot-password-form">
					<SecondaryInfo infoLeft="Join a Classroom" 
									infoTopRight = {"Student ID: " + userProfileInformation.visibleId} 
									infoBottomRight = {userProfileInformation.userName + " " + userProfileInformation.userSurname}/>
					<p className="instructions">Enter the Classroom ID and click Search icon or Enter button</p>
					<div className="label-input input-with-icon">
						<label >Classroom ID</label>
						<input type="text" placeholder="C03714" onChange = {(e)=> updateClassroomId(e.target.value)}/>
						<TbSearch className="icon-small" 
							onClick = {()=>{
								loadClassroom(classroomId);
							}} 
						/>  
					</div>
					<h3 id="classroom-info-empty" > this classroom doesn't exist</h3>
					<ul className="classroom-info" id="classroom-info">
						<li >Room ID:</li> <li id = "classroom-info-id"></li>
						<li >Room Name:</li> <li id = "classroom-info-name"></li>
						<li >Teacher:</li> <li id = "classroom-info-teacher">Teacher Fah</li>
					</ul>
					<button onClick = {()=>{
						UpdateStudentClassroom(userProfileInformation.visibleId, classroomId)

					}}> Join Classroom </button>
					
				</div>

       		</div>
		</div>
	)
}