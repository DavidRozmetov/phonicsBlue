

import {db} from '../firebase-config.js'

import { collection, setDoc, doc, getDoc, query, where, getDocs, updateDoc, deleteDoc} from "firebase/firestore";

export const CreateALevel = async (levelId, levelTitle, creatorId) => {
	try {
	  const docRef = await setDoc(doc(db, 'levels', levelId), {
	   	 levelTitle: levelTitle,
	   	 creator: creatorId
	  });
	} catch (e) {
	  console.error("Error adding document: ", e);
	}
}

export const ReadALevel = async (questionId) =>{
    const docRef = doc(db, "questions", questionId);
    const docSnap = await getDoc(docRef);
 	const questionData = docSnap.data();
    if (docSnap.exists()) {
    	return (questionData);
	} else {
		return ("No Student Found with that Id")
	}
}



export const getLevels = async () =>{
	let levels = {};
	const studentRef = collection(db, "levels");
	const q = query(studentRef);
	const querySnapshot = await getDocs(q);

	querySnapshot.forEach((doc) => {
		levels[doc.id] = doc.data()
	});

	return(levels);
}


export const UpdateLevel = async (qId, newData) =>{
	const dbRef = doc(db, "questions", qId);
	await updateDoc(dbRef, newData);
	return(" The question has been updated")
} 




