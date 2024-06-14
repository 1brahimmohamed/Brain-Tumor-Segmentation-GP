import { useState } from 'react';
import { Link } from 'react-router-dom';
import { INiftiTableStudy } from '@/models';
import {
    StyledTableCell,
    StyledTableRow
} from '@features/studies-table/components/StyledTableComponents.tsx';
import StudiesTableHeaderSearchInput from '@features/studies-table/components/StudiesTableHeaderSearchInput.tsx';
import tableColumnHeadings from '@features/studies-table/nifti-studies-table/nifti-table-head-row.ts';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    useTheme,
    Checkbox
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';

const StudiesDataTable = ({ data }: { data: INiftiTableStudy[] }) => {
    const theme = useTheme();
    const [searchValues, setSearchValues] = useState(Array(tableColumnHeadings.length).fill(''));

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
                        {data.map((row, index) => {
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
                                            to={`/viewer?StudyInstanceUID=${row.fileName}`}
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

                                    <StyledTableCell component="th" scope="row" sx={{ width: '10%' }}>
                                        {row.fileName}
                                    </StyledTableCell>

                                    <StyledTableCell component="th" scope="row" sx={{ width: '10%' }}>
                                        {row.category}
                                    </StyledTableCell>

                                    <StyledTableCell component="th" align="left" sx={{ width: '20%' }}>
                                        {row.projectSub}
                                    </StyledTableCell>

                                    <StyledTableCell component="th" align="left" sx={{ width: '10%' }}>
                                        {row.sequencey}
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
