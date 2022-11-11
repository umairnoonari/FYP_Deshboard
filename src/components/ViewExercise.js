import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@material-ui/core';
import { ChildCareRounded } from '@mui/icons-material';
import {db,storage} from '../db/firebase_config';
import DeleteIcon from '@mui/icons-material/Delete';
import {  onValue,ref,remove,set } from 'firebase/database';
import * as store from 'firebase/storage';
import {Avatar,Grid} from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddExercise from './AddExercise';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const useStyles=makeStyles((theme)=>({
    dialog:{
        Width:1000,
    },
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
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 0 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right:-480 ,
            top: -43,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ViewExercise(props) {
  const [open, setOpen] = React.useState(false);
  const classes=useStyles()
  const [formikdata,setformikData]=useState()
  const [file,setFile]=useState()
  const [url,setUrl]=useState()
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handel=(e)=>{
      const file=e.target.files
      setFile(file[0])
  }
  const handelDelete=(i)=>
  {
      remove(ref(db,`/Workouts/${props.data1}/Exercises/${i}`));
    //   console.log(row)
  }
  return (
    <div>
      <Button variant="outlined"  onClick={handleClickOpen}> View Exercises
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.dialog}
      >
        <BootstrapDialogTitle id="customized-dialog-title" className="pt-3"  style={{height:"80px"}}>
          <h3 className='pt-3 ps-3'>Exercises</h3>
          <AddExercise data2={props.data1} />
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <TableContainer component={Paper} className={classes.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor:"#AFEA0D"}}>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Exercise Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Time</TableCell>
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {console.log(props.data)}
          {props.data!="NA"?Object.keys(props.data).map((key,index) => (
            <TableRow
              key={index}
            >
              <TableCell>
                <Grid container>
                    <Grid item lg={10}>
                       <Typography className={classes.name}>{props.data[key].name}</Typography>
                    </Grid>
                </Grid>
              </TableCell>
              <TableCell >{props.data[key].time}</TableCell>
              <TableCell>
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>{handelDelete(key)}}></Button>
                </TableCell>
            </TableRow>
          )):""}
        </TableBody>
      </Table>
    </TableContainer>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}