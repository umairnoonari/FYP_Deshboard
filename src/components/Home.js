import { Avatar, Typography } from "@mui/material";
import { useState } from "react";
// import {Button,Modal,Box} from "@material-ui/core"
import CustomDialog from "./Dialog";
import {storage} from '../db/firebase_config';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
function Home()
{
    const [file,setFile]=useState(false)
    const [url,setUrl]=useState(null);
    function handelChange(e)
    {
        const file=e.target.files
        setFile(file[0])
    }
    function save()
    {
        console.log(file)
        const imageRef=ref(storage,`images/${file.name}`);
        uploadBytes(imageRef,file).then(()=>{
            getDownloadURL(imageRef).then((url)=>{
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