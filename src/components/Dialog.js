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

export default function CustomDialog({children}) {
  const [open, setOpen] = React.useState(false);
  const classes=useStyles()
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined"  className="ms-5" onClick={handleClickOpen}>
      <AddIcon></AddIcon> Add New
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.dialog}
      >
        <BootstrapDialogTitle id="customized-dialog-title" className="pt-3"  style={{height:"80px"}} onClose={handleClose}>
          <h3 className='text-center pt-2'>{children[0]}</h3>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {children.filter((itm)=>itm.type!='h3')}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

// import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from "@mui/material"
// import { useState } from "react"
// function CustomDialog()
// {
//     const [open,setOpen]=useState(false);
//     return<>
//     <Button onClick={()=>setOpen(true)}>Open Dialog</Button>
//         <Dialog open={open} onClose={()=>setOpen(false)} aria-labelledby='dialog-title'>
//             <DialogTitle aria-labelledby='dialog-title'>How are you</DialogTitle>
//             <DialogContent>
//                 <DialogContentText>
//                     How are you i am fine what are you doing i am doing nothing!
//                 </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClose={()=>{setOpen(false)}}>Submit</Button>
//                 <Button onClose={()=>{setOpen(false)}}>Cancel</Button>
//             </DialogActions>
//         </Dialog>
//     </>
// }
//export default CustomDialog

