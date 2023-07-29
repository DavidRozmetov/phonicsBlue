import React, {useState, useEffect} from 'react'
import Icon from "../components/Icon.js"
import SecondaryInfo from "../components/SecondaryInfo.js"
import PrimaryButton from "../components/PrimaryButton.js"
import {Link} from 'react-router-dom'
import {getLevels} from '../firebase/ModifyLevel.js'

import { onAuthStateChanged, getAuth  } from 'firebase/auth'


export default function QuizLevels (){
	const [levelButton, setLevelButton] = useState()
	const [uid, setUid] = useState("");
	const [levels, setLevels] = useState([]);

	onAuthStateChanged(getAuth(), async (user)=>{
		if(user){
			setUid(user.uid)		
		}
		
	})

	useEffect(()=>{
		getLevels().then((res)=>{
			setLevels(res);
		})	

	}, [])
	

	return(
		<div className = "container">
			<div className = "main-page classroom-page">

				<div className ="login-form classroom-form">
					<br/> <SecondaryInfo infoLeft={"Levels"} />
						<br/> <br/>

						<div className = "level-buttons">
							{
								// Object.entries(levels).map(lv => console.log(lv))
								Object.entries(levels).map(lv => <a href ={"levels/" + lv[0]} key = {lv[0]}> <button className = "level-button secondary-button" >{lv[1].levelTitle} </button></a>)
							}
						</div>						
					

						
				</div>
			</div>
		</div>
		)
}