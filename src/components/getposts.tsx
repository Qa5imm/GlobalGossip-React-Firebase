import React, { FC, Key, useEffect, useState } from 'react'
import { IPosts } from '../pages/home'
import { collection, addDoc, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { database, auth } from '../config/firebase'



interface IPost {
    post: IPosts,
}
interface ILike {
    userId: string,
    postId: string,
    likeid?: string
}
const likesRef = collection(database, "Likes")

const GetPosts: FC<IPost> = ({ post }) => {
    const [user] = useAuthState(auth)
    const [numlikes, setNumlikes] = useState<ILike[] | null>(null)

    const handldelike = async () => {
        console.log("like funct called")
        try {
           const newDoc= await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id
            })
            if (user) {
                setNumlikes((prev) => (prev ? [...prev, { userId: user?.uid, postId: post.id, likeid: newDoc.id }] : [{ userId: user?.uid, postId: post.id , likeid: newDoc.id }]))
            }
        }
        catch (err) {
            console.log("error in sending ", err)
        }
        // console.log("check ", numlikes)
        // const value= Number(numlikes) + 1
        // console.log("new value ", value)
        // setNumlikes(value)
    }
    const handledislike = async () => {
        console.log("dislike funct called")
        const dellikeid = numlikes?.filter((like) => (like.userId == user?.uid && like.postId == post.id))
        console.log(dellikeid)
        const delvalueid = dellikeid? dellikeid[0].likeid: false
        console.log("id to be delted", delvalueid)
        if (delvalueid) {
            const dellike = doc(database, "Likes", delvalueid)
            await deleteDoc(dellike)
        }
        setNumlikes((prev) => prev ? prev.filter((like) => (like.likeid !== delvalueid)) : prev)
    }
    const postLikes = query(likesRef, where("postId", "==", post.id))

    const getLikes = async () => {
        const result = await getDocs(postLikes)
        setNumlikes(result.docs.map((res) => ({...res.data(), likeid: res.id})) as ILike[])
        // console.log(result.docs.map((res) => ({ ...res.data(), likedocid: res.id })))
        // const snapshot = await getCountFromServer(postLikes);
        // console.log("snapshot", snapshot.data().count)
        // setNumlikes(snapshot.data().count)
    }
    const checkLike = numlikes?.find((like) => like.userId === user?.uid)
    console.log("condiiton ", checkLike)
    useEffect(() => {
        getLikes()
        console.log("effect")

    }, [])
    // {console.log( "here", numlikes)}
    return (
        <div className='m-auto w-1/2'>
            <div className='flex flex-start border border-1 border-b-0 w-1/3 inline font-bold rounded justify-center p-1'>{post?.username}</div>
            <div className='mb-8 border border-1 m-auto  flex flex-col'>
                <div className=' basis-12 font-bold text-3xl border border-1'>{post?.title}</div>
                <div className='basis-16 flex justify-center items-center'>{post?.description}</div>
                <button onClick={checkLike ? handledislike : handldelike} className={checkLike ? 'bg-blue-300 m-auto px-2 rounded mb-1 tracking-widest' : 'bg-gray-300 m-auto px-2 rounded mb-1 tracking-widest'}> <> &#128077; {numlikes?.length}</> </button>
            </div>
        </div>
    )
}

export default GetPosts