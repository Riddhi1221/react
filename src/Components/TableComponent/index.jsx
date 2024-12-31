import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box } from '@mui/material';

const TableComponent = ({ TableHeader, TableData, renderRow }) => {
  return (
    <Box sx={{ width: "100%", overflowX: "auto", padding: 2 }}>
      <TableContainer component={Paper} sx={{ width: "100%", minWidth: 650 }}>
        <Table aria-label="responsive table">
          <TableHead>
            <TableRow sx={{ textAlign: "center", backgroundColor: "#f5f5f5" }}>
              {TableHeader.map((el) => (
                <TableCell
                  key={el}
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    whiteSpace: "nowrap", // Prevent text wrapping
                  }}
                >
                  {el}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {TableData.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  textAlign: "center",
                }}
              >
                {renderRow(row, index)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;

