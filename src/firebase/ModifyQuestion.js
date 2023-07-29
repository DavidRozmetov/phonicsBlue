

import {db} from '../firebase-config.js'

import { collection, setDoc, doc, getDoc, query, where, getDocs, updateDoc, deleteDoc} from "firebase/firestore";

export const CreateQuestion = async (questionId, level, imgUrl, optA, optB, optC) => {
	try {
	  const docRef = await setDoc(doc(db, 'questions', questionId), {
	   	 optionA: optA,
	   	 optionB: optB,
	   	 optionC: optC,
	   	 url: imgUrl,
	   	 level: level
	  });
	} catch (e) {
	  console.error("Error adding document: ", e);
	}
}

export const ReadQuestion = async (questionId) =>{
    const docRef = doc(db, "questions", questionId);
    const docSnap = await getDoc(docRef);
 	const questionData = docSnap.data();
    if (docSnap.exists()) {
    	return (questionData);
	} else {
		return ("No Student Found with that Id")
	}
}



export const getLevelQuestions = async (level) =>{
	let questions = [];
	const studentRef = collection(db, "questions");
	const q = query(studentRef, where("level", "==", level));
	const querySnapshot = await getDocs(q);
	

	querySnapshot.forEach((doc) => {
		questions.push(doc.data())
	});

	return(questions);
}

export const getLevelQuestionsJSON = async (level) =>{
	let questions = {};
	const studentRef = collection(db, "questions");
	const q = query(studentRef, where("level", "==", level));
	const querySnapshot = await getDocs(q);
	

	querySnapshot.forEach((doc) => {
		questions[doc.id] = doc.data()
	});

	return(questions);
}

export const UpdateQuestion = async (qId, newData) =>{
	const dbRef = doc(db, "questions", qId);
	await updateDoc(dbRef, newData);
	return(" The question has been updated")
} 


export const DeleteQuestion = async (qid) =>{
	await deleteDoc(doc(db, "questions", qid)).error((e)=>{
		return(e.message)
	})	
	return("question has been deleted")
}

