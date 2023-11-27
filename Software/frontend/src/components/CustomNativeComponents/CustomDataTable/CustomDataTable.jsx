import {useState} from 'react';

// MUI
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    tableCellClasses,
    Input,

} from '@mui/material';


import {styled, useTheme} from '@mui/material/styles';

// Icons
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';

import {Link} from "react-router-dom";


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
}));

import {tokens} from "../../../assets/theme/theme.js";


// data creator
const createData = (studyId, patientId, patientName, institution, studyDescription, studyDate, studyInstanceUID) =>{
    return {
        id: studyId,
        patientId,
        patientName,
        institution,
        studyDescription,
        studyDate,
        studyInstanceUID
    };
}

const formatDate = (inputDate) => {
    const year = inputDate.slice(0, 4);
    const month = inputDate.slice(4, 6);
    const day = inputDate.slice(6, 8);

    // Format the date as "YYYY-MM-DD"
    return `${year}-${month}-${day}`;
}


// Table Head Columns
const tableHeadColumns = [
    {
        displayName: "",
        key: "checkbox",
        searchable: false,
    },
    {
        displayName: "report",
        key: "report",
        searchable: false,
    },
    {
        displayName: "Study ID",
        key: "id",
        searchable: true,
    },
    {
        displayName: "Patient ID",
        key: "patientId",
        searchable: true,
    },
    {
        displayName: "Patient Name",
        key: "patientName",
        searchable: true,
    },
    {
        displayName: "Institution",
        key: "institution",
        searchable: true,
    },
    {
        displayName: "Study Description",
        key: "studyDescription",
        searchable: true,
    },
    {
        displayName: "Study Date",
        key: "studyDate",
        searchable: true,
    }
];

const CustomizedTables = ({data}) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [searchValues, setSearchValues] = useState(Array(tableHeadColumns.length).fill(''));

    let rows = [];

    data.forEach((study) => {

        let dataRow = createData(
            study.MainDicomTags.StudyID,
            study.PatientMainDicomTags.PatientID,
            study.PatientMainDicomTags.PatientName,
            study.MainDicomTags.InstitutionName,
            study.MainDicomTags.StudyDescription,
            formatDate(study.MainDicomTags.StudyDate),
            study.MainDicomTags.StudyInstanceUID
        );

        rows.push(dataRow);
    });

    const filterRows = () => {
        return rows.filter((row) => {
            return tableHeadColumns.every((column, index) => {
                const searchValue = searchValues[index].toLowerCase();
                const cellValue = String(row[column.key]).toLowerCase();
                return cellValue.includes(searchValue);
            });
        });
    };

    const filteredRows = filterRows();

    const handleSearchChange = (index, value) => {
        const newSearchValues = [...searchValues];
        newSearchValues[index] = value;
        setSearchValues(newSearchValues);
    };


    return (
        <TableContainer component={Box} className={"max-h-[80vh] min-h-[80vh] overflow-auto"}>

            <Table sx={{ minWidth: 1100, boxShadow: "none" }} aria-label="customized table" size={"small"}>

                <TableHead>
                    <TableRow>
                        {
                            tableHeadColumns.map((column, index) => {
                                return (
                                    <StyledTableCell align="left" key={index}>
                                       <Box className={"flex items-center"}>
                                           {
                                               column.searchable? (
                                                   <Input
                                                       id="outlined-basic"
                                                       placeholder={column.displayName}
                                                       sx={{
                                                           width: "100%",
                                                           '&:before': {
                                                               borderBottom: 'none',
                                                           },

                                                           '&:hover::before, &:after': {
                                                               borderBottomColor: `${colors.blue[500]} !important`,
                                                           },
                                                       }}
                                                       onChange={(e) => handleSearchChange(index, e.target.value)}
                                                   />
                                               ) : (column.displayName)
                                           }

                                           {column.searchable?  <SearchIcon/>: ""}
                                        </Box>
                                    </StyledTableCell>
                                )
                            })
                        }
                    </TableRow>
                </TableHead>


                <TableBody >

                    {
                        filteredRows.map((row) => {
                            return (
                                <StyledTableRow key={row.id}>

                                    <StyledTableCell component="th" scope="row" sx={{ width: '2%' }}> {/*<Checkbox />*/} </StyledTableCell>

                                    <StyledTableCell component="th" scope="row" sx={{ width: '5%' }}>
                                        <Link to={`/viewer?study=${row.studyInstanceUID}`}>
                                            <VisibilityIcon sx={{
                                                "&:hover": {
                                                    cursor: "pointer",
                                                }
                                            }}/>
                                        </Link>
                                    </StyledTableCell>

                                    <StyledTableCell component="th" scope="row"  sx={{ width: '10%' }} >{row.id}</StyledTableCell>
                                    <StyledTableCell component="th" scope="row"  sx={{ width: '10%' }} >{row.patientId}</StyledTableCell>
                                    <StyledTableCell component="th" align="left" sx={{ width: '20%' }} >{row.patientName}</StyledTableCell>
                                    <StyledTableCell component="th" align="left" sx={{ width: '10%' }} >{row.institution}</StyledTableCell>
                                    <StyledTableCell component="th" align="left" sx={{ width: '20%' }} >{row.studyDescription}</StyledTableCell>
                                    <StyledTableCell component="th" align="left" sx={{ width: '10%' }} >{row.studyDate}</StyledTableCell>
                                </StyledTableRow>
                            )
                        })
                    }

                </TableBody>

            </Table>
        </TableContainer>
    );
}

export default CustomizedTables;
