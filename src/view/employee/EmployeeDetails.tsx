import { Box, Button,  Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Fragment } from 'react';

const Analytics = () => {

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  return (
    <Fragment>
      <Box p={2}>
        <Grid container display='flex' justifyContent='space-between'>
          <Grid>
            <Typography style={{ padding: '10px', textAlign: 'center', fontSize: '16px', fontWeight: '600' }}>
              Employee List
            </Typography>
          </Grid>
          <Grid p={1}>
            <Button variant="contained">
              Add Employee
            </Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ padding: "10px" }}>Dessert (100g serving)</TableCell>
                <TableCell>Calories</TableCell>
                <TableCell>Fat&nbsp;(g)</TableCell>
                <TableCell>Carbs&nbsp;(g)</TableCell>
                <TableCell>Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}                >
                  <TableCell style={{ padding: "10px" }}>{row.name}</TableCell>
                  <TableCell>{row.calories}</TableCell>
                  <TableCell>{row.fat}</TableCell>
                  <TableCell>{row.carbs}</TableCell>
                  <TableCell>{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Fragment >
  );
};

export default Analytics;
