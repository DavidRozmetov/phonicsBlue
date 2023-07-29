import React, {useState, useEffect} from 'react'
import '../style/classroom.css'
import { MdDelete} from "react-icons/md";
import {UpdateStudent } from '../firebase/ModifyStudent.js';
import {  findAUserByVisualId } from '../firebase/ModifyUser.js';
import {  ReadAClassroom } from '../firebase/ModifyClassroom.js';

export default function FamilyMember(props){
	const studentId = props.linkAddress
	const classroomId = props.classroomId;
	const [studentName, setStudentName] = useState("");
	const [classroomName, setClassroomName] = useState("");

useEffect(()=>{
	// 
	findAUserByVisualId(studentId).then((res)=>{
		setStudentName(res.userName + " " + res.userSurname)
	})
	ReadAClassroom(classroomId).then((res)=>{
		setClassroomName(res.classroomName)
	})

},[])

	// update student classroom
	const removeStudentFromFamily = async(sid, newData) =>{

		await UpdateStudent(sid, newData).then((res)=>{
			console.log(res)
		})
	}




	return(
		<div className ="family-member-button">
			<a href={"/profile/" + props.linkAddress}> {studentName} </a>
			<a href="#"> {classroomName} </a>
			<MdDelete style={{margin : "2vh"}} className = "icon-small" onClick = {async()=> {
				let studentId = props.linkAddress
					removeStudentFromFamily(props.linkAddress, {parentId: ""})	
			}}/>
		</div>
		)

}