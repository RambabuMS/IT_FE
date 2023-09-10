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

function Employee() {
  const [selectedBike, setSelectedBike] = useState('');
  const [bikelist, setBikelist] = useState('');
  const [age, setAge] = useState('');
//   const selectedBikeInfo = bikes.find((bike) => bike.id === parseInt(selectedBike));

useEffect(()=>{
    getBikes();
},[])

  const getBikes = async()=>{
    try {
        const bikes =  await ApiService.getBike();
        console.log(bikes,"bike");
        setBikelist(bikes)
          // Handle successful bike selection
        } catch (error) {
          // Handle error
          console.error('Bike selection failed:', error);
        }
  }

  const handleBikeSelection = async () => {
    try {
    //   await ApiService.selectBike(username, selectedBike);
      // Handle successful bike selection
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
      <Typography variant="h6">Select a Bike to Assemble</Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
  <InputLabel id="demo-simple-select-label">Bike</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selectedBike}
    label="bike"
    onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
  {/* {selectedBikeInfo && (
        <p>Expected Assembly Time: {selectedBikeInfo.assemblyTime} minutes</p>
      )} */}
</FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBikeSelection}
        disabled={!selectedBike}
      >
        Select
      </Button>
    </>
  );
}

export default Employee;
