import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface HeaderType {
  key: string,
  text: string,
  align?: 'center' | 'left' | 'right' | 'inherit' | 'justify' | undefined

}

export default function WiTable() {
  const headerData: HeaderType[] = [
    {
      key: 'name',
      text: 'Name',
      align: 'left'
    },
    {
      key: 'weight',
      text: 'Weight',
      align: 'right'
    },
    {
      key: 'weightLossAmout',
      text: 'Weight Loss (kg)',
      align: 'right'
    },
    {
      key: 'weightLossPercentage',
      text: 'Weight Loss (%)',
      align: 'right'
    }
  ];

  const bodyData = [
    {
      name: 'Catia',
      weight: 67.9,
      weightLossAmout: 1.4,
      weightLossPercentage: 2.0
    }
  ];

  const tableHeader = createTableHeader(headerData);

  const tableBody = (
    <TableBody>
      <TableRow>
        <TableCell align="right">Catia</TableCell>
        <TableCell align="right">67.9</TableCell>
        <TableCell align="right">1.4</TableCell>
        <TableCell align="right">2.0 %</TableCell>
      </TableRow>
    </TableBody>
  );
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 360 }} aria-label="weight insights table">
        { tableHeader }
        { tableBody }
      </Table>
    </TableContainer>
  );
}

function createTableHeader(tableHeaderData: HeaderType[]) {
  return (<TableHead>
    { tableHeaderData.map((item) => {
      return (<TableCell key={item.key} align={item?.align}>{ item.text }</TableCell>);
    }) }
  </TableHead>);
}

function createTableBody(tableBodyData: BodyType[]) {}

function createTableRow(tableRowData: Object) {
  return (<TableRow></TableRow>);
}
