

import {db} from '../firebase-config.js'

import { collection, setDoc, doc, getDoc, query, where, getDocs, updateDoc, deleteDoc} from "firebase/firestore";

// userId, userEmail, userName, userSurname, visibleId

export const CreateStudent = async (visibleId) => {

	try {

	  const docRef = await setDoc(doc(db, "students", visibleId), {
	   	 studentClassroom: "",
	   	 parentId: ""
	  });
	  console.log("Document written with ID: ", docRef.id);
	} catch (e) {
	  console.error("Error adding document: ", e);
	}
}


// await ReadUser(uid).then((res) => {userData = res;});
export const ReadStudent = async (visibleId) =>{
	

    const docRef = doc(db, "students", visibleId);
    const docSnap = await getDoc(docRef);
 	const studentData = docSnap.data();


    if (docSnap.exists()) {
     
    	return (studentData);
      
	} else {
		return ("No Student Found with that Id")
	}
}


export const classroomStudents = async (classroomId) =>{

	let students = {};


	const studentRef = collection(db, "students");

	const q = query(studentRef, where("studentClassroom", "==", classroomId));

	const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
	// doc.data() is never undefined for query doc snapshots
		 

		students[doc.id] = doc.data()
	});


	return(students);
}


export const UpdateStudent = async (vId, newData) =>{
	const dbRef = doc(db, "students", vId);

	await updateDoc(dbRef, newData);

	return("student classroom has been updated")
}


export const RemoveAllStudentsFromClassroom = async(cid) =>{
	classroomStudents(cid).then(async (students)=>{
		for(const st in students){
			let tempStData = await ReadStudent(st)


			let newData = {
			   	 studentClassroom: "",
			   	 parentId: tempStData.parentId
			  }
			UpdateStudent(st, newData)
		}
		// console.log(students)
	})
}

export const UpdateStudentParent = async(sid, pid) => {
	let studentInfo = {}
	let newData = {}
	//read student
	try{
		await ReadStudent(sid).then((res)=>{
			studentInfo = res;
			newData = {
				clasroomId: studentInfo.classroomId,
				parentId: pid
				}
			})
		
	} catch (e){
		console.log(e.message)
	}
	

	//update student

}

export const ReadStudentsOfParent = async (parentId) =>{

	let students = {};


	const studentRef = collection(db, "students");

	const q = query(studentRef, where("parentId", "==", parentId));

	const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
	// doc.data() is never undefined for query doc snapshots
		 

		students[doc.id] = doc.data()
	});


	return(students);
}



export const RemoveAllStudentsFromParent = async(pid) =>{

	ReadStudentsOfParent(pid).then( async (students)=>{
		for(const st in students){
			let tempStData = await ReadStudent(st)


			let newData = {
			   	 studentClassroom: tempStData.studentClassroom,
			   	 parentId: ""
			  }
			try{
				UpdateStudent(st, newData)
			} catch (e){
				console.log(console.log(tempStData))
			}

		}

	})

}

// export const DeleteClassroom = async (cid) =>{
// 	await RemoveAllStudentsFromClassroom(cid).then(async()=>{
// 		await deleteDoc(doc(db, "classrooms", cid));	
// 	})
	
// }

export const DeleteStudent = async (sid) =>{
	await deleteDoc(doc(db, "students", sid)).then(()=>{
		return('The student has been deleted')
	})
}



