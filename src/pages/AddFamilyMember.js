import React from 'react'
import '../style/login.css'
import Icon from '../components/Icon.js'
import { HiUserAdd as AddStudentIcon} from "react-icons/hi";
import { useParams } from "react-router-dom";
import SecondaryInfo from '../components/SecondaryInfo.js'
import {  ReadAClassroom } from '../firebase/ModifyClassroom.js';
import {  ReadStudent, UpdateStudent } from '../firebase/ModifyStudent.js';
import {  findAUserByVisualId} from '../firebase/ModifyUser.js';
import {  TbSearch} from "react-icons/tb";


let classroomInformation = {}
let studentInformation = {}
let userInformation = {}
let studentId = ""
let parentInformation = {}


//Load Classroom information
const readClassroomInformation = async(cId) =>{
	await ReadAClassroom(cId).then((res) => {
	 	classroomInformation = res
	});

}

//
const readStudentInformation = async(vId) =>{
	await ReadStudent(vId).then((res)=>{
		studentInformation = res
		console.log(studentInformation)
	});
}

const UpdateStudentParent = async (sid, pid, cid) => {
	UpdateStudent(sid, {
		 studentClassroom: cid,
	   	 parentId: pid
	});

}

const updateStudentId = (e) => {
	studentId = e;
}

const loadParentInformatoin = async (pId) =>{
	await findAUserByVisualId(pId).then((res) =>{
		parentInformation = res

	})
}


const getUserByVisualId = async (vId) =>{
	await findAUserByVisualId(vId).then((res) =>{
		userInformation = res

	})
}

const loadStudent = async(id, pid)=> {
	await readStudentInformation(id);
	await getUserByVisualId(id);
	
	if (studentInformation == "No Student Found with that Id"){
		document.getElementById('student-info').style.display = 'none';
		document.getElementById('button-add-student').style.display = 'none';
		document.getElementById('student-info-empty').innerText = " A student with this id doesn't exist";
		document.getElementById('student-info-empty').style.display = 'flex';
		document.getElementById('student-info-empty').style.display = 'flex';


	} else if(studentInformation.parentId === pid){
		document.getElementById('button-add-student').style.display = 'none';
		document.getElementById('student-info').style.display = 'none';
		document.getElementById('student-info-empty').innerText = userInformation.userName + " is already in your family";
		document.getElementById('student-info-empty').style.display = 'flex';

	 }else {
		document.getElementById('button-add-student').style.display = 'block';
		document.getElementById('student-info').style.display = 'flex';
		document.getElementById('student-info-empty').style.display = 'none';
		document.getElementById('student-info-id').innerText = id;
		document.getElementById('student-info-name').innerText = userInformation.userName;
		document.getElementById('student-info-grade').innerText = studentInformation.studentClassroom;

	}
	
	
}


export default function AddFamilyMember (){
	
	let {parentId} = useParams();

	loadParentInformatoin(parentId)

	return(
		<div className = "container">
			<div className = "main-page join-classroom-page">
				<Icon text={<AddStudentIcon/>} />

				<div className ="login-form forgot-password-form">
					<SecondaryInfo 
					infoLeft="Add New Student" 
					infoTopRight = {"Parent Id: " + parentId} 
					infoBottomRight = {parentInformation.userName + " " + parentInformation.userSurname}/>

					<p className="instructions"> Enter the Student ID and click Search icon or Enter button</p>
					<div className="label-input">
						<label >Student ID</label>
						<input 
							type=""
							placeholder="Enter Student Id" 
							onChange= {(e)=>{
								updateStudentId(e.target.value)
						}}/>
						<TbSearch className="icon-small" 
							onClick = {()=>{
								loadStudent(studentId, parentId)
							}} 
						/>  
					</div>
					<h3 id="student-info-empty" className = "student-info-empty" > this student doesn't exist</h3>
					<ul className="classroom-info student-info" id="student-info">
						<li >Student Id:</li> <li id = "student-info-id"></li>
						<li >Student Name:</li> <li id = "student-info-name"></li>
						<li >Classroom:</li> <li id = "student-info-grade"></li>
						
					</ul>
					
					<button id = "button-add-student" className = "button-add-student" 
						onClick = {() => {
							UpdateStudentParent(studentId, parentId, studentInformation.studentClassroom);
						}}
					> Add Student </button>

				</div>

				


       		</div>
		</div>
	)
}