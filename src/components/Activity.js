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
import {db} from '../db/firebase_config';
import { DataSnapshot, onValue,ref, remove } from 'firebase/database';
import {useEffect,useState} from 'react';
// import { margin, minWidth } from '@mui/system';
import {Button} from "@material-ui/core"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkoutDialog from './WorkoutDialog';
import ViewExercise from './ViewExercise';
import WorkoutDialogUpdate from './WorkoutDialogUpdate';
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

export default function Activity() {
  const classes=useStyles()
  const [woData,setWOData]=useState([])
  const [search,setSearch]=useState("")
  useEffect(()=>{
    onValue(ref(db,`/${"Workouts"}`),snapshot=>{
      const data=snapshot.val()
      if(data!=null)
      {
        const list=[];
        for(let itm in data)
        {
           list.push({itm,...data[itm]})
        }
        setWOData(list)
      }
    })
  },[])
  const handelDelete=(row)=>
  {
      remove(ref(db,`/${"Workouts"}`+`/${row}`));
      console.log(row)
  }
  var exe=[]
  const handelShow=(row)=>{

  }
  return (
    <div className="row rounded bg-light p-3">
      <h1>Workouts</h1>
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
            <div className="col-2 mt-1">
              <WorkoutDialog data={woData}></WorkoutDialog>
            </div>
            </div>
        </div>
    <div className="col-12 mt-3 p-1" style={{marginInlineStart:'-13px'}}>
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor:"#3cda3c"}}>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Workout Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Exercise</TableCell>
            <TableCell className={classes.tableHeaderCell}>Difficultly Level</TableCell>
            <TableCell className={classes.tableHeaderCell}>Point</TableCell>
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {woData.filter((itm)=>{
            if(search=="")
            {
              return itm
            }
            else if(itm.name.toLowerCase().includes(search.toLowerCase()))
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
                    <Grid item lg={10}>
                       <Typography className={classes.name}>{row.name}</Typography>
                    </Grid>
                </Grid>
              </TableCell>
              <TableCell>
              <Grid>
                  {console.log(row.Exercises)}
                   <ViewExercise data={row.Exercises!=undefined?row.Exercises:"NA"} data1={row.itm}></ViewExercise>
              </Grid>
            </TableCell>
              <TableCell >{row.diff}</TableCell>
              <TableCell>{row.points}</TableCell>
              <TableCell>
              <Grid container>
                    <Grid item lg={1}>
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>handelDelete(row.itm)}>
                    </Button>
                    </Grid>
                    <Grid item lg={1}>
                    <WorkoutDialogUpdate data={row}/>
                    </Grid>
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
