import React from 'react'
import {auth, provider} from '../config/firebase'
import {signInWithPopup} from 'firebase/auth'
import { async } from '@firebase/util'
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const navigate= useNavigate()

  const signInWithGoogle= async() =>{
    const result =await signInWithPopup(auth, provider)
    // window.location.reload(true)
    // window.location.reload();
    navigate("/")
  }
  return (
    <div>
      <button onClick={signInWithGoogle} className='border border-1 bg-gray-300 p-2 rounded-lg'>Login in with google</button>

    </div>
  )
}

export default Login