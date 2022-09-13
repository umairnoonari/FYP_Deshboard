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
import {  onValue,ref,remove,update } from 'firebase/database';
import * as store from 'firebase/storage';
import { useState } from 'react';
import { useFormik } from 'formik';
import UpdateIcon from '@mui/icons-material/Update';
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

export default function WorkoutDialogUpdate(props) {
  const [open, setOpen] = React.useState(false);
  const classes=useStyles()
  const [formikdata,setformikData]=useState()
  const [file,setFile]=useState()
  const [url,setUrl]=useState()
  const [flag,setFlag]=useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(props.data)
  const formik=useFormik({
    initialValues:{WorkoutName:"N",DifficultyLevel:"N",Points:"N",type:"N"},
    onSubmit:async values=>{
        console.log(file)
        var data=""
          const imageRef=store.ref(storage,`images/${file.name}`);
          await store.uploadBytes(imageRef,file).then(async()=>{
               await store.getDownloadURL(imageRef).then((url)=>{
                  console.log(url)
                  data=url
              }).catch((error)=>{
                  console.log(error.message,"Error getting the url image")
              })
              setFile(null)
          }).catch((error)=>{
              console.log(error.message,)
          })
          if(values.WorkoutName!="N"&&values.DifficultyLevel!="N"&&values.Points!="N"&&values.type!="N")
          {
            update(ref(db,`/Workouts/${props.data.itm}`),{
              bg:data,diff:values.DifficultyLevel,name:values.WorkoutName,points:values.Points,type:values.type
            })
            setOpen(false)
          }
          else
          {
            update(ref(db,`/Workouts/${props.data.itm}`),{
              bg:data,diff:props.data.diff,name:props.data.name,points:props.data.points,type:values.type
            })
            setOpen(false)
          }
          if(values.WorkoutName!="N"||values.DifficultyLevel!="N"||values.Points!="N"||values.type!="N")
          {
            update(ref(db,`/Workouts/${props.data.itm}`),{
              bg:data,diff:values.DifficultyLevel,name:values.WorkoutName,points:values.Points,type:values.type
            })
            setOpen(false)
          }
          
        },
        validate:values=>{
          let errors={}
          if(values.WorkoutName=="N"||values.WorkoutName=="")
          {
              errors.WorkoutName="WorkoutName is Required"
          }
          if(values.DifficultyLevel=="N"||values.DifficultyLevel=="")
          {
              errors.DifficultyLevel="DifficultyLevel is Required"  
          }
          if(values.points=="N"||values.points=="")
          {
              errors.Points="points are Required"  
          }
          if(values.type=="N"||values.type=="")
          {
              errors.Points="type is Required"  
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
      <Button variant="outlined"  className="ms-5" onClick={handleClickOpen}>
      <UpdateIcon></UpdateIcon> 
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.dialog}
      >
        <BootstrapDialogTitle id="customized-dialog-title" className="pt-3"  style={{height:"80px"}} onClose={handleClose}>
          <h3 className='text-center pt-2'>Update Workout</h3>
        </BootstrapDialogTitle>
        <DialogContent dividers>
                      <form onSubmit={formik.handleSubmit}>
                      <h4 className="mt-2">Information of Community</h4>
                      <div class="form-group mt-2">
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" name="WorkoutName" id="WorkoutName" placeholder="Workout Name" value={formik.values.WorkoutName=="N"?props.data.name:formik.values.WorkoutName} onChange={formik.handleChange} />
                              <label for="WorkoutName">Workout Name</label>
                              <span style={{color:"red"}}>{formik.touched.WorkoutName&&formik.errors.WorkoutName}</span>
                          </div>
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" id="Difficulty_level" name="DifficultyLevel" placeholder="Difficulty Level" value={formik.values.DifficultyLevel=="N"?props.data.diff:formik.values.DifficultyLevel} onChange={formik.handleChange} />
                              <label for="Difficulty_level">Difficultly Level</label>
                              <span style={{color:"red"}}>{formik.touched.DifficultyLevel&&formik.errors.DifficultyLevel}</span>
                          </div>
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" id="Points" name="Points" placeholder="Points" value={formik.values.Points=="N"?props.data.points:formik.values.Points} onChange={formik.handleChange} />
                              <label for="Points">Points</label>
                              <span style={{color:"red"}}>{formik.touched.Points&&formik.errors.Points}</span>
                          </div>
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" id="type" name="type" placeholder="type" value={formik.values.type=="N"?props.data.type:formik.values.type} onChange={formik.handleChange} />
                              <label for="type">Type</label>
                              <span style={{color:"red"}}>{formik.touched.type&&formik.errors.type}</span>
                          </div>
                              <input type="file" class="form-control" name="img" placeholder="Attach img" onChange={handel} />
                              <input type="submit" value="Submit" class="btn btn-success mt-2" style={{width:"500px"}} onClick={handleClose}></input>
                      </div>
                  </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}