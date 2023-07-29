import React from 'react'
import {Link} from 'react-router-dom'

export default function QuestionBox (props) {
	return (
		<div className = { "primary-button " + props.group}>

			 <Link to= {props.link}> {props.text} </Link>

		</div>

	);
}