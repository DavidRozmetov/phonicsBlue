import React, {useState, useEffect} from 'react'
import Icon from "../components/Icon.js"
import SecondaryInfo from "../components/SecondaryInfo.js"
import PrimaryButton from "../components/PrimaryButton.js"
import {Link} from 'react-router-dom'
import {getLevelQuestionsJSON} from '../firebase/ModifyQuestion.js'
import '../style/login.css'
import { onAuthStateChanged, getAuth  } from 'firebase/auth'
import { useParams } from "react-router-dom";

export default function Questions (){
	const [questionButton, setQuestionButton] = useState()
	const [questions, setQuestions] = useState([]);
	let {levelId} = useParams();

	

	useEffect(()=>{
		getLevelQuestionsJSON(levelId).then((res)=>{
			setQuestions(res);
		})	

	}, [])
	

	return(
		<div className = "container">
			<div className = "main-page classroom-page">

				<div className ="login-form classroom-form">
					<br/> <SecondaryInfo infoLeft= "Levels" />
						<Link to= {"new"} className = "secondary-button"> Add New Question </Link>
						<br/> <br/>

						<div className = "question-buttons">
							{
								Object.entries(questions).map(
									q => <Link to ={q[0]} key = {q[0]} > 
										<ul className = "question-button secondary-button" >
											<img src = {q[1].url} />
											<li className = "correct">{q[1].optionA}</li>
											<li>{q[1].optionB}</li>
											<li>{q[1].optionC}</li>
											
										</ul>
									</Link>)
							}
						</div>							

						
				</div>
			</div>
		</div>
		)
}