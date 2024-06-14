import { INiftiTableColumnHead } from '@models/studies-table.ts';

const tableColumnHeadings: INiftiTableColumnHead[] = [
    {
        displayName: '',
        key: 'checkbox',
        searchable: false
    },
    {
        displayName: 'File Name',
        key: 'fileName',
        searchable: true
    },
    {
        displayName: 'Category',
        key: 'category',
        searchable: true
    },
    {
        displayName: 'Project Sub',
        key: 'projectSub',
        searchable: true
    },
    {
        displayName: 'Sequence',
        key: 'sequence',
        searchable: true
    }
];

export default tableColumnHeadings;
