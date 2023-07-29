import React, {useState, useEffect} from 'react'
import '../style/login.css'
import Icon from '../components/Icon.js'
import SecondaryInfo from '../components/SecondaryInfo.js'
import ClassroomButtons from '../components/ClassroomButtons.js'
import { SiGoogleclassroom} from "react-icons/si";

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {  TeacherClassrooms } from '../firebase/ModifyClassroom.js';
import { ReadUser } from '../firebase/ModifyUser.js';

export default function MyClassrooms (){

const [uid, setUid] = useState("");
const [vid, setVid] = useState("")
const [classroomsData, setClassroomsData] = useState([])
const [userData, setUserData] = useState([])
const [classroomMap, setClassroomMap] = useState();

onAuthStateChanged(getAuth(), async (user)=>{
		setUid(user.uid)

})

	useEffect(()=>{
		if(uid){
			ReadUser(uid).then((u) => {

				setVid(u.visibleId);
				setUserData(u);
				

				TeacherClassrooms(u.visibleId).then((res) => {

					setClassroomsData(res)

					setClassroomMap(Object.entries(res).map(cl=> 
								<ClassroomButtons
									key = {cl[0]} 
									classLink = {cl[0]} 
									classroomTitle = 
									{cl[1].classroomName} 
								/>
							))
				});
							
			})
				
		}


	}, [uid])



	return(
		<div className = "container">
			<div className = "main-page join-classroom-page">
				<Icon text={<SiGoogleclassroom/>}/>

				<div className ="login-form forgot-password-form">
					<SecondaryInfo 
					infoLeft="My Classrooms" 
					infoTopRight =  {"Teacher Id: " + vid}
					infoBottomRight = {userData.userName + " " + userData.userSurname}/>
					<a href = "/createclassroom"> Create a new Classroom </a>
					<div className="classroom-list" id = "classroom-list">							
						{classroomMap}
					</div>
				</div>
			</div>
		</div>
	)
}