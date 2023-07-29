import React from 'react'
import '../style/login.css'
import Icon from '../components/Icon.js'
import SecondaryInfo from '../components/SecondaryInfo.js'
import { useParams } from "react-router-dom";


import { FaUserEdit} from "react-icons/fa";
import {  ReadAClassroom, UpdateClassroom } from '../firebase/ModifyClassroom.js';

//Classroom
//Read 
let classroomInfo = {}
let newClassroomInfo = {}
let classroomName = ""

const updateClassroomName = (e)=>{
	classroomName = e;

}


const loadClassroomInformation = async(cId) =>{
	await ReadAClassroom(cId).then((res) => {
	 	classroomInfo = res;

	});

}
//Update

const updateClassroomInfo = async(cid) => {
	
	newClassroomInfo = {
		classroomName : classroomName,
		readTeacherId: classroomInfo.teacherId
	}
	await UpdateClassroom(cid, newClassroomInfo).then(()=> {return("classroon Name has been updated")})
}
//


export default function EditClassroom (){
	let {classroomId} = useParams();

	loadClassroomInformation(classroomId);

	console.log(classroomInfo)

	
	

	return(
		<div className = "container">
			<div className = "main-page join-classroom-page">
				<Icon text={<FaUserEdit/>}/>

				<div className ="login-form forgot-password-form">
					<SecondaryInfo 
					infoLeft="Edit classroom" 
					infoTopRight = {"Room ID: " + classroomId}
					infoBottomRight = {classroomInfo.classroomName}/>

					<p className="instructions"> </p>
					<div className="label-input">
						<label >Room Name</label>
						<input 
							type="text" 
							defaultValue = {classroomInfo.classroomName}
							onChange = {(e)=>{updateClassroomName(e.target.value)}}
						/>
					</div>
					<div className = "delete-classroom-button">
						<a href ="#">Delete Classroom</a>
					</div>
					<button onClick = {() => {updateClassroomInfo(classroomId)}}> Save Changes </button>

				</div>

				


       		</div>
		</div>
	)
}