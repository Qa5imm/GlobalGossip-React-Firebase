import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../config/firebase'
import { signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()


  const handlesSignout = async () => {
    const result = await signOut(auth)
    navigate("/")
    window.location.reload()
  }
  return (
    <div className='flex  items-center justify-end text-black-600 m-auto p-6 mb-6 bg-blue-400 ' >
      <div className='mr-16 text-white text-lg'>
        <Link className='mx-2 ' to="/"> Home </Link>
        {!user ?
          <Link className='mx-2 ' to="/login"> Login</Link>
          :
          <Link className='mx-2 ' to="/post"> Create post </Link>
        }
      </div>
      {user &&
        <div className='flex justify-center items-center gap-x-2'>
          {
            <img className='w-8 h-8 rounded-full' src={user.photoURL || " "}
              alt="" />}
          <p >{user?.displayName}</p>
          <button className='border border-1 border-black bg-gray-300 px-2 py-1 hover:bg-gray-200 rounded ml-2' onClick={handlesSignout}>Logout</button>
        </div>
      }
    </div>
  )
}

export default Navbar