import React, { useEffect, useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import './table.scss';

interface TableData {
  xAxis: string;
  yAxis_1: number;
  yAxis_2: number;
}

interface TableProps {
  tableData: TableData[];
}

const RevenueTable: React.FC<TableProps> = ({ tableData }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      if (tableRef.current) {
        wrapperRef.current.scrollLeft = tableRef.current.offsetWidth;
      }
    }
  }, [tableData]);

  return (
    <TableContainer
      ref={wrapperRef}
      component={Paper}
      sx={{ maxWidth: 1600, margin: 'auto', mt: 4 }}
    >
      <Table ref={tableRef}>
        <TableHead>
          <TableRow>
            <TableCell align='center'>
              <b>年度月份</b>
            </TableCell>
            {tableData.map((row) => (
              <TableCell key={row.xAxis} align='center'>
                <b>{row.xAxis}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align='center'>
              <b>每月營收</b>
            </TableCell>
            {tableData.map((row) => (
              <TableCell key={row.xAxis} align='right' className='table-cell'>
                {row.yAxis_1.toLocaleString()}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align='center'>
              <b>單月營收年增率 (%)</b>
            </TableCell>
            {tableData.map((row) => (
              <TableCell
                key={row.xAxis}
                align='right'
                className={`table-cell ${
                  row.yAxis_2 < 0
                    ? 'table-cell-negative'
                    : 'table-cell-positive'
                }`}
              >
                {(row.yAxis_2 * 100).toFixed(2).toLocaleString()}%
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RevenueTable;
