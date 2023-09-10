import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Container,
} from '@mui/material';
import ApiService from '../../ApiService';
import Navbar from '../Navbar/Navbar';
import Chart from '../Chart/Chart';

function Dashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState({ from: '', to: '' });
  const [employeeProduction, setEmployeeProduction] = useState([]);


  const handleDateChange = async () => {
    try {
      const response = await ApiService.getAllProductionRecords(selectedDateRange);
      console.log(response.data);
      setEmployeeProduction(response.data);
      
    } catch (error) {
      // Handle error
      console.error('Failed to fetch employee production records:', error);
    }
  };

  useEffect(() => {
    handleDateChange();
  }, []);
  return (
    <>
    <Navbar/>
    <Container style={{marginTop: '20px'}}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            label="From"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={selectedDateRange.from}
            onChange={(e) =>
              setSelectedDateRange({ ...selectedDateRange, from: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="To"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={selectedDateRange.to}
            onChange={(e) =>
              setSelectedDateRange({ ...selectedDateRange, to: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDateChange}
          >
            Apply
          </Button>
        </Grid>
      </Grid>
      {/* Render charts and metrics based on productionData */}
    </Container>
   {/* <Chart data={employeeProduction}/>  */}
    </>
  );
}

export default Dashboard;
