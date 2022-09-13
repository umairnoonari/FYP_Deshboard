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
import {db,storage} from '../db/firebase_config';
import {  onValue,ref,remove,set } from 'firebase/database';
import * as store from 'firebase/storage';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomDialog from './Dialog';
import Community_Update from './Community_Update';
import { Formik, useFormik } from "formik"
import SearchIcon from '@mui/icons-material/Search';
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
        // backgroundColor:theme.palette.info.main,
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
  const [formikdata,setformikData]=useState()
  const [file,setFile]=useState()
  const [url,setUrl]=useState()
  const [search,setSearch]=useState("")
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
        <h1>Communities</h1>
        <div className="col-12 rounded bg-white p-3">
            
            <div className='row'>
            <div className="col-10">
            <div class="input-group" >
              <div class="form-floating mb-2">
                  <input type="text" class="form-control" name="Search" id="WorkoutName" placeholder="Search" style={{height:70,width:500,fontSize:20}} onChange={(e)=>{setSearch(e.target.value)}}/>
                  <label for="WorkoutName" className='mt-1'>Search</label>
              </div>
              <button id="search-button" type="button" class="btn" style={{height:70,width:80,fontSize:20,backgroundColor:"#3cda3c"}} >
                <SearchIcon></SearchIcon>
              </button>
            </div>
            </div>
            <div className="col-2">
              <CustomDialog data={comData}>
              </CustomDialog>
            </div>
            </div>
        </div>
    <div className="col-12 mt-3 p-1" style={{marginInlineStart:'-13px'}}>
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor:"#3cda3c"}}>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Category Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Age Limit</TableCell>
            <TableCell className={classes.tableHeaderCell}>Type</TableCell>
            <TableCell className={classes.tableHeaderCell}>Price</TableCell>
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(comData)}
          {comData.filter((itm)=>{
            if(search=="")
            {
              return itm
            }
            else if(itm.catName.toLowerCase().includes(search.toLowerCase()))
            {
              return itm
            }
          }).map((row,index) => (
            <TableRow
              key={index}
            >
              <TableCell>
                <Grid container>
                    <Grid item lg={2}>
                         <Avatar alt={row.name} src="." className={classes.avatar}></Avatar>
                    </Grid>
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
                    <Typography color="textSecondary" variant="body2">{row.info!=null?row.info.type:"NA"}</Typography>
                  </Grid>
                    </TableCell>
              <TableCell>
                <Grid item lg={4}>
                    <Typography color="textSecondary" variant="body2">{row.info!=null?row.info.price:"NA"}</Typography>
                  </Grid>
              </TableCell>
              <TableCell><Grid container>
                    <Grid item lg={1}>
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>handelDelete(row.itm)}>
                    </Button>
                    </Grid>
                    <Grid item lg={1}>
                    <Community_Update data={row}></Community_Update>
                    </Grid>
                </Grid></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
}
