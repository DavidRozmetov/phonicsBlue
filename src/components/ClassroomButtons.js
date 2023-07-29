import React from 'react'
import '../style/classroom.css'
import { AiOutlineEdit} from "react-icons/ai";
import { MdDeleteForever} from "react-icons/md";

export default function ClassroomButtons(props){

// <Link to= {"classroom/" + props.classLink}> {props.classroomTitle} </Link>
	return(
		<div className ="classroom-button">
			<a href= {"classrooms/" + props.classLink}> {props.classroomTitle} </a>
			
			<div className ="small-icons">
				<AiOutlineEdit className="icon-small"/>
				<MdDeleteForever className="icon-small"/>
			</div>
		</div>
		)

}