import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';

import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { useState, useEffect,useContext } from 'react'
import axios from "axios"
import AuthContext from './AuthContext';

export default function Navbar(props) {
  const { isLoggedIn, username, logout } = useContext(AuthContext);
  const {drawerWidth, content} = props
  const location = useLocation()
  const path = location.pathname

  const [open, setOpen] = React.useState(false);
  const handleLogout = () => {
    logout();
  };
  const changeOpenStatus = () => {
    setOpen(!open)
  }

  
  const myDrawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {isLoggedIn ? (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/" selected={"/" === path}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/imageupload" selected={"/imageupload" === path}>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Image Upload"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/create" selected={"/create" === path}>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Create"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/newreg" selected={"/newreg" === path}>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary={"New Registration"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Logout"} />
                </ListItemButton>
              </ListItem>
              <h2>Hi, {username}. Thanks for loggin in!</h2>
            </>
          ) : (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/cardview" selected={"/cardview" === path}>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Show Card"} />
                </ListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/login" selected={"/login" === path}>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Login"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/register" selected={"/register" === path}>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Register"} />
                </ListItemButton>
              </ListItem>
              
            </>
          )}
        </List>
      </Box>
    </div>
  );


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>

          <IconButton 
                color = "inheret"
                onClick={changeOpenStatus}
                sx={{mr:2,display:{sm:"none"}}}
                >
                <MenuIcon/>
          </IconButton>
       
          <Typography variant="h6" noWrap component="div">
            Our application
          </Typography>
        </Toolbar>
      </AppBar>

   
        <Drawer
            variant="permanent"
            sx={{
            display: {xs:"none", sm:"block"},
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
            >

            {myDrawer}

        </Drawer>

        <Drawer
            variant="temporary"
            open = {open}
            onClose = {changeOpenStatus}
            sx={{
            display: {xs:"block", sm:"none"},
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
            >

            {myDrawer}

        </Drawer>

       

     

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

            {content}
    
      </Box>
    </Box>
  );
}