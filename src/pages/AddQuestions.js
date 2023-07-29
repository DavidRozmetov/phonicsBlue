import React, {useState, useEffect} from 'react'
import '../style/login.css'
import Icon from '../components/Icon.js'
import SecondaryInfo from '../components/SecondaryInfo.js'
import { useParams } from "react-router-dom";
import {storage} from '../firebase-config.js'
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {CreateQuestion} from '../firebase/ModifyQuestion.js';
import {ReadALevel} from '../firebase/ModifyLevel.js';


import { FaUserEdit} from "react-icons/fa";



export default function AddQuestions (){
	let {levelId} = useParams();

	const [progress, setProgress] = useState(0)
	const [optionA, setOptionA] = useState("")
	const [optionB, setOptionB] = useState("")
	const [optionC, setOptionC] = useState("")
	const [questionId, setQuestionId] = useState("")


	const [level, setLevel] = useState([]);
	const [levelName, setLevelName] = useState([]);


	useEffect(()=>{
		ReadALevel(levelId).then((res)=>{
			setLevelName(res.levelTitle);
		})	

	}, [])

	const generateId = (role)=>{
		const result = (role + Math.round(Math.random()*9) + Math.round(Math.random()*9)+ Math.round(Math.random()*9) + Math.round(Math.random()*9)+ Math.round(Math.random()*9) + Math.round(Math.random()*9));
		return(result);

	}

	const formHandler = (e) => {
		e.preventDefault();
		const file = e.target[0].files[0];
		uploadQuestions(file);
	}

	const uploadQuestions = (file) =>{
		if (!file) return;
		const storageRef = ref(storage, `/questions/level-1/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);
		

		uploadTask.on("state_changed", (snapshot)=>{
			const prog = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
			setProgress(prog)
		}, (err) => {
			console.log(err);
		}, () => {
			getDownloadURL(uploadTask.snapshot.ref)
			.then((url)=> {
				
				console.log(questionId);
				CreateQuestion(questionId, levelId, url, optionA, optionB, optionC);

			})
		}
		);



	} 

	

	return(
		<div className = "container">
			<div className = "main-page join-classroom-page">
				<Icon text={<FaUserEdit/>}/>

				<div className ="login-form forgot-password-form">
					<SecondaryInfo 
					infoLeft="Add questions" 
					infoTopRight = "Level-1"
					infoBottomRight = ""/>

					<p className="instructions"> </p>
					
					<form onSubmit = {formHandler}>
						<label>Question Image</label><input type = "file" className = "image-input"  onChange = {(e) => setQuestionId(generateId("Q"))}/>
						<input type = "text" className = "options-input" onChange = {(e)=>{setOptionA(e.target.value)}} />
						<input type = "text" className = "options-input" onChange = {(e)=>{setOptionB(e.target.value)}} />
						<input type = "text" className = "options-input" onChange = {(e)=>{setOptionC(e.target.value)}} />
						<button type = "submit"> Save Question </button>	
					</form>

					<h3>Uploaded {progress} %</h3>
				</div>

				


       		</div>
		</div>
	)
}