import React, {useState, useEffect} from 'react'
import Icon from '../components/Icon.js'
import { MdDeleteForever} from "react-icons/md";
import {  UpdateStudent } from '../firebase/ModifyStudent.js';
import {  findAUserByVisualId } from '../firebase/ModifyUser.js';

import '../style/classroom.css'


export default function ClassroomMember(props){

	const [studentInfo, setStudentInfo] = useState({})
	const [newStudentInfo, setNewStudentInfo] = useState({})


	useEffect(()=>{
		 findAUserByVisualId(props.linkAddress).then((res)=>{
			setStudentInfo(res)

		})
	}, [])
	

	



	return(
		<div className ="classroom-member-button">
			<a href={"/profile/" + props.linkAddress}> {studentInfo.userName} </a>
			<a href={"/profile/" + props.linkAddress}> {studentInfo.userLevel} </a>
			
			<MdDeleteForever className="icon-small" onClick={ async()=>{

					UpdateStudent(props.linkAddress, {studentClassroom: ""}).then((res)=>{
	
					})

				}
			} />
		</div>
		)

}