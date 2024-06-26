import React, { useEffect, useState } from "react";
import "./TableDisplay.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.blue,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableDisplay({ searchQuery }) {
  const [apiData, setApiData] = useState([]);
  const [isError, setIsError] = useState("");

  const getApiData = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setApiData(res.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      {isError !== "" && <h2 className="error-head">{isError}</h2>}
      <TableContainer
        className="t-container"
        component={Paper}
        sx={{
          width: "80%",
          margin: "auto",
          marginTop: "4rem",
          marginBottom: "4rem",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          border: "5px solid rgb(255, 253, 253)",
        }}
      >
        <Table
          sx={{ minWidth: 700, backgroundColor: "rgb(255, 253, 253)" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow sx={{ color: "rgb(109, 106, 106)" }}>
              <StyledTableCell
                sx={{ fontSize: "1.5rem", color: "rgb(147, 135, 135)" }}
              >
                Id
              </StyledTableCell>
              <StyledTableCell
                sx={{ fontSize: "1.5rem", color: "rgb(147, 135, 135)" }}
              >
                Title
              </StyledTableCell>
              <StyledTableCell
                sx={{ fontSize: "1.5rem", color: "rgb(147, 135, 135)" }}
              >
                Price
              </StyledTableCell>
              <StyledTableCell
                sx={{ fontSize: "1.5rem", color: "rgb(147, 135, 135)" }}
              >
                Category
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData
              .filter((product) =>
                product.title.toLowerCase().includes(searchQuery)
              )
              .map((product) => {
                const { id, title, price, category } = product;
                return (
                  <StyledTableRow key={id} className="StyledTableRow">
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{ color: "rgb(147, 135, 135)" }}
                    >
                      {id}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{ color: "rgb(147, 135, 135)" }}
                    >
                      {title}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{ color: "rgb(15, 116, 25)" }}
                    >
                      {price}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{ color: "rgb(147, 135, 135)" }}
                    >
                      {category}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableDisplay;
