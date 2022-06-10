import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import Personal from "../assets/personal.png"
import CommIcon from "../assets/community.png"
import ActIcon from "../assets/tracking.png"
import LogoutIcon from '@mui/icons-material/Logout';
import Home from "./Home";
import User from "./User";
import Trainer from "./Trainer";
import Community from "./Community";
import Activity from './Activity';
import { useState } from 'react';
import Login from './Login';
import {makeStyles} from "@material-ui/core/styles";
import { BrowserRouter as Router,Routes,Route,Link, useParams } from 'react-router-dom';
import { Train } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const drawerWidth = 240;

const useStyles=makeStyles((theme)=>({
    link:{
        textDecoration:'none',
        color:theme.palette.text.primary
    },

}))
export default function ClippedDrawer() {
    const classes=useStyles();
        return ( <div>
            <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Fitness Enthusiasts
                </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                <List>
                        <Link to='/home' className={classes.link}>
                            <ListItem key={"Home"} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <HomeIcon></HomeIcon>
                                    </ListItemIcon>
                                <ListItemText primary={"Home"}/>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to='trainer' className={classes.link}>
                            <ListItem key={"Trainer"} style={{marginTop:"-10px"}} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <img src={Personal} alt="NA" style={{height:"18px", width:"18px",marginInlineStart:'4px'}}></img>
                                    </ListItemIcon>
                                    <ListItemText primary={"Trainer"} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to='user' className={classes.link}>
                        <ListItem key={"Users"} style={{marginTop:"-10px"}} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PersonIcon></PersonIcon>
                                </ListItemIcon>
                                <ListItemText primary={"User"} />
                            </ListItemButton>
                        </ListItem>
                        </Link>
                        <Link to='community' className={classes.link}>
                        <ListItem key={"Community"} style={{marginTop:"-10px"}} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                <img src={CommIcon} alt="NA" style={{height:"18px", width:"18px",marginInlineStart:'4px'}}></img>
                                </ListItemIcon>
                                <ListItemText primary={"Community"} />
                            </ListItemButton>
                        </ListItem>
                        </Link>
                        <Link to='activity' className={classes.link}>
                        <ListItem key={"Activity"} style={{marginTop:"-10px"}} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                <img src={ActIcon} alt="NA" style={{height:"18px", width:"18px",marginInlineStart:'4px'}}></img>
                                </ListItemIcon>
                                <ListItemText primary={"Workout"} />
                            </ListItemButton>
                        </ListItem>
                        </Link>
                        <Link to="/" className={classes.link}>
                            <ListItem key={"Logout"}
                            style={{marginTop:"-10px"}} disablePadding>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <LogoutIcon style={{marginInlineStart:'4px'}}></LogoutIcon>
                                    </ListItemIcon>
                                    <ListItemText primary={"Logout"} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                </List>

                </Box>
            </Drawer>
            <Toolbar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <div style={{marginTop:'70px',marginInlineStart:'-40px'}}>
                        <Outlet></Outlet>
                        </div>
            </Box>
            </Box>
                </div>
        );
}
