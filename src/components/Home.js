import { Avatar, Typography } from "@mui/material";
import { useState,useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {makeStyles} from "@material-ui/core/styles"
import {Grid} from '@mui/material';
import {storage,db} from '../db/firebase_config';
import * as store from 'firebase/storage';
import { onValue,ref, remove,update,set } from 'firebase/database';
import { Container,Form,Button,Col,Row } from "react-bootstrap";
// import  from 'firebase/database';
const useStyles=makeStyles((theme)=>({
    table:{
        minWidth:650,
    },
    tableContainer:{
        borderRadius:15,
        margin:"10px 10px",
    },
    tableHeaderCell:{
        fontWeight:'bold',
        // backgroundColor:theme.palette.primary.dark,
        color:theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar:{
        backgroundColor:theme.palette.primary.light,
        color:theme.palette.getContrastText(theme.palette.primary.light)
    },
    name:{
        fontWeight:'bold',
        color:theme.palette.secondary.dark
    }
}))
function Home()
{
    const [userData,setUserData]=useState([])
    const classes=useStyles()
    const [comData,setcomData]=useState([])
    const [trainerData,setTrainerData]=useState([])
    const [count,setCount]=useState(0)
    const [count1,setCount1]=useState(0)
    const [count2,setCount2]=useState(0)
    var counter=0;
    var counter1=0;
    var counter2=0
    let MData=[];
    // const uid=uid()
    useEffect(()=>{
        onValue(ref(db,`/${"Users"}`),snapshot=>{
        const data=snapshot.val()
        if(data!=null)
        {
            const list=[];
            const list1=[]
            for(let itm in data)
            {
                if(data[itm].trainer!=true)
                {
                    counter=counter+1;
                    list.push({itm,...data[itm]})
                }
                if(data[itm].trainer==true)
                {
                    counter1=counter1+1;
                    list1.push({itm,...data[itm]})
                }
            }
            console.log(counter)
            setUserData(list)
            setTrainerData(list1)
            setCount(counter)
            setCount1(counter1)
            console.log(list)
        }
        })
        onValue(ref(db,`/${"Communities"}`),snapshot=>{
            const data=snapshot.val()
            if(data!=null)
            {
              const list=[];
              for(let itm in data)
              {
                 list.push({itm,...data[itm]})
              }
              setcomData(list)
            }
          })
    },[])   
    return<>
            <Row className="bg-light rounded border p-3">
                <Row className='d-flex justify-content-evenly '>
                    <h1 className='mt-2 ms-2'>Dashboard</h1>
                    <Col lg={4} md={4} sm={4} className='bg-warning mt-3' style={{width:250,height:250,borderRadius:20}}>
                       <h1 className="mt-2 ms-2 text-light">Community</h1>
                       <h1 style={{fontSize:100}} className='ms-5 text-light ps-4 pt-2'>{Object.keys(comData).length}<sup>+</sup></h1>
                    </Col>
                    <Col lg={4} md={4} sm={4} className='bg-danger mt-3' style={{width:250,height:250,borderRadius:20}}>
                        <h1 className="mt-2 ms-2 text-light">Users</h1>
                        <h1 style={{fontSize:100}} className='ms-5 text-light ps-2 pt-2'>{count}<sup>+</sup></h1>
                    </Col>
                    <Col lg={4} md={4} sm={4} className='bg-success mt-3'  style={{width:250,height:250,borderRadius:20}}>
                        <h1 className="mt-2 ms-2 text-light">Trainers</h1>
                        <h1 style={{fontSize:100}} className='ms-5 text-light ps-4 pt-2'>{count1}<sup>+</sup></h1>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} md={6} sm={6}>
                        <h2 className="mt-4 ms-2">Users</h2>
                        <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead style={{backgroundColor:"#AFEA0D"}}>
                            <TableRow>
                                <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Email</TableCell>
                                <TableCell className={classes.tableHeaderCell}>No of followers</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {userData.map((row,index) => (
                                <TableRow
                                key={row.itm}
                                >
                                <TableCell>
                                    <Grid container>
                                        <Grid item lg={10}>
                                        <Typography className={classes.name}>{row.fullName}</Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>
                                        <Typography color="primary" variant="subtitles2">{row.email}</Typography>
                                </TableCell>
                                <TableCell>{row.followersCount}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                    <h2 className="mt-4 ms-2">Trainers</h2>
                    <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead style={{backgroundColor:"#AFEA0D"}}>
                            <TableRow>
                                <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Email</TableCell>
                                <TableCell className={classes.tableHeaderCell}>No of followers</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {trainerData.map((row) => (
                                <TableRow
                                key={row.name}
                                >
                                <TableCell>
                                    <Grid container>
                                        <Grid item lg={10}>
                                        <Typography className={classes.name}>{row.fullName}</Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>
                                    <Typography color="primary" variant="subtitles2">{row.email}</Typography>
                                </TableCell>
                                    <TableCell>{row.followersCount}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </Col>
                </Row>
            </Row>
    </>
}
export default Home;