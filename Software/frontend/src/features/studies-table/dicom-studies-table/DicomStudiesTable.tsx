import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IDicomTableStudy, IDicomTableColumnHead, IStore } from '@/models';
import {
    StyledTableCell,
    StyledTableRow
} from '@features/studies-table/components/StyledTableComponents.tsx';
import StudiesTableHeaderSearchInput from '@features/studies-table/components/StudiesTableHeaderSearchInput.tsx';
import tableColumnHeadings from '@features/studies-table/dicom-studies-table/dicom-table-head-row.ts';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    useTheme,
    Checkbox,
    IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { DicomUtil } from '@/utilities';
import { useSelector, useDispatch } from 'react-redux';
import { TAppDispatch } from '@/redux/store.ts';
import { deleteDicomStudyThunk } from '@features/studies-table/dicom-studies-table/dicom-studies-actions.ts';

import { MdDeleteForever } from 'react-icons/md';

const StudiesDataTable = ({ data }: { data: IDicomTableStudy[] }) => {
    const theme = useTheme();
    const [searchValues, setSearchValues] = useState(Array(tableColumnHeadings.length).fill(''));
    const dispatch = useDispatch<TAppDispatch>();
    const { startDateFilter, endDateFilter, filterPeriod, selectedModalities } = useSelector(
        (store: IStore) => store.studies
    );

    const handleDelete = (studyOrthancId: string) => {
        dispatch(deleteDicomStudyThunk(studyOrthancId));
    };

    const filterRows = () => {
        let filteredData = data;

        // first filter by the upper controls (date range and modality)
        if (filterPeriod !== 'Any') {
            filteredData = data.filter((DicomStudy) => {
                const studyStrFormattedDate = DicomUtil.formatDate(DicomStudy.studyDate);
                const studyDate = new Date(studyStrFormattedDate!);
                const startDate = new Date(startDateFilter!);
                const endDate = new Date(endDateFilter!);

                return studyDate >= startDate && studyDate <= endDate;
            });
        }

        // uncomment this when the modality is sent from the backend
        if (selectedModalities.length > 0) {
            filteredData = filteredData.filter((DicomStudy) => {
                return selectedModalities.includes(DicomStudy.modality);
            });
        }

        // then filter by the search inputs
        return filteredData.filter((row: IDicomTableStudy) => {
            return tableColumnHeadings.every((column: IDicomTableColumnHead, index: number) => {
                const searchValue = searchValues[index].toLowerCase();
                const cellValue = String((row as any)[column.key]).toLowerCase();
                return cellValue.includes(searchValue);
            });
        });
    };

    const filteredRows = filterRows();

    const handleSearchChange = (index: number, value: string) => {
        const newSearchValues = [...searchValues];
        newSearchValues[index] = value;
        setSearchValues(newSearchValues);
    };

    return (
        <Box>
            <TableContainer component={Box} className={'overflow-auto'}>
                <Table
                    sx={{ minWidth: 1100, boxShadow: 'none' }}
                    aria-label="customized table"
                    size={'small'}
                >
                    <TableHead>
                        <TableRow>
                            {tableColumnHeadings.map((column, index) => {
                                return (
                                    <StyledTableCell align="left" key={index}>
                                        <Box className={'flex items-center'}>
                                            {column.searchable ? (
                                                <StudiesTableHeaderSearchInput
                                                    key={index}
                                                    displayName={column.displayName}
                                                    index={index}
                                                    onChange={handleSearchChange}
                                                    theme={theme}
                                                />
                                            ) : (
                                                column.displayName
                                            )}

                                            {column.searchable ? <SearchIcon /> : ''}
                                        </Box>
                                    </StyledTableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredRows.map((row, index) => {
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row" sx={{ width: '2%' }}>
                                        <Checkbox
                                            size={'medium'}
                                            sx={{
                                                padding: 0,
                                                color: theme.palette.neutral.main,
                                                '&.Mui-checked': {
                                                    color: theme.palette.secondary.light
                                                }
                                            }}
                                        />
                                    </StyledTableCell>

                                    <StyledTableCell component="th" scope="row" sx={{ width: '5%' }}>
                                        <Link
                                            target={'_blank'}
                                            to={`/viewer?StudyInstanceUID=${row.studyInstanceUid}`}
                                        >
                                            <VisibilityIcon
                                                sx={{
                                                    '&:hover': {
                                                        cursor: 'pointer'
                                                    }
                                                }}
                                            />
                                        </Link>
                                    </StyledTableCell>

                                    {/* <StyledTableCell component="th" scope="row" sx={{ width: '5%' }}>
                                        <Link target={'_blank'} to={`/report/${row.studyInstanceUid}`}>
                                            <VisibilityIcon
                                                sx={{
                                                    '&:hover': {
                                                        cursor: 'pointer'
                                                    }
                                                }}
                                            />
                                        </Link>
                                    </StyledTableCell> */}

                                    <StyledTableCell component="th" scope="row" sx={{ width: '10%' }}>
                                        {row.studyId}
                                    </StyledTableCell>

                                    <StyledTableCell component="th" scope="row" sx={{ width: '10%' }}>
                                        {row.patientId}
                                    </StyledTableCell>

                                    <StyledTableCell component="th" align="left" sx={{ width: '20%' }}>
                                        {row.patientName}
                                    </StyledTableCell>

                                    <StyledTableCell component="th" align="left" sx={{ width: '10%' }}>
                                        {row.institutionName}
                                    </StyledTableCell>

                                    <StyledTableCell component="th" align="left" sx={{ width: '10%' }}>
                                        {row.accessionNumber}
                                    </StyledTableCell>

                                    <StyledTableCell component="th" align="left" sx={{ width: '20%' }}>
                                        {row.studyDescription}
                                    </StyledTableCell>

                                    <StyledTableCell component="th" align="left" sx={{ width: '10%' }}>
                                        {DicomUtil.formatDate(row.studyDate)}
                                    </StyledTableCell>

                                    <StyledTableCell component="th" align="left" sx={{ width: '5%' }}>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => handleDelete(row.studyOrthancId)}
                                            sx={{
                                                color: theme.palette.error.main,
                                                '&:hover': {
                                                    color: theme.palette.error.dark
                                                }
                                            }}
                                        >
                                            <MdDeleteForever />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default StudiesDataTable;
