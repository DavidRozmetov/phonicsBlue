import React from 'react'
import {Link} from 'react-router-dom'

export default function PrimaryButton (props) {
	return (
		<div className = { "primary-button " + props.group}>

			 <Link to= {props.link}> {props.text} <span className = "icon">{props.buttonIcon}</span></Link>

		</div>

	);
}