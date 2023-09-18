// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Grid, Box, Typography } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import './Historial.css';
import { getData } from '../../api/api';

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

    const [state, setState] = useState({
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


    const [buttons, setButtons] = useState([ 
        {id: 1, name: 'Historial de reproducciones', active: true, color: '#626262', type: 'history'},
        {id: 2, name: 'Canciones más reproducidas', active: false, color: '#1f1f1f', type: 'songs'},
        {id: 3, name: 'Álbumes más escuchados', active: false, color: '#1f1f1f', type: 'albums'},
        {id: 4, name: 'Artistas más escuchados', active: false, color: '#1f1f1f', type: 'artist'},
    ]);

    const [count, setCount] = useState(0)
    const [active, setActive] = useState('history');

    const [historial, setHistorial] = useState([]);
    const [artistas, setArtistas] = useState([]);
    const [canciones, setCanciones] = useState([]);
    const [albumes, setAlbumes] = useState([]);

    useEffect(() => {
        let endpoint = `/api/users/${window.localStorage.getItem('id')}/history`;
        getData({endpoint})
        .then(data => {
            setHistorial(data);
        }).catch(error => {console.log(error)});

        endpoint = `/api/reports/${window.localStorage.getItem('id')}/artists`
        getData({endpoint})
        .then(data => {
            setArtistas(data);
        }).catch(error => {console.log(error)});

        endpoint = `/api/reports/${window.localStorage.getItem('id')}/songs`
        getData({endpoint})
        .then(data => {
            console.log(data)
            setCanciones(data);
        }
        ).catch(error => {console.log(error)});

        endpoint = `/api/reports/${window.localStorage.getItem('id')}/albums`
        getData({endpoint})
        .then(data => {
            setAlbumes(data);
        }
        ).catch(error => {console.log(error)});
        

    },[]);

    const date_options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit', 
        hour: '2-digit', 
        hour12: false, 
        minute:'2-digit', 
        second:'2-digit',
        timeZone: 'America/Guatemala'
    }


    const pressButtons = (id) => {
        for(var i = 0; i < buttons.length; i++){
            if(buttons[i].id == id){
                buttons[i].active = true;
                buttons[i].color = '#626262';
                setActive(buttons[i].type)
            } else {
                buttons[i].active = false;
                buttons[i].color = '#1f1f1f';
            }
        }
        setButtons(buttons)

        setCount(count+1)
    }

      function createDataHist(cancion, artista, album) {      
        return { cancion, artista, album };
      }

    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>

            {/* <div>
                <h1>Historial</h1>
            </div> */}

        <Box
            component="main"
            width="100%"
            sx={{
                flexGrow: 1,
                border:0,
                borderColor: 'primary.main',
                overflow: 'auto',
                p: 3,
                m:-2,
                backgroundColor: "#4b4b4b",
                borderRadius: 5,
                height: window.innerHeight - 130,
            }}
            
        >
        

            <Grid
                container
                spacing={3}
                sx={{ width: "100%", ml:3, mt:1, mb:3}}
                alignItems="top"
                justifyContent="center"
            > 

                {
                    buttons.map((item, i) => {
                        return (
                            <Button id='1' onClick={() => pressButtons(i+1)}
                                sx={{
                                    backgroundColor:buttons[i].color, color:'#fff', borderRadius: "20px", fontSize: '0.9rem', fontWeight: 700, mx:1, py:1, px:2,
                                    "&:hover": {
                                        backgroundColor: "#626262",
                                    },
                                }} 
                            >
                                {buttons[i].name}
                            </Button>
                        )

                    })
                }

                
            </Grid>

            

            



            {
                active == 'history' && (
                <div className="container">
                    <h2>Historial de reproducciones</h2>

                    <TableContainer>
                        <Table className="table table-hover table-dark" sx={{ minWidth: 700, mt:2 }} aria-label="customized table">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>Cancion</StyledTableCell>
                                    <StyledTableCell >Artista</StyledTableCell>
                                    <StyledTableCell >Álbum</StyledTableCell>
                                    <StyledTableCell >Fecha</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {historial.map((song, i) => (
                                    <StyledTableRow key={i}>
                                        <StyledTableCell>
                                            {song.cancion}
                                        </StyledTableCell>
                                        <StyledTableCell>{song.artista}</StyledTableCell>
                                        <StyledTableCell>{song.album === null || song.album === undefined ? "" : song.album}</StyledTableCell>
                                        <StyledTableCell>{new Date(song.date).toLocaleString(undefined, date_options)}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
                )
            }

            {
                active == 'songs' && (
                    <div className="container">
                    <h2>Canciones más reproducidas</h2>
                    <TableContainer>
                        <Table className="table table-hover table-dark" sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>#</StyledTableCell>
                                    <StyledTableCell>Cover</StyledTableCell>
                                    <StyledTableCell>Cancion</StyledTableCell>
                                    <StyledTableCell>Artista</StyledTableCell>
                                    <StyledTableCell>Reproduciones</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {canciones.map((song, i) => (
                                    <StyledTableRow key={i}>
                                        <StyledTableCell>{i+1}</StyledTableCell>
                                        <StyledTableCell>
                                            <img src={song.image} style={{width: 120, height: '100%'}}/>
                                        </StyledTableCell>
                                        <StyledTableCell>{song.name}</StyledTableCell>
                                        <StyledTableCell>{song.artist}</StyledTableCell>
                                        <StyledTableCell>{song.times_played}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                )
            }        

            {
                active == 'albums' && (
                    <div className="container">
                    <h2>Álbumes más escuchados</h2>
                    <TableContainer>
                        <Table className="table table-hover table-dark" sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>#</StyledTableCell>
                                    <StyledTableCell>Cover</StyledTableCell>
                                    <StyledTableCell>Álbum</StyledTableCell>
                                    <StyledTableCell>Artista</StyledTableCell>
                                    <StyledTableCell>Reproduciones</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {albumes.map((album, i) => (
                                    <StyledTableRow key={i}>
                                        <StyledTableCell>{i+1}</StyledTableCell>
                                        <StyledTableCell>
                                            <img src={album.image} style={{width: 120, height: '100%'}}/>    
                                        </StyledTableCell>
                                        <StyledTableCell>{album.name}</StyledTableCell>
                                        <StyledTableCell>{album.artist}</StyledTableCell>
                                        <StyledTableCell>{album.times_played}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                )
            }

            {
                active == 'artist' && (
                    <div className="container">
                    <h2>Artistas más escuchados</h2>
                    <TableContainer >
                        <Table className="table table-hover table-dark" sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>#</StyledTableCell>
                                    <StyledTableCell>Imagen</StyledTableCell>
                                    <StyledTableCell>Nombre</StyledTableCell>
                                    <StyledTableCell>Reproduciones</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {artistas.map((artist, i) => (
                                    <StyledTableRow key={i}>
                                        <StyledTableCell>{i+1}</StyledTableCell>
                                        <StyledTableCell>
                                            <img src={artist.image} style={{width: 120, height: '100%'}}/>
                                        </StyledTableCell>
                                        <StyledTableCell>{artist.name}</StyledTableCell>
                                        <StyledTableCell>{artist.times_listened}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                )
            }
         
        </Box>
        </>

    )
}