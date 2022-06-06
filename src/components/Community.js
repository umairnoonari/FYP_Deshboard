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

let USER=[],STATUS=['Active','Pending','Blocked'];
USER[0]={
        name:"Umair",
        email:"umairnoonari98@gmail.com",
        phone:"03142836313",
        jobTitle:"Software Developer",
        company:"Devsinc",
        joinDate:"12/6/15",
        status:"Active"
}
USER[1]={
    name:"Tahir",
    email:"Tahirnoonari98@gmail.com",
    phone:"03142336313",
    jobTitle:"Software Developer",
    company:"ImgGen",
    joinDate:"14/3/15",
    status:"Pending"
}
USER[2]={
    name:"Akash",
    email:"Akashkumar@gmail.com",
    phone:"0314656763",
    jobTitle:"Software Engineer",
    company:"Devsinc",
    joinDate:"12/3/14",
    status:"Blocked"
}
USER[3]={
    name:"Nazeer",
    email:"nazeer@gmail.com",
    phone:"0315343432",
    jobTitle:"Full Stack Developer",
    company:"10Pearl",
    joinDate:"12/6/20",
    status:"Active"
}

console.log(USER)
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
  return (
    <div className="row rounded bg-light p-3">
        <div className="col-12 rounded bg-white p-3">
            <div className='row'>
            <div className="col-11">
                <h2>Communities</h2>
            </div>
            <div className="col-1">
            <button className="btn btn-primary me-2" data-bs-target="#mymodal" data-bs-toggle="modal">Add</button>
            <div class="modal mt-5" id="mymodal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Add Trainer</h3>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <form>
                            <div class="form-group mt-2">
                                <input type="text" class='form-control mt-2' placeholder='Trainer Name'></input>
                                <input type="number" class='form-control mt-2' placeholder='age'></input>
                                <input type="text" class='form-control mt-2' placeholder='Degree'></input>
                                <input type="submit" value="Submit" class="btn btn-success mt-2"></input>
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
            <TableCell className={classes.tableHeaderCell}>User Info</TableCell>
            <TableCell className={classes.tableHeaderCell}>Job Info</TableCell>
            <TableCell className={classes.tableHeaderCell}>Joining Date</TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {USER.map((row) => (
            <TableRow
              key={row.name}
            >
              <TableCell>
                <Grid container>
                    <Grid item lg={2}>
                         <Avatar alt={row.name} src="." className={classes.avatar}></Avatar>
                    </Grid>
                    <Grid item lg={10}>
                       <Typography className={classes.name}>{row.name}</Typography>
                       <Typography color="textSecondary" variant="body2">{row.email}</Typography>
                       <Typography color="textSecondary" variant="body2">{row.phone}</Typography>
                    </Grid>
                </Grid>
                
               
              </TableCell>
              <TableCell>
                    <Typography color="primary" variant="subtitles2">{row.jobTitle}</Typography>
                    <Typography color="textSecondary" variant="body2">{row.company}</Typography>
            </TableCell>
              <TableCell >{row.joinDate}</TableCell>
              <TableCell><button type="button" class="btn-close bg-warning" aria-label="Close"></button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
}
