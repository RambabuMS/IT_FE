import React, { useEffect, useState } from 'react';
import {
  Typography,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from '@mui/material';
import ApiService from '../../ApiService';
import Navbar from '../Navbar/Navbar';
import RecordTable from './Table';

function Employee() {
  const [selectedBike, setSelectedBike] = useState('');
  const [bikelist, setBikelist] = useState([]);
  const [records,setRecords] = useState([]);
  const [hideInput,setHideInput] = useState(false);
  const userId = sessionStorage.getItem('userId');

useEffect(()=>{
    getBikes();
    handleBikeSelection("get")
},[])

  const getBikes = async()=>{
    try {
        const bikes =  await ApiService.getBike();
        setBikelist(bikes.bikes)
        } catch (error) {
          console.error('Bike selection failed:', error);
        }
  }

  const handleBikeSelection = async (str) => {
    try {
     const data = await ApiService.selectBike(userId, selectedBike,str);
     setRecords(data)
     setHideInput(true)
     
    } catch (error) {
      // Handle error
      console.error('Bike selection failed:', error);
    }
  };
  const handleChange = (event) => {
    setSelectedBike(event.target.value);
  };

  return (
    <>
     <Navbar/>
   { !hideInput &&
   <>
     <Typography variant="h6" style={{margin: "20px",padding: "5px"}}>Select a Bike to Assemble</Typography>
      <FormControl sx={{ m: 1, width:"270px" }} style={{margin: "10px",padding: "5px"}}>
  <InputLabel id="demo-simple-select-label">Bike</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selectedBike}
    label="bike"
    onChange={handleChange}
  >
    {bikelist.map((bike,i)=>{
      return(
        <MenuItem key={i} value={bike._id}>{`${bike.name} - ${bike.assemblyTime} minutes `}</MenuItem>
      )
    })}
  </Select>
</FormControl >
      <Button
      style={{margin: "25px"}}
        variant="contained"
        color="primary"
        onClick={()=>handleBikeSelection("post")}
        disabled={!selectedBike}
      >
        Select
      </Button>
      </>}
      {records.success === true &&<RecordTable records = {records.data}/>}

    </>
  );
}

export default Employee;
