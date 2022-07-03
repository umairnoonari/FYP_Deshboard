import { Avatar, Typography } from "@mui/material";
import { useState } from "react";
import {storage,db} from '../db/firebase_config';
import * as store from 'firebase/storage';
// import  from 'firebase/database';
function Home()
{
    const [file,setFile]=useState()
    const [url,setUrl]=useState(null);
    function handelChange(e)
    {
        const file=e.target.files
        setFile(file[0])
    }
    function save()
    {
        console.log(file)
        const imageRef=store.ref(storage,`images/${file.name}`);
        store.uploadBytes(imageRef,file).then(()=>{
            store.getDownloadURL(imageRef).then((url)=>{
                console.log(url)
                setUrl(url)
            }).catch((error)=>{
                console.log(error.message,"Error getting the url image")
            })
            setFile(null)
        }).catch((error)=>{
            console.log(error.message,)
        })
    }
    return<>
    <h1>Welcome to Fitness Enthusitias</h1>
    <Avatar src={url} alt="NA" style={{width:"50px",height:"50px"}}/>
    <input type='file'name="img" onChange={handelChange} />
    <button onClick={save}>Save</button>
    
    </>
}
export default Home;