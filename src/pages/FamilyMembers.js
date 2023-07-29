import React, {useState, useEffect} from 'react'
import '../style/login.css'
import Icon from '../components/Icon.js'
import SecondaryInfo from '../components/SecondaryInfo.js'
import FamilyMember from '../components/FamilyMember.js'

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { MdOutlineFamilyRestroom} from "react-icons/md";
import { ReadStudentsOfParent, classroomStudents} from "../firebase/ModifyStudent"
import { ReadUser, findAUserByVisualId} from "../firebase/ModifyUser"
import {  ReadAClassroom } from '../firebase/ModifyClassroom.js';
import { useParams } from "react-router-dom";


export default function FamilyMembers (){
	let {parentId} = useParams();
	const [uid, setUid] = useState("")
	let [studentsInformation, setStudentsInformation] = useState({})
	const [parentName, setParentName] = useState("")
	const [familyList, setFamilyList] = useState();
	const [classroomMap, setClassroomMap] = useState();

	

onAuthStateChanged(getAuth(), async (user)=>{
		setUid(user.uid)
})

useEffect(()=>{
	findAUserByVisualId(parentId).then((res)=>{
			setParentName(res.userName + " " + res.userSurname);

		})
	// filterParentStudents(parentId)

	ReadStudentsOfParent(parentId).then((res) => {

		setClassroomMap(Object.entries(res).map(st=> 

			< FamilyMember
				key = {st[0]} 
				linkAddress = {st[0]}
				classroomId = {st[1].studentClassroom}
			/>	 
		))
	})

}, [])



	return(
		<div className = "container">
			<div className = "main-page join-classroom-page">
				<Icon text={<MdOutlineFamilyRestroom/>}/>

				<div className ="login-form forgot-password-form">
					<SecondaryInfo 
					id = "secondary-info"
					infoLeft="My Family Members" 
					infoTopRight = {"Parent ID: " + parentId} 
					infoBottomRight = {parentName}
					/>
					<a href={parentId + "/addstudent"} className="secondary-button"> Add Family member </a>
					<div className="family-member-list">

						{classroomMap}
 						

					</div>
				</div>
			</div>
		</div>
	)
}