import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { FcGoogle } from "react-icons/fc"
import { firebaseAuth, usersRef } from '../utils/firebaseConfig';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { setUserStatus } from '../app/slices/AppSlice';
import { useDispatch } from 'react-redux';

function Login() {
    const dispatch = useDispatch();
    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        const {user:{ email, uid }} = await signInWithPopup(firebaseAuth,provider);
        if(email){
            const fireStoreQuery = query(usersRef, where("uid", "==",uid))
            const fetchedUser = await getDocs(fireStoreQuery)
            if(fetchedUser.docs.length === 0){
                await addDoc(usersRef,{ uid, email });
            }
            dispatch(setUserStatus({ email }));
        }
    };
  return (
    <div className="login">
        <button className="login-btn" onClick={handleLogin}>
            <FcGoogle />
            Login with <span className="google-text">
                    <span className="blue">G</span>
                    <span className="red">o</span>
                    <span className="yellow">o</span>
                    <span className="blue">g</span>
                    <span className="green">l</span>
                    <span className="red">e</span>
                </span>
        </button>
    </div>
  )
}

export default Login