import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Avatar,Grid,Typography} from '@mui/material';
import {useEffect,useState} from 'react';
import {db} from '../db/firebase_config';
import { onValue,ref,remove } from 'firebase/database';
// import faker from 'faker';
import {makeStyles} from "@material-ui/core/styles"
import {Button} from "@material-ui/core"
// import { margin, minWidth } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
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

export default function Trainer() {
  const classes=useStyles()
  const [trainerData,setTrainerData]=useState([])
  const [open,setOpen]=useState(true)
  const [search,setSearch]=useState("")
  let MData=[];
  useEffect(()=>{
    onValue(ref(db,`/${"Users"}`),snapshot=>{
      const data=snapshot.val()
      if(data!=null)
      {
        const list=[];
        for(let itm in data)
        {
            // console.log("Hello world "+itm)
            if(data[itm].trainer==true)
            {
              list.push({itm,...data[itm]})
            }
        }
        setTrainerData(list)
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
      <h1>Trainer Data</h1>
      <div className="col-12 rounded bg-white p-3">
            <div className='row'>
            <div className="col-10">
            <div class="input-group" >
              <div class="form-floating mb-2">
                  <input type="text" class="form-control" name="Search" id="WorkoutName" placeholder="Search" style={{height:70,width:500,fontSize:20}} onChange={(e)=>{setSearch(e.target.value)}}/>
                  <label for="WorkoutName" className='mt-1'>Search</label>
              </div>
              <button id="search-button" type="button" class="btn" style={{height:70,width:80,fontSize:20,backgroundColor:"#AFEA0D"}} >
                <SearchIcon></SearchIcon>
              </button>
            </div>
            </div>
            </div>
        </div>
    <div className="col-12 mt-3 p-1" style={{marginInlineStart:'-13px'}}>
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
          {trainerData.filter((itm)=>{
            if(search=="")
            {
               return itm;
            }
            else if(itm.fullName.toLowerCase().includes(search.toLowerCase()))
            {
               return itm
            }
          }).map((row) => (
            <TableRow
              key={row.name}
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
               
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
}
