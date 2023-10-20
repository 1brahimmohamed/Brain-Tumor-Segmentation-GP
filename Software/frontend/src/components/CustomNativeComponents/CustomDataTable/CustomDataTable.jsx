import * as React from 'react';

// MUI
import {
    Table,
    TableBody ,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    tableCellClasses
} from '@mui/material';

import { styled } from '@mui/material/styles';

// Icons
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';


// Custom Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.light,
        // color: theme.palette.common.white,
        border: "2px solid" + theme.palette.primary.dark,
        fontWeight: "bold",

    },

    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: "2px solid " + theme.palette.primary.dark,
    },

}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({

    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
        },
    },
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.primary.light,
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
        },
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// temp data
const createData = (id, name, modality, description, dateTime) =>{
    return { id, name, modality, description, dateTime};
}

const rows = [
    createData(1, "Report 1", "CT", "Description 1", "2021-10-10"),
    createData(2, "Report 2", "MR", "Description 2", "2021-10-10"),
    createData(3, "Report 3", "US", "Description 3", "2021-10-10"),
    createData(4, "Report 4", "PET", "Description 4", "2021-10-10"),
    createData(5, "Report 5", "XA", "Description 5", "2021-10-10"),
    createData(6, "Report 6", "CT", "Description 6", "2021-10-10"),
    createData(7, "Report 7", "MR", "Description 7", "2021-10-10"),
    createData(8, "Report 8", "US", "Description 8", "2021-10-10"),
    createData(9, "Report 9", "PET", "Description 9", "2021-10-10"),
    createData(10, "Report 10", "XA", "Description 10", "2021-10-10"),
    createData(11, "Report 11", "CT", "Description 11", "2021-10-10"),
    createData(12, "Report 12", "MR", "Description 12", "2021-10-10"),
    createData(13, "Report 13", "US", "Description 13", "2021-10-10"),
    createData(14, "Report 14", "PET", "Description 14", "2021-10-10"),
    createData(15, "Report 15", "XA", "Description 15", "2021-10-10"),
    createData(16, "Report 16", "CT", "Description 16", "2021-10-10"),
    createData(17, "Report 17", "MR", "Description 17", "2021-10-10"),
    createData(18, "Report 18", "US", "Description 18", "2021-10-10"),
];


// Table Head Columns
const tableHeadColumns = [
    "",
    "Report" ,
    "ID",
    "Name",
    "Modality",
    "Description",
    "Date Time",
];

const CustomizedTables = () => {
    return (
        <TableContainer component={Paper}>

            <Table sx={{ minWidth: 1100, boxShadow: "none" }} aria-label="customized table" size={"small"}>

                <TableHead>
                    <TableRow>
                        {
                            tableHeadColumns.map((column, index) => {
                                return (
                                    <StyledTableCell align="left" key={index}>{column}</StyledTableCell>
                                )
                            })
                        }
                    </TableRow>
                </TableHead>


                <TableBody>

                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>

                            <StyledTableCell component="th" scope="row">{/*<Checkbox />*/} </StyledTableCell>

                            <StyledTableCell component="th" scope="row">
                                <VisibilityIcon sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                    }
                                }}
                                />
                            </StyledTableCell>

                            <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                            <StyledTableCell component="th" align="left">{row.name}</StyledTableCell>
                            <StyledTableCell component="th" align="left">{row.modality}</StyledTableCell>
                            <StyledTableCell component="th" align="left">{row.description}</StyledTableCell>
                            <StyledTableCell component="th" align="left">{row.dateTime}</StyledTableCell>
                        </StyledTableRow>
                    ))}

                </TableBody>

            </Table>
        </TableContainer>
    );
}

export default CustomizedTables;
