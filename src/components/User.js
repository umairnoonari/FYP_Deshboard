import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Avatar,Grid,Typography} from '@mui/material';
// import faker from 'faker';
import {makeStyles} from "@material-ui/core/styles"
import { textAlign } from '@mui/system';
// import { margin, minWidth } from '@mui/system';
import {useEffect,useState} from 'react';
import db from '../db/firebase_config';
import { onValue,ref, remove } from 'firebase/database';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from "@material-ui/core"
import uid from 'uid';
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
        backgroundColor:theme.palette.primary.dark,
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

export default function User() {
  const classes=useStyles()
  const [userData,setUserData]=useState([])
  let MData=[];
  // const uid=uid()
  useEffect(()=>{
    onValue(ref(db,`/${"Users"}`),snapshot=>{
      const data=snapshot.val()
      if(data!=null)
      {
        const list=[];
        for(let itm in data)
        {
            if(data[itm].trainer!=true)
            {
              list.push({itm,...data[itm]})
            }
        }
        setUserData(list)
        console.log(list)
      }
    })
  },[])
  const handelDelete=(row)=>
  {
      remove(ref(db,`/${"Users"}`+`/${row}`));
      console.log(row)
  }
  return (
    <div className="row rounded bg-light p-3">
        <div className="col-12 rounded bg-white p-3 d-">
            <h2 className='me-3'>User Data</h2>
        </div>
    <div className="col-12 mt-3 p-1" style={{marginInlineStart:'-13px'}}>
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Email</TableCell>
            <TableCell className={classes.tableHeaderCell}>No of followers</TableCell>
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((row,index) => (
            <TableRow
              key={row.itm}
            >
              <TableCell>
                <Grid container>
                    <Grid item lg={2}>
                         <Avatar alt={row.fullName} src="." className={classes.avatar}></Avatar>
                    </Grid>
                    <Grid item lg={10}>
                       <Typography className={classes.name}>{row.fullName}</Typography>
                    </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                    <Typography color="primary" variant="subtitles2">{row.email}</Typography>
            </TableCell>
              <TableCell>{row.followersCount}</TableCell>
              <TableCell><Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>handelDelete(row.itm)}></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
}
