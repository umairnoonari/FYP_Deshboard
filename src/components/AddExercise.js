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
import {  onValue,ref,remove,set } from 'firebase/database';
import * as store from 'firebase/storage';
import { useState } from 'react';
import { useFormik } from 'formik';
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
        minWidth:900,
    },
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

export default function AddExercise(props) {
  const [open, setOpen] = React.useState(false);
  const classes=useStyles()
  const [formikdata,setformikData]=useState()
  const [file,setFile]=useState()
  const [url,setUrl]=useState()
  const [search,setSearch]=useState("")
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const formik=useFormik({
    initialValues:{ExerciseName:"",Time:""},
    onSubmit:async values=>{
          console.log(file)
          if(values.ExerciseName!=null&&values.Time!=null)
          {
            {console.log(props.data)}
            set(ref(db,`Workouts/${props.data2}/Exercises/${values.ExerciseName}`),{
              name:values.ExerciseName,time:values.Time
            })
            console.log("Save Data Successfully ")
            setOpen(false);
        }
        },
        validate:values=>{
          let errors={}
          if(!values.ExerciseName)
          {
               errors.ExerciseName="ExerciseName is Required"
          }
          if(!values.Time)
          {
              errors.Time="Time is Required"
          }
          return errors
        }
  })
  const handel=(e)=>{
      const file=e.target.files
      setFile(file[0])
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} style={{position: 'absolute',
            right:20 ,
            top: 30,}}>
      <AddIcon></AddIcon>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.dialog}
      >
        <BootstrapDialogTitle id="customized-dialog-title" className="pt-3"  style={{height:"80px"}} onClose={handleClose}>
          <h3 className="text-center">Add Exercise</h3>
        </BootstrapDialogTitle>
        <DialogContent dividers>
                      <form onSubmit={formik.handleSubmit}>
                      <h4 className="mt-2">Information of Exercise</h4>
                      <div class="form-group mt-2">
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" name="ExerciseName" id="ExerciseName" placeholder="Exercise Name" value={formik.values.ExerciseName} onChange={formik.handleChange} />
                              <label for="ExerciseName">Exercise Name</label>
                              <span style={{color:"red"}}>{formik.touched.ExerciseName&&formik.errors.ExerciseName}</span>
                          </div>
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" id="time" name="Time" placeholder="Time" value={formik.values.Time}onChange={formik.handleChange} />
                              <label for="time">Time</label>
                              <span style={{color:"red"}}>{formik.touched.Time&&formik.errors.Time}</span>
                          </div>
                              <input type="submit" value="Submit" class="btn btn-success mt-2" style={{width:"500px"}} onClick={handleClose}></input>
                      </div>
                  </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}