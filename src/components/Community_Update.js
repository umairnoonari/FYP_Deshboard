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
import {  onValue,ref,remove,set,update } from 'firebase/database';
import * as store from 'firebase/storage';
import { useState,useEffect } from 'react';
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

export default function CustomDialog(props) {
  const [open, setOpen] = React.useState(false);
  const classes=useStyles()
  const [formikdata,setformikData]=useState()
  const [file,setFile]=useState()
  const [url,setUrl]=useState()
  const [trainerData,setTrainerData]=useState([])
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
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  var data={}
  const AgeLimit=props.data["info"]!=undefined?props.data["info"].ageLimit:"NA"
  const description1=props.data["info"]!=undefined?props.data["info"].description1:"NA";
  const description2=props.data["info"]!=undefined?props.data["info"].description2:"NA"
  const price=props.data["info"]!=undefined?props.data["info"].price:"NA"
  const type=props.data["info"]!=undefined?props.data["info"].type:"NA";
  const formik=useFormik({
    initialValues:{catName:props.data.catName,catBgImage:0,catImage:0,ageLimit:AgeLimit,description1:description1,description2:description2,price:price,type:type,trainer:""},
    onSubmit:async values=>{
      console.log(file)
        const imageRef=store.ref(storage,`images/${file.name}`);
        await store.uploadBytes(imageRef,file).then(async()=>{
             await store.getDownloadURL(imageRef).then((url)=>{
                console.log(url)
                data={ageLimit:values.ageLimit,description1:values.description1,description2:values.description2,image:url,price:values.price,type:values.type,trainer:values.trainer}
            }).catch((error)=>{
                console.log(error.message,"Error getting the url image")
            })
            setFile(null)
        }).catch((error)=>{
            console.log(error.message,)
        })
        if(values.catName!=null&&Object.keys(data).length!=null)
        {
          update(ref(db,`/Communities/${props.data.itm}`),{
            catName:values.catName,catImage:values.catImage,catBgImage:values.catBgImage,info:data
          })
          setOpen(false);
        }
      }
  })
  const handel=(e)=>{
      const file=e.target.files
      setFile(file[0])
  }
  return (
    <div>
      <Button variant="outlined"  className="ms-5" onClick={handleClickOpen}>
      <UpdateIcon />
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.dialog}
      >
        <BootstrapDialogTitle id="customized-dialog-title" className="pt-3"  style={{height:"80px"}} onClose={handleClose}>
          <h3 className='text-center pt-2'>Update Community</h3>
        </BootstrapDialogTitle>
        <DialogContent dividers>
                      <form onSubmit={formik.handleSubmit}>
                      <h4 className="mt-2">Information of Community</h4>
                      <div class="form-group mt-2">
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" name="catName" id="CatName" placeholder="Category Name" value={formik.values.catName} onChange={formik.handleChange} />
                              <label for="CatName">Category Name</label>
                          </div>
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" id="AgeLimit" name="ageLimit" placeholder="Age Limit"  value={formik.values.ageLimit} onChange={formik.handleChange} />
                              <label for="AgeLimit">Age Limit</label>
                          </div>
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" id="Description1" name="description1" placeholder="Description 1" value={formik.values.description1} onChange={formik.handleChange} />
                              <label for="Description1">Description 1</label>
                          </div>
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" id="Description2"  placeholder="Description 2" name="description2"  value={formik.values.description2} onChange={formik.handleChange}/>
                              <label for="Description2">Description 2</label>
                          </div>
                          <div class="form-floating mb-2">
                              <input type="number" class="form-control" name="price" id="Price" placeholder="Price" value={formik.values.price}  onChange={formik.handleChange}/>
                              <label for="Price">Price</label>
                          </div>
                          <div class="form-floating mb-2">
                              <input type="text" class="form-control" id="type" name="type" placeholder="Type" value={formik.values.type}  onChange={formik.handleChange} />
                              <label for="type">Type</label>
                          </div>
                          <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name="trainer" onChange={formik.handleChange}>
                            <option selected>Select Trainer</option>
                            {trainerData.map((row)=>(
                              <option value={row.itm}>{row.fullName}</option>
                            ))}
                          </select>
                              <input type="file" class="form-control" name="img" placeholder="Attach img" onChange={handel} />
                              <input type="submit" value="Submit" class="btn btn-success mt-2" style={{width:"500px"}} onClick={handleClose}></input>
                      </div>
                  </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}