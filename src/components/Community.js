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
import { useEffect,useState } from 'react';
// import { margin, minWidth } from '@mui/system';
import db from '../db/firebase_config';
import { DataSnapshot, onValue,ref } from 'firebase/database';


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

export default function Community() {
  const classes=useStyles()
  const [comData,setcomData]=useState([])
  let MData=[];
  useEffect(()=>{
    onValue(ref(db,`/${"Communities"}`),snapshot=>{
      const data=snapshot.val()
      if(data!=null)
      {
        Object.values(data).map((itm)=>{
          setcomData((i)=>[...i,itm])
        })
        console.log(comData)
      }
    })
  },[])
  // MData=JSON.parse(MData)
  return (

    <div className="row rounded bg-light p-3">
        <div className="col-12 rounded bg-white p-3">
            <div className='row'>
            <div className="col-11">
                <h2>Communities</h2>
            </div>
            <div className="col-1">
            <button className="btn btn-primary me-2" data-bs-target="#mymodal" data-bs-toggle="modal">Add</button>
            <div className="modal mt-5" id="mymodal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Add Trainer</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                            <div className="form-group mt-2">
                                <input type="text" className='form-control mt-2' placeholder='Trainer Name'></input>
                                <input type="number" className='form-control mt-2' placeholder='age'></input>
                                <input type="text" className='form-control mt-2' placeholder='Degree'></input>
                                <input type="submit" value="Submit" className="btn btn-success mt-2"></input>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </div>
    <div className="col-12 mt-3 p-1" style={{marginInlineStart:'-13px'}}>
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          
            <TableCell className={classes.tableHeaderCell}>Category Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Age Limit</TableCell>
            <TableCell className={classes.tableHeaderCell}>Description 1</TableCell>
            <TableCell className={classes.tableHeaderCell}>Description 2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(comData)}
          {comData.map((row,index) => (
            <TableRow
              key={index}
            >
              <TableCell>
                <Grid container>
                    {/* <Grid item lg={2}>
                         <Avatar alt={row.name} src="." className={classes.avatar}></Avatar>
                    </Grid> */}
                    <Grid item lg={4}>
                       <Typography className={classes.name}>{row.catName}</Typography>
                    </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                    <Typography color="primary" variant="subtitles2">{row.info!=null? row.info.ageLimit:"NA"}</Typography>
            </TableCell>
              <TableCell >
                    <Grid item lg={4}>
                    <Typography color="textSecondary" variant="body2">{row.info!=null?row.info.description1:"NA"}</Typography>
                  </Grid>
                    </TableCell>
              <TableCell>
                <Grid item lg={4}>
                    <Typography color="textSecondary" variant="body2">{row.info!=null?row.info.description2:"NA"}</Typography>
                  </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
}
