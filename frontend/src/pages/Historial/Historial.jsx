import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import './Historial.css';

export default function Historial() {

    const HeaderColum = [
        { id: 'cancion', label: 'Cancion', minWidth: 170 },
        { id: 'artista', label: 'Artista', minWidth: 100 },
        { id: 'album', label: 'Album', minWidth: 170 }
    ];

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            color: ' #FDFEFE ',
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const [state, setState] = React.useState({
        arreglo_historial: [], // historial de canciones  arreglo: {cancion, artista: album: }
        arreglo_top5_mas_reproducidas: [], // top 5 mas reproducidas, arreglo: {cancion:, artista:, album:}
        arreglo_top5_mas_albumes: [], // top 5 mas albumes, arreglo:{album:, artista: ,year:}
        arreglo_top_3: [], // top 3 mas artistas escuchado, arreglo: {artista:}
        arreglo_ejemplo: [{ cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' },
        { cancion: 'Aleluya', artista: 'Mexican Group', album: 'Somos Banda' }],
        arreglo_ejemplo2: [
            { year: '2000', artista: 'Mexican Group', album: 'Somos Banda' },
        { year: '2000', artista: 'Mexican Group', album: 'Somos Banda' },
        { year: '2000', artista: 'Mexican Group', album: 'Somos Banda' },
        { year:'2000', artista: 'Mexican Group', album: 'Somos Banda' },
        { year: '2000', artista: 'Mexican Group', album: 'Somos Banda' },
        { year: '2000', artista: 'Mexican Group', album: 'Somos Banda' },
        { year: '2000', artista: 'Mexican Group', album: 'Somos Banda' },
        { year: '2000', artista: 'Mexican Group', album: 'Somos Banda' },
        { year: '2000', artista: 'Mexican Group', album: 'Somos Banda' }
        ]
    });

      function createDataHist(cancion, artista, album) {      
        return { cancion, artista, album };
      }

    
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);
      
        const handleChangePage = (event, newPage) => {
          setPage(newPage);
        };
      
        const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(+event.target.value);
          setPage(0);
        };

    return (
        <><div>
            <h1>Historial</h1>
        </div><div className="container">
                <h2>Historial de reproducciones</h2>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table  stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {HeaderColum.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state.arreglo_historial
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {HeaderColum.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={state.arreglo_ejemplo.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            <br />
            <div className="container">
                <h2>Canciones más reproducidas</h2>
                <TableContainer>
                    <Table className="table table-hover table-dark" sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Cancion</StyledTableCell>
                                <StyledTableCell >Artista</StyledTableCell>
                                <StyledTableCell >Álbum</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.arreglo_top5_mas_reproducidas.map((row) => (
                                <StyledTableRow key={row.cancion}>
                                    <StyledTableCell>
                                        {row.cancion}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.artista}</StyledTableCell>
                                    <StyledTableCell>{row.album}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <br />
            <div className="container">
                <h2>Álbumes más escuchados</h2>
                <TableContainer>
                    <Table className="table table-hover table-dark" sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Álbum</StyledTableCell>
                                <StyledTableCell >Artista</StyledTableCell>
                                <StyledTableCell >Año</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.arreglo_top5_mas_albumes.map((row) => (
                                <StyledTableRow key={row.album}>
                                    <StyledTableCell>
                                        {row.album}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.artista}</StyledTableCell>
                                    <StyledTableCell>{row.year}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <br />
            <div className="container">
                <h2>Artistas más escuchados</h2>
                <TableContainer >
                    <Table className="table table-hover table-dark" sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >Artista</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.arreglo_top_3.map((row) => (
                                <StyledTableRow key={row.artista}>
                                    <StyledTableCell>{row.artista}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}