import { Typography } from "@mui/material";
import { useState } from "react";
// import {Button,Modal,Box} from "@material-ui/core"
import CustomDialog from "./Dialog";
// import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogAction} from "@mui/material"
function Home()
{
    const [open,setOpen]=useState(false)
    return<>
    <h1>Welcome to Fitness Enthusitias</h1>
    {/* <Button onClick={()=>setOpen(true)}>clickme</Button>
    <Modal open={open} onClose={()=>setOpen(false)}>
        <Box position="absolute" top="50%" left="50%" >
            <Typography><h1>it is modal</h1></Typography>
        </Box>
    </Modal> */}
    <CustomDialog/>
    {/* <Button>Open Dialog</Button>
        <Dialog>
            <DialogTitle>How are you</DialogTitle>
        </Dialog>
    <Dialog /> */}
    </>
}
export default Home;