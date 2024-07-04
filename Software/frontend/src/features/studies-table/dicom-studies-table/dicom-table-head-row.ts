import { IDicomTableColumnHead } from '@models/studies-table.ts';

const tableColumnHeadings: IDicomTableColumnHead[] = [
    {
        displayName: '',
        key: 'checkbox',
        searchable: false
    },
    {
        displayName: 'View',
        key: 'viewer',
        searchable: false
    },
    {
        displayName: 'Study ID',
        key: 'studyId',
        searchable: true
    },
    {
        displayName: 'Patient ID',
        key: 'patientId',
        searchable: true
    },
    {
        displayName: 'Patient Name',
        key: 'patientName',
        searchable: true
    },
    {
        displayName: 'Institution',
        key: 'institutionName',
        searchable: true
    },
    {
        displayName: 'Accession Number',
        key: 'accessionNumber',
        searchable: true
    },
    {
        displayName: 'Study Description',
        key: 'studyDescription',
        searchable: true
    },
    {
        displayName: 'Study Date',
        key: 'studyDate',
        searchable: true
    },
    {
        displayName: '',
        key: 'delete',
        searchable: false
    }
];

export default tableColumnHeadings;
