import { useState } from 'react';
import {
    StyledTableCell,
    StyledTableRow
} from '@features/studies-table/components/StyledTableComponents.tsx';
import StudiesTableHeaderSearchInput from '@features/studies-table/components/StudiesTableHeaderSearchInput.tsx';
import { Table, TableBody, TableContainer, TableHead, TableRow, useTheme, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const tableColumnHeadings = [
    {
        key: 'tag',
        displayName: 'Tag',
        searchable: true
    },
    {
        key: 'vr',
        displayName: 'VR',
        searchable: false
    },
    {
        key: 'label',
        displayName: 'Keyword',
        searchable: true
    },
    {
        key: 'value',
        displayName: 'Value',
        searchable: true
    }
];

const rows = [
    {
        label: 'Patient Name',
        tag: '00100010',
        vr: 'PN',
        value: ['John']
    },
    {
        label: 'Patient ID',
        tag: '00100020',
        vr: 'LO',
        value: ['123']
    },
    {
        label: 'Patient Birth Date',
        tag: '00100030',
        vr: 'DA',
        value: ['19900101']
    },
    {
        label: 'Patient Sex',
        tag: '00100040',
        vr: 'CS',
        value: ['M']
    },
    {
        label: 'Patient Name',
        tag: '00100010',
        vr: 'PN',
        value: ['John']
    },
    {
        label: 'Patient ID',
        tag: '00100020',
        vr: 'LO',
        value: ['123']
    },
    {
        label: 'Patient Birth Date',
        tag: '00100030',
        vr: 'DA',
        value: ['19900101']
    },
    {
        label: 'Patient Sex',
        tag: '00100040',
        vr: 'CS',
        value: ['M']
    },
    {
        label: 'Patient Name',
        tag: '00100010',
        vr: 'PN',
        value: ['John']
    },
    {
        label: 'Patient ID',
        tag: '00100020',
        vr: 'LO',
        value: ['123']
    },
    {
        label: 'Patient Birth Date',
        tag: '00100030',
        vr: 'DA',
        value: ['19900101']
    },
    {
        label: 'Patient Sex',
        tag: '00100040',
        vr: 'CS',
        value: ['M']
    },
    {
        label: 'Patient Name',
        tag: '00100010',
        vr: 'PN',
        value: ['John']
    },
    {
        label: 'Patient ID',
        tag: '00100020',
        vr: 'LO',
        value: ['123']
    },
    {
        label: 'Patient Birth Date',
        tag: '00100030',
        vr: 'DA',
        value: ['19900101']
    },
    {
        label: 'Patient Sex',
        tag: '00100040',
        vr: 'CS',
        value: ['M']
    }
];

const DicomTagTable = ({}) => {
    const [searchValues, setSearchValues] = useState(Array(tableColumnHeadings.length).fill(''));
    const theme = useTheme();

    const handleSearchChange = (index: number, value: string) => {
        const newSearchValues = [...searchValues];
        newSearchValues[index] = value;
        setSearchValues(newSearchValues);
    };

    const filterRows = () => {
        return rows.filter((row: any) => {
            return tableColumnHeadings.every((column: any, index: number) => {
                const searchValue = searchValues[index].toLowerCase();
                const cellValue = String((row as any)[column.key]).toLowerCase();
                return cellValue.includes(searchValue);
            });
        });
    };

    let filteredRows = filterRows();

    return (
        <Box className={'h-[50vh]'}>
            <TableContainer component={Box} className={'overflow-auto'}>
                <Table sx={{ minWidth: 500, boxShadow: 'none' }} aria-label="customized table" size={'small'}>
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
                        {filteredRows.map((row, index: number) => {
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row" sx={{ width: '20%' }}>
                                        {row.tag}
                                    </StyledTableCell>

                                    <StyledTableCell component="th" scope="row" sx={{ width: '10%' }}>
                                        {row.vr}
                                    </StyledTableCell>

                                    <StyledTableCell component="th" align="left" sx={{ width: '30%' }}>
                                        {row.label}
                                    </StyledTableCell>

                                    <StyledTableCell component="th" align="left" sx={{ width: '50%' }}>
                                        {row.value[0]}
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

export default DicomTagTable;
