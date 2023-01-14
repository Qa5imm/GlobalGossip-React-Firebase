import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {addDoc, collection} from 'firebase/firestore'
import { auth, database } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { async } from '@firebase/util'
import { useNavigate } from 'react-router-dom'


const Postform = () => {
    const [user] = useAuthState(auth)
    const [isdisabled, setisdisabled]= useState<boolean>(false)
    const navigate= useNavigate()
    interface IPost{
        title: string,
        description: string
    }
    const myschema=yup.object().shape({
        title: yup.string().required("Can't post without a title"),
        description: yup.string().required("Can't post without a description")
    })
    const {register, handleSubmit, formState: {errors}}= useForm<IPost> ({
        resolver: yupResolver(myschema) 
    })
    const postsRef= collection(database, "Posts")

    const PostCreator= async(data:IPost)=>{ 
        setisdisabled(true)
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid 
        })
        
        navigate("/")
        // console.log(data)    

    }
    return (
        <div>
            <h2 className='text-4xl font-bold mb-8'>New post</h2>
            <form action="" onSubmit={handleSubmit(PostCreator)} className='flex flex-col justifiy-center items-center gap-y-4'>
                <input placeholder='title...'         {...register("title")} type="text" className=' p-2 rounded border border-1' />
                <p className='text-sm text-red-600'>{errors.title?.message}</p>
                <textarea placeholder='description...'{...register("description")} rows={5} className='p-2 rounded border border-1'></textarea>
                <p className='text-sm text-red-600'>{errors.description?.message}</p>
                <input type="submit" disabled={isdisabled} className='border border-1 border-black bg-gray-300 px-4 py-1 hover:bg-gray-200 rounded' value="post" />
            </form>
        </div>
    )
}

export default Postform