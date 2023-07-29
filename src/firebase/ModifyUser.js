import React, {useState} from 'react'

import {db} from '../firebase-config.js'

import { collection, addDoc, setDoc, doc, getDoc, updateDoc, query, where, getDocs, deleteDoc} from "firebase/firestore";

// userId, userEmail, userName, userSurname, visibleId

export const CreateUser = async (userUid, userEmail, userRole, visibleId) => {

	try {

	  const docRef = await setDoc(doc(db, "users", userUid), {
	   	 userRole: userRole,
	   	 visibleId: visibleId,
	   	 userName: "",
	   	 userSurname: "",
	   	 userLevel: 0,
	   	 level1: 0,
	   	 level2: 0,
	   	 level3: 0,
	   	 level4: 0
	  });
	  console.log("Document written with ID: ", docRef.id);
	} catch (e) {
	  console.error("Error adding document: ", e);
	}
}


// await ReadUser(uid).then((res) => {userData = res;});
export const ReadUser = async (userUid) =>{
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);
 	const userData = docSnap.data();
    if (docSnap.exists()) {
    	return (userData);
	}
}



export const findAUserByVisualId = async (vId) =>{

	let user = {};


	const userRef = collection(db, "users");

	const q = query(userRef, where("visibleId", "==", vId));

	const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
	// doc.data() is never undefined for query doc snapshots
		 

		user = doc.data()
	});


	return(user);
}



export const UpdateUser = async (userUid, newData) =>{
	const dbRef = doc(db, "users", userUid);

	await updateDoc(dbRef, newData);
	return("Your profile has been updated")
}

export const UpdateUserLevel = async (userUid, level) =>{
	const dbRef = doc(db, "users", userUid);

	await updateDoc(dbRef, {
		userLevel: level
	});
}


export const DeleteUser = async (vid) =>{
	await deleteDoc(doc(db, "users", vid)).then(()=>{
		console.log(vid, "user has been deleted")
	})	
	
}




