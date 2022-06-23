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
import {Button,TextField} from "@material-ui/core"
import { textAlign } from '@mui/system';
import { useEffect,useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
// import { margin, minWidth } from '@mui/system';
import db from '../db/firebase_config';
import {  onValue,ref,remove } from 'firebase/database';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomDialog from './Dialog';
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
        backgroundColor:theme.palette.info.main,
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
  const [open,setOpen]=useState(false);
  let MData=[];
  useEffect(()=>{
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
        console.log(list)
      }
    })
  },[])
  const handelDelete=(row)=>
  {
      remove(ref(db,`/${"Communities"}`+`/${row}`));
      console.log(row)
  }
  return (
    <div className="row rounded bg-light p-3">
        <div className="col-12 rounded bg-white p-3">
            <div className='row'>
            <div className="col-10">
                <h2>Communities</h2>
            </div>
            <div className="col-2">
              <CustomDialog>
                  <h3 id="h">Add Community</h3>
                      <form>
                      <div class="form-group mt-2">
                          
                          <input type="text" class='form-control mt-2' placeholder='Category Name' style={{width:"500px"}}></input>
                          <h4 className="mt-5">Information of Community</h4>
                          <input type="text" class='form-control mt-2' placeholder='age' style={{width:"500px"}}></input>
                          <input type="text" class='form-control mt-2' placeholder='Degree' style={{width:"500px"}}></input>
                          <input type="submit" value="Submit" class="btn btn-success mt-2" style={{width:"500px"}}></input>
                      </div>
                  </form>
              </CustomDialog>
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
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
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
