import React, {useState, useEffect} from 'react'
import '../style/login.css'
import Icon from '../components/Icon.js'
import {ImCross} from "react-icons/im";
import SecondaryInfo from '../components/SecondaryInfo.js'
import { useParams } from "react-router-dom";
import {storage} from '../firebase-config.js'
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {UpdateQuestion, ReadQuestion, DeleteQuestion} from '../firebase/ModifyQuestion.js';
import {ReadALevel} from '../firebase/ModifyLevel.js';


import { FaUserEdit} from "react-icons/fa";



export default function UpdateQuestions (){
	let {levelId} = useParams();
	let {questionId} = useParams();

	const [progress, setProgress] = useState(0)
	const [optionA, setOptionA] = useState("")
	const [optionB, setOptionB] = useState("")
	const [optionC, setOptionC] = useState("")
	const [question, setQuestion] = useState({})
	const [level, setLevel] = useState([]);
	const [levelName, setLevelName] = useState([]);


	useEffect(()=>{
		ReadALevel(levelId).then((res)=>{
			setLevelName(res.levelTitle);
		})	
		ReadQuestion(questionId).then((q)=>{
			setQuestion(q);
			setOptionA(q.optionA)
			setOptionB(q.optionB)
			setOptionC(q.optionC)
		})
	}, [])

	//load question


	

	return(
		<div className = "container">
			<div className = "main-page edit-question-page">
				<Icon text={<FaUserEdit/>}/>

				<div className ="login-form forgot-password-form">
					<SecondaryInfo 
					infoLeft="Edit question" 
					infoTopRight = {questionId}
					infoBottomRight = ""/>
					<img src = {question.url} />
					<form onSubmit = {(e) => {e.preventDefault();}}>

						<input type = "text" className = "options-input" defaultValue={question.optionA} onChange = {(e)=>{setOptionA(e.target.value)}} />
						<input type = "text" className = "options-input" defaultValue={question.optionB} onChange = {(e)=>{setOptionB(e.target.value)}} />
						<input type = "text" className = "options-input" defaultValue={question.optionC} onChange = {(e)=>{setOptionC(e.target.value)}} />
						<button onClick = {()=>{UpdateQuestion(questionId, {
							optionA: optionA,
							optionB: optionB,
							optionC: optionC
						})}}> Save Changes </button>

					</form>
					
					<a className = "secondary-button" style={{margin: "2vh"}} onClick = {(e) =>{
								DeleteQuestion(questionId).then((m)=>{
									console.log(m)
								})
							}}>
						<ImCross className="icon-delete-question"/>
						Delete Question
					</a>
				</div>

				


       		</div>
		</div>
	)
}