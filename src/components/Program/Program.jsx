import React, { useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Program.scss";
import { useDispatch, useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

const Program = (props) => {
  console.log(props);
  const program = {
    "Bubble Sort": [
      `for i = 0 to n`,
      `{`,
      `for j = 0 to n - i`,
      `{`,
      `if arr[j] > arr[j+1]`,
      `{`,
      `swap (arr[j],arr[j+1])`,
      `}`,
      `}`,
      `}`,
    ],
    "Selection Sort": [
      `for i = 0 to n`,
      `{`,
      `let min = i`,
      `for j = i+1 to n`,
      `{`,
      `if arr[j] < arr[min]`,
      `{`,
      `min = j`,
      `}`,
      `swap (arr[i],arr[min])`,
      `}`,
      `}`,
    ],
    "Insertion Sort": [
      `for i = 1 to n`,
      `{`,
      `for j = i-1 to 0`,
      `{`,
      `if arr[j+1] < arr[j]`,
      `{`,
      `swap (arr[j],arr[j+1])`,
      `}`,
      `else break`,
      `}`,
      `}`,
    ],
  };
  const lineRef = useRef(
    [...new Array(program[props.method].length)].map(() => React.createRef())
  );

  const pLine = useSelector((state) => state.programState);
  function updateCurrent(line) {
    for (let i = 0; i < lineRef.current.length; i++) {
      if (i === line) {
        lineRef.current[i].current.style.backgroundColor = "black";
        lineRef.current[i].current.style.color = "white";
      } else {
        lineRef.current[i].current.style.backgroundColor = "white";
        lineRef.current[i].current.style.color = "black";
      }
    }
  }

  useEffect(() => {
    updateCurrent(pLine);
  }, [pLine]);
  return (
    // <div className="program">
    //   <div className="table1">
    //     <TableContainer component={Paper}>
    //       <Table aria-label="customized table">
    //         <TableHead>
    //           <TableRow>
    //             <StyledTableCell
    //               style={{ backgroundColor: "#2a3447", color: "#ddd" }}
    //             >
    //               S.No.
    //             </StyledTableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {rows.map((row) => (
    //             <StyledTableRow key={Math.random()}>
    //               <StyledTableCell align="center">{row.name}</StyledTableCell>
    //             </StyledTableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   </div>
    //   <div className="table2">
    //     <TableContainer component={Paper}>
    //       <Table sx={{ minWidth: "10px" }} aria-label="customized table">
    //         <TableHead>
    //           <TableRow>
    //             <StyledTableCell
    //               align="center"
    //               style={{
    //                 fontSize: "20px",
    //                 fontWeight: "bold",
    //                 backgroundColor: "#2a3447",
    //                 color: "#ddd",
    //               }}
    //             >
    //               Program Tracer, Soure Code
    //             </StyledTableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {rows.map((row) => (
    //             <StyledTableRow key={parseInt(row.name)}>
    //               <StyledTableCell align="left">{row.name}</StyledTableCell>
    //             </StyledTableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   </div>
    // </div>
    <div style={{ width: "100%" }}>
      <h3 style={{ margin: "5px" }} className="logs-heading">
        Program Tracer
      </h3>

      <div className="program-tracer row">
        <table className="program1">
          <tbody>
            <tr>
              <td>S.No.</td>
              <td>Source Code</td>
            </tr>
          </tbody>
          {program[props.method].map((v, i) => {
            return (
              <>
                <tbody key={i}>
                  <tr ref={lineRef.current[i]}>
                    <td>{i}</td>
                    <td>{v}</td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Program;
