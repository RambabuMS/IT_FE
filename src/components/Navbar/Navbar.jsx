import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const role = sessionStorage.getItem('role'); 
    const navigate = useNavigate()
   const Logout = ()=>{
    sessionStorage.clear();
    navigate("/")
   }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {role === 'admin' ? "Dashboard" : "Employee "}
          </Typography>
          <Button color="inherit" onClick={Logout}>LogOut</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}