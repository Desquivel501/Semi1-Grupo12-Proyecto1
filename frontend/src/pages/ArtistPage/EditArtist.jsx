import React, { useState, useEffect } from 'react';
import {
    useParams,
    useNavigate,
} from 'react-router-dom'
import { ColorExtractor } from 'react-color-extractor'

import { ButtonGroup, Typography, Box, Container, Grid, Button, Paper, CssBaseline, Divider, IconButton, Table, TableBody, TableHead, TableRow, TableContainer, TextField } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MopedIcon from '@mui/icons-material/Moped';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LockIcon from '@mui/icons-material/Lock';
import { SongCard } from '../../components/SongCard/SongCard';
import { Section } from '../Section/Section';

import song_list from '../../assets/song_list';
import album_list from '../../assets/album_list';
import artist_list from '../../assets/artist_list';

import { getData, patchData, sendFormData, deleteData } from '../../api/api';
import Swal from 'sweetalert2';

const theme = createTheme({
    typography: {
        first: {
            fontSize: '5rem',
            color: '#973f1c',
            fontFamily: 'monospace',
            fontWeight: 700,
        },
        second: {
            fontSize: '5rem',
            color: '#c36038',
            fontFamily: 'monospace',
            fontWeight: 700,
        },
        text: {
            fontSize: '2rem',
            color: '#000',
            fontFamily: 'monospace',
            fontWeight: 700,
        },
        details: {
            color: '#fff',
            fontFamily: 'monospace',
            fontWeight: 700,
            fontSize: "2.5rem",
        },
        details_text: {
            fontSize: '1.5rem',
            color: '#fff',
            fontFamily: 'monospace',
            fontWeight: 700,
        },
    },
});

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#fff',
    },
    '& label': {
        color: '#fff',
    },

    '& .MuiInput-underline:after': {
      borderBottomColor: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fff',
      },
      '&:hover fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#fff',
      },
    },
  });

export default function EditArtist(props) {
    const {
        edit = false
    } = props;

    const { id } = useParams();
    const navigate = useNavigate();

    const [color, setColor] = useState('#626262');
    const [count, setCount] = useState(0);
    const [artist, setArtist] = useState({
        id: 0,
        name: '',
        cover:
            'https://soundstream-semi1-g12.s3.us-east-2.amazonaws.com/no_album.jpg',
    });
    const [preview, setPreview] = useState('https://soundstream-semi1-g12.s3.us-east-2.amazonaws.com/no_album.jpg',);


    useEffect(() => {
        if(edit){
            let endpoint = `/api/artists/${id}`;
            getData({endpoint})
            .then(data => {
                if(data != null || data != undefined){
                    setArtist(data)
                    setPreview(data.cover)
                } else {
                    navigate(-1)
                }
            })
            .catch(err => console.log(err))

            setCount(count + 1);
        }
    },[]);

    const handleSubmit  = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        edit ? data.append('id', artist.id) : null;

        if(artist.cover === ''){
            Swal.fire({
                color: '#fff',
                background: '#1f1f1f',
                icon: 'error',
                title: 'Oops...',
                text: "No se ha seleccionado una imagen.",
                showConfirmButton: true,
            })
            return
        }

        if(data.get('avatar').size == 0){
            data.set('avatar', '')
        }

        console.log(data)

        if(edit){
            let endpoint = `/api/artists`;
            patchData({endpoint, data})
            .then(data => {

                if(data.TYPE === 'SUCCESS'){
                    Swal.fire({
                        color: '#fff',
                        background: '#1f1f1f',
                        icon: 'success',
                        title: 'Artista actualizado exitosamente',
                        showConfirmButton: false,
                    }).then(() => navigate(-1))
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.MESSAGE,
                      })
                }
            })
            .catch(err => console.log(err))

        } else {
            if(data.get('avatar') === ''){
                Swal.fire({
                    color: '#fff',
                    background: '#1f1f1f',
                    icon: 'error',
                    title: 'Oops...',
                    text: "No se ha seleccionado una imagen.",
                    showConfirmButton: true,
                })
                return
            }

            let endpoint = '/api/artists/newArtist';
            sendFormData({endpoint, data})
            .then(data => {
                console.log(data)
                if(data.TYPE === 'SUCCESS'){
                    Swal.fire({
                        color: '#fff',
                        background: '#1f1f1f',
                        icon: 'success',
                        title: 'Artista creado exitosamente',
                        showConfirmButton: false,
                    }).then(() => navigate(-1))
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.MESSAGE,
                      })
                }
            })
            .catch(err => console.log(err))
        }
    };

    const onDelete = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9d0000',
            cancelButtonColor: '#717171',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            }).then((result) => {
            if (result.isConfirmed) {
                let endpoint = `/api/artists/${id}`;
                deleteData({endpoint})
                .then(data => {
                    if(data.TYPE === 'SUCCESS'){
                        Swal.fire({
                            color: '#fff',
                            background: '#1f1f1f',
                            icon: 'success',
                            title: 'Artista eliminado exitosamente',
                            showConfirmButton: false,
                        }).then(() => navigate(-2))
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: data.MESSAGE,
                          })
                    }
                })
                .catch(err => console.log(err))
            }
        })
    }



    function selectColor(str) {

        if(str === undefined || str === null || str === ''){
            setColor('#626262') 
            return;
        };

        var whiteLimit = 200, 
            r,g,b;

        r = parseInt("0x"+str.substring(1,3));
        g = parseInt("0x"+str.substring(3,5));
        b = parseInt("0x"+str.substring(5,7));
        if(r < whiteLimit || b < whiteLimit || g < whiteLimit) {
            setColor(str) 
            return;
        } 
        setColor('#626262') 
    }

    

    return (
      <>
         <Box
            component="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            width="100%"
            sx={{
                flexGrow: 1,
                border:0,
                borderColor: 'primary.main',
                overflow: 'auto',
                p: 3,
                m:-2,
                backgroundColor: color,
                borderRadius: 5,
            }}
            
        >
            <CssBaseline />
            <ThemeProvider theme={theme}>
            
            <Grid
                container
                spacing={3}
                sx={{ width: "100%"}}
                alignItems="top"
                justifyContent="left"
            > 
                <Grid item xs={12} md={12} lg={12} align='left' sx={{pb:2}} >

                    <IconButton aria-label="delete" 
                        sx={{
                            color:'#fff', 
                            backgroundColor: "#1f1f1f",
                            border:0,
                            "&:hover": {
                                backgroundColor: "#353535",
                                borderColor: '#1f1f1f',
                            },
                        }} 
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBackIcon />
                    </IconButton> 
                </Grid>

                <Grid
                    container
                    spacing={3}
                    sx={{ width: "100%", overflow: 'auto', ml:3, pt:3, border:0, display: 'flex', flexDirection: 'row'}}
                    justify="flex-start"
                    alignItems="top"
                > 
                    <Box
                        display="flex"
                        flexDirection="column"
                        sx={{
                            ml:2,
                            mr:2,
                            mb:2,
                            height: "auto",
                        }}
                    >
                        <Box
                            component="img"
                            sx={{
                                height: "auto",
                                maxWidth: "300px",
                                
                                boxShadow: '5px 5px 10px #000000', 
                            }}
                            alt="Logo"
                            src={artist.cover}
                        />

                        <Button id='1'
                             data-mdb-toggle="modal" data-mdb-target="#changePirctureModal"
                            align='left'
                            sx={{backgroundColor:'#1f1f1f', color:'#fff', borderRadius: "20px", fontSize: '0.9rem', fontWeight: 700, mt:2, px:2, width: '300px',
                            "&:hover": {
                                backgroundColor: "#353535",
                        },}} >Cambiar Fotografia</Button>

                    </Box>

                    <ColorExtractor
                        src={artist.cover}
                        getColors={colors => {
                            console.log(colors)
                            selectColor(colors[0])
                        }}
                    />
                
                    <Grid
                        item
                        xs={ window.innerWidth < 1500 ? 7 : 8.5}
                        sx={{ border: 0 }}
                        textAlign='center'
                            
                        >
                            <Typography
                                variant="h5"
                                component="h5"
                                align="left"
                                sx={{
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    color: "#fff",
                                }}
                                >
                                Artista
                            </Typography>

                            <CssTextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                name="name"
                                value={artist.name}
                                onChange={(e) => setArtist({...artist, name: e.target.value})}
                                 sx={{ 
                                    input: { 
                                        color: '#fff',
                                        fontFamily: "monospace",
                                        fontWeight: 700,
                                        fontSize: "2.5rem",
                                    }, 
                                    borderColor: '#fff' }}
                            />

                            <Typography
                                variant="h5"
                                component="h5"
                                align="left"
                                sx={{
                                    mt:3,
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    color: "#fff",
                                }}
                                >
                                Fecha de Nacimiento
                            </Typography>

                            <CssTextField
                                type="date"
                                margin="normal"
                                required
                                fullWidth
                                id="birthDate"
                                name="birthDate"
                                format="DD/MM/YYYY"
                                sx={{ input: { color: '#fff' }, borderColor: '#fff' }}
                            />
                    </Grid>

                </Grid>

                <Grid
                    container
                    spacing={3}
                    sx={{ width: "100%", ml:2,}}
                    alignItems="top"
                    justifyContent="right"
                >
                    <Button 
                        id='1'
                        align='right'
                        onClick={() => edit ? onDelete() : navigate(-1)}
                        sx={{backgroundColor:'#9d0000', color:'#fff', borderRadius: "20px", fontSize: '0.9rem', fontWeight: 700, mt:4, px:2, mx:1,
                            "&:hover": {
                                backgroundColor: "#b03232",
                            },
                        }} 
                    >
                        {edit ? "Eliminar" : "Cancelar"}
                    </Button>
                    
                    <Button 
                        id='1'
                        align='right'
                        type='submit'
                        sx={{backgroundColor:'#1f1f1f', color:'#fff', borderRadius: "20px", fontSize: '0.9rem', fontWeight: 700, mt:4, px:2, mx:1,
                            "&:hover": {
                                backgroundColor: "#353535",
                            },
                        }} 
                    >
                        {edit ? "Guardar Cambios" : "Crear Artista"}
                    </Button>
                    
                </Grid>

            </Grid>

            <div className="modal fade" id="changePirctureModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{background:"#1f1f1f"}}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cambiar Fotografia</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'center'}}>
                            <img src={preview}
                                alt="Avatar" className="img-fluid my-5" style={{ width: '200px' }} />
                             <input type="file" name="avatar" onChange= {(e) => setPreview(URL.createObjectURL(e.target.files[0]))} />
                        </div>

                        <div className="modal-body">
                           
                        </div>
                        
                        <div className="modal-footer">

                            <Button className="button my-3" data-mdb-dismiss="modal"
                                onClick={() => setPreview(artist.cover)}
                                sx={{
                                    mr: 3,
                                    background:"#9d0000",
                                    color: '#fff',
                                    "&:hover": {
                                        background: '#b03232'
                                    }
                                }}
                            >
                                Cancelar
                            </Button>
                            
                            <Button className="button my-3" onClick={() => {setArtist({...artist, cover: preview});}} data-mdb-dismiss="modal"
                                sx={{
                                    background:"#717171",
                                    color: '#fff',
                                    "&:hover": {
                                        background: '#9a9a9a'
                                    }
                                }}
                            >
                                Actualizar
                            </Button>


                        </div> 
                    </div>
                </div>
            </div>

               

            </ThemeProvider>

        </Box>
      </>
    );
}
  
