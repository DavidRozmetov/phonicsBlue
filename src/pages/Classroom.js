import React, {useState, useEffect} from 'react'
import '../style/login.css'
import Icon from '../components/Icon.js'
import SecondaryInfo from '../components/SecondaryInfo.js'
import ClassroomMember from '../components/ClassroomMember.js'
import { SiGoogleclassroom} from "react-icons/si";
import { onAuthStateChanged, getAuth  } from 'firebase/auth'

import { useParams } from "react-router-dom";
import {  ReadAClassroom, DeleteClassroom } from '../firebase/ModifyClassroom.js';
import {  classroomStudents, UpdateStudent, RemoveAllStudentsFromClassroom } from '../firebase/ModifyStudent.js';
import {  findAUserByVisualId } from '../firebase/ModifyUser.js';



export default function Classroom (){
let {classroomId} = useParams();
const [teacherName, setTeacherName] = useState("")
const [classroomInformation, setClassroomInformation] = useState({})
const [studentsInformation, setStudentsInformation] = useState({})
const [studentsMap, setStudentsMap] = useState()
const [students, setStudents] = useState({})
const [classroomList, setClassroomList] = useState()
const [uid, setUid] = useState("")



onAuthStateChanged(getAuth(), async (user)=>{
		setUid(user.uid)
})



useEffect(()=>{
	//Load Classroom Information
	ReadAClassroom(classroomId).then((clsrm)=>{
		setClassroomInformation(clsrm)

			//Load teacher Name
			findAUserByVisualId(clsrm.teacherId).then((res)=>{
			setTeacherName(res.userName);

		});

	//load Classroom
	classroomStudents(classroomId).then((res) => {
		setStudents(res);

		setStudentsMap(Object.entries(res).map(st=>  <ClassroomMember
				key = {st[0]} 
				linkAddress = {st[0]}  
			/>  
		
			// console.log(st[0])
 	))

	

	});
	});
	
	
}, [])


			// findAUserByVisualId(st[0]).then((u) =>{
						// studentName = {u.userName + " " + u.userSurname}
					// studentScore ={u.userLevel}
			// })
	
	

	return(
		<div className = "container">
			<div className = "main-page classroom-page">
				<Icon text={<SiGoogleclassroom/>}/>

				<div className ="login-form classroom-form">
					<SecondaryInfo 
					infoLeft={classroomInformation.classroomName} 
					infoTopRight = {"Classroom ID: " + classroomId} 
					infoBottomRight = {"Teacher " + teacherName}/>
					<div className = "secondary-buttons">
						<a href ={classroomId + "/addstudent"} className = "secondary-button"> Add Student </a>
						<a href ={classroomId + "/editclassroom"} className = "secondary-button"> Edit </a>
						<a className = "secondary-button" 
							onClick={()=>{
								RemoveAllStudentsFromClassroom(classroomId)
								DeleteClassroom(classroomId)
							}}
						> Delete Classroom </a>
					</div>


					<div className="student-list">

						{studentsMap}
					</div>
				</div>
			</div>
		</div>
	)
}