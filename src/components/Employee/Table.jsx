import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function RecordTable(data) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>S.No</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Bike Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Duration</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Started Date</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.records.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.bikeId.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {`${row.bikeId.assemblyTime} minutes`}
              </TableCell>
              <TableCell>{moment(row.createdAt).format("LLL")}</TableCell>
              <TableCell>
                {/* {row.status} */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={row.status}
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem value="Inprogress">Inprogress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Incomplete">Incomplete</MenuItem>
                    <MenuItem value="Not started yet">Not started yet</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
