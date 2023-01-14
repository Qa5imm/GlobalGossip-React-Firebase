import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs } from 'firebase/firestore'
import { database } from '../config/firebase'
import GetPosts from '../components/getposts'
import Login from './login'
import { auth } from '../config/firebase'  
import { useAuthState } from 'react-firebase-hooks/auth'
export interface IPosts {
    title: string,
    description: string,
    userId: string,
    username: string,
    id: string,
  }

const Home = () => {
  const [user] = useAuthState(auth)  
  const [posts, setPosts] = useState<IPosts[] | null>(null)
  const postsRef = collection(database, "Posts")
  const getPost = async () => {
      const data = await getDocs(postsRef)
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPosts[])
  }

  useEffect(() => {
     getPost()
     console.log("effect")

  }, [])
  
  // posts?.map((post)=>{
  //     console.log(post)
  // })
  return (
    <div>
      <h1 className='font-bold text-4xl mb-12' >All Global Gossips</h1>{
        posts?.map((post)=>(<GetPosts post={post}/>))
       }
 
    </div>
  )
}

export default Home