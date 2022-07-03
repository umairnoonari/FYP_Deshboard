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

export default function Activity() {
  const classes=useStyles()
  const [woData,setWOData]=useState([])
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
        console.log(list)
      }
    })
  },[])
  const handelDelete=(row)=>
  {
      remove(ref(db,`/${"Workouts"}`+`/${row}`));
      console.log(row)
  }
  return (
    <div className="row rounded bg-light p-3">
        <div className="col-12 rounded bg-white p-3">
            <div className='row'>
            <div className="col-10">
                <h2>Workouts</h2>
            </div>
            <div className="col-2 mt-1">
            <CustomDialog>
                  <h3 id="h">Add Workout</h3>
                      <form >
                      <h4 className="mt-2">Information of Workout</h4>
                      <div class="form-group mt-2">
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" name="catName" id="CatName" placeholder="Category Name" />
                              <label for="CatName">Category Name</label>
                          </div>
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" id="AgeLimit" name="ageLimit" placeholder="Age Limit"  />
                              <label for="AgeLimit">Age Limit</label>
                          </div>
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" id="Description1" name="description1" placeholder="Description 1" />
                              <label for="Description1">Description 1</label>
                          </div>
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" id="Description2"  placeholder="Description 2" name="description2" />
                              <label for="Description2">Description 2</label>
                          </div>
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" name="price" id="Price" placeholder="Price" />
                              <label for="Price">Price</label>
                          </div>
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" id="type" name="type" placeholder="Type"   />
                              <label for="type">Type</label>
                          </div>
                              <input type="file" class="form-control" name="img" placeholder="Attach img"  />
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
            <TableCell className={classes.tableHeaderCell}>Workout Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Exercise</TableCell>
            <TableCell className={classes.tableHeaderCell}>Time</TableCell>
            <TableCell className={classes.tableHeaderCell}>Difficultly Level</TableCell>
            <TableCell className={classes.tableHeaderCell}>Point</TableCell>
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {woData.map((row,index) => (
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
                   {Object.values(row.Exercises).map(itm=><Typography>{itm.name}</Typography>)}
              </Grid>
            </TableCell>
            <TableCell>
              <Grid>
                   {Object.values(row.Exercises).map(itm=><Typography>{itm.time} seconds</Typography>)}
              </Grid>
            </TableCell>
              <TableCell >{row.diff}</TableCell>
              <TableCell>{row.points}</TableCell>
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
