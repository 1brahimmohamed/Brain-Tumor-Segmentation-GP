import React, { useState, useEffect, useRef } from 'react';

interface LayoutToolProps {
    row: number;
    col: number;
    onChange: (row: number, col: number) => void;
}

const styleTable: React.CSSProperties = {
    borderCollapse: 'collapse',
    width: '100px',
    height: '100px',
};

const styleTableTd: React.CSSProperties = {
    width: '25px',
    height: '25px',
    border: 'solid 1px black',
};

const LayoutTool: React.FC<LayoutToolProps> = (props) => {
    const [row, setRow] = useState(props.row);
    const [col, setCol] = useState(props.col);
    const tableRef = useRef<HTMLTableElement>(null);

    useEffect(() => {
        initTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // The empty array ensures this effect runs only once, similar to componentDidMount

    const initTable = () => {
        if (tableRef.current) {
            // Check if the table is defined
            const rows = tableRef.current.rows;

            for (let i = 0; i < rows.length; i++) {
                // Iterate over existing rows
                const cells = rows[i].cells;
                for (let j = 0; j < cells.length; j++) {
                    // Iterate over existing cells in each row
                    if (cells[j]) {
                        // Check if the cell exists
                        cells[j].style.backgroundColor = '#AAAAAA'; // Safely access the style
                    }
                }
            }
        }
    };

    const cellClick = (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
        let clickedRow = (e.currentTarget.parentNode as HTMLTableRowElement).rowIndex;
        let clickedCol = e.currentTarget.cellIndex;

        if (typeof clickedRow === 'number' && typeof clickedCol === 'number') {
            setRow(clickedRow);
            setCol(clickedCol);

            let rows = tableRef.current?.rows;
            if (!rows) return;

            for (let i = 0; i <= 3; i++) {
                for (let j = 0; j <= 3; j++) {
                    rows[i].cells[j].style.backgroundColor = '#444444';
                }
            }
            for (let i = 0; i <= clickedRow; i++) {
                for (let j = 0; j <= clickedCol; j++) {
                    rows[i].cells[j].style.backgroundColor = '#AAAAAA';
                }
            }
            props.onChange(clickedRow + 1, clickedCol + 1);
        }
    };

    const renderTable = () => {
        const rows = Array(4).fill(null);
        return rows.map((_, i) => (
            <tr key={i}>
                <td style={styleTableTd} onClick={cellClick} />
                <td style={styleTableTd} onClick={cellClick} />
                <td style={styleTableTd} onClick={cellClick} />
                <td style={styleTableTd} onClick={cellClick} />
            </tr>
        ));
    };

    return (
        <div>
            <table style={styleTable} ref={tableRef}>
                <tbody>{renderTable()}</tbody>
            </table>
        </div>
    );
};

export default LayoutTool;
