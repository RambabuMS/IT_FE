import React, { useEffect, useState } from "react";
import {
  Typography,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import ApiService from "../../ApiService";
import Navbar from "../Navbar/Navbar";
import RecordTable from "./Table";
import toast, { Toaster } from "react-hot-toast";

function Employee() {
  const [selectedBike, setSelectedBike] = useState("");
  const [bikelist, setBikelist] = useState([]);
  const [records, setRecords] = useState({});
  const [hideInput, setHideInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    getBikes();
    handleBikeSelection("get");
    // eslint-disable-next-line
  }, []);

  const getBikes = async () => {
    try {
      const bikes = await ApiService.getBike();
      setBikelist(bikes.bikes);
    } catch (error) {
      console.error("Bike selection failed:", error);
    }
  };

  const handleBikeSelection = async (str) => {
    setLoading(true);
    try {
      const data = await ApiService.selectBike(userId, selectedBike, str);
      console.log(data);
      if (data.message === "Already another bike is Inprogress") {
        toast.error(data.message);
      }
      setRecords(data);
      setHideInput(true);
      setLoading(false);
      setSelectedBike("");
    } catch (error) {
      // Handle error
      console.error("Bike selection failed:", error);
    }
  };
  const handleChange = (event) => {
    setSelectedBike(event.target.value);
  };

  return (
    <>
      <Toaster />
      <Navbar />
      {hideInput && (
        <>
          <Typography variant="h6" style={{ margin: "20px", padding: "5px" }}>
            Select a Bike to Assemble
          </Typography>
          <FormControl
            sx={{ m: 1, width: "270px" }}
            style={{ margin: "10px", padding: "5px" }}
          >
            <InputLabel id="demo-simple-select-label">Bike</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedBike}
              label="bike"
              onChange={handleChange}
            >
              {bikelist.map((bike, i) => {
                return (
                  <MenuItem
                    key={i}
                    value={bike._id}
                  >{`${bike.name} - ${bike.assemblyTime} minutes `}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            style={{ margin: "25px" }}
            variant="contained"
            color="primary"
            onClick={() => handleBikeSelection("post")}
            disabled={!selectedBike}
          >
            Select
          </Button>
        </>
      )}
      {records.success === true && loading === false && hideInput && (
        <RecordTable records={records.data} />
      )}
    </>
  );
}

export default Employee;
