import {db} from '../firebase-config.js'
import { collection, setDoc, doc, getDoc, query, where, getDocs, updateDoc, deleteDoc} from "firebase/firestore";


export const CreateAClassroom = async (classroomId, classroomName, teacherId) => {

	try {
	  const docRef = await setDoc(doc(db, "classrooms", classroomId), {
	   	 classroomName: classroomName,
	   	 teacherId: teacherId
	  });
	  console.log("Document written with ID: ", docRef.id);
	} catch (e) {
	  console.error("Error adding document: ", e);
	}
}



export const TeacherClassrooms = async (teacherId) =>{

	let classrooms = {};

	const classroomRef = collection(db, "classrooms");

	const q = query(classroomRef, where("teacherId", "==", teacherId));

	const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
	// doc.data() is never undefined for query doc snapshots
		 

		classrooms[doc.id] = doc.data()
	});


	return(classrooms);
}



// await ReadUser(uid).then((res) => {userData = res;});
export const ReadAClassroom = async (classroomId) =>{
	

    const docRef = doc(db, "classrooms", classroomId);
    const docSnap = await getDoc(docRef);
 	const classroomData = docSnap.data();


    if (docSnap.exists()) {
     
    	return (classroomData);
      
	} else{
		return ("no classroom found")
	}
}




export const UpdateClassroom = async (cid, newData) =>{
	const dbRef = doc(db, "classrooms", cid);


	await updateDoc(dbRef, newData);
}

export const DeleteClassroom = async (cid) =>{
	await deleteDoc(doc(db, "classrooms", cid));	
	
}
