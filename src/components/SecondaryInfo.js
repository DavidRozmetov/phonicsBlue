import React from 'react'
import '../style/secondaryInfo.css'

export default function SecondaryInfo(props){
	return(
		<div className = "secondary-info">
			<h2 className ="secondary-info-left">{props.infoLeft}</h2>
			<div className = "secondary-info-right">
				<h3 className = "secondary-info-top-right">{props.infoTopRight}</h3>
				<h3 className = "secondary-info-top-bottom">{props.infoBottomRight}</h3>
			</div>
		</div>
		)
}