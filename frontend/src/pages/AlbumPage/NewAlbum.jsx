import React, { useState, useEffect } from 'react';
import {
    Link,
    Routes,
    Route,
    useParams,
    useNavigate,
} from 'react-router-dom'
import { ColorExtractor } from 'react-color-extractor'

import { ButtonGroup, Typography, Box, Container, Grid, Button, Paper, CssBaseline, Divider, IconButton, TextField, InputLabel, FormControl, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import song_list from '../../assets/song_list';
import album_list from '../../assets/album_list';
import artist_list from '../../assets/artist_list';

import { getData, sendJsonData, sendFormData } from '../../api/api';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { sesionContext } from '../../context/SessionContext';

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

export default function NewAlbum(props) {

    const {
        playlist = false,
    } = props;

    const { user } = useContext(sesionContext);

    const [color, setColor] = useState('#626262');
    const [count, setCount] = useState(0);
    const [album, setAlbum] = useState({
        id: 0,
        name: '',
        cover:
            'https://soundstream-semi1-g12.s3.us-east-2.amazonaws.com/no_album.jpg',
        singer: '',
        description: '',
    });
    const [preview, setPreview] = useState(album.cover);
    const [artistList, setArtistList] = useState([]);
    const [singerId, setSingerId] = useState(0);

    useEffect(() => {
        let endpoint = '/api/artists';
        getData({endpoint})
        .then(data => {
            setArtistList(data)
        })
    },[]);


    const navigate = useNavigate();

    
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

    function changeColor(color, amount) {
        const clamp = (val) => Math.min(Math.max(val, 0), 0xFF)
        const fill = (str) => ('00' + str).slice(-2)
    
        const num = parseInt(color.substr(1), 16)
        const red = clamp((num >> 16) + amount)
        const green = clamp(((num >> 8) & 0x00FF) + amount)
        const blue = clamp((num & 0x0000FF) + amount)
        return '#' + fill(red.toString(16)) + fill(green.toString(16)) + fill(blue.toString(16))
    }


    const handleSubmit  = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if(playlist){
            data.append('email', user.id)
        } else {
            data.append('description', '')
            data.append('artist', artistList.find(artist => artist.name === album.singer).id)
        }

        // if(playlist){
        //     data.append('type', 'playlist')
        // }else{
        //     data.append('type', 'album')
        // }

        if(album.cover === ''){
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

        if(data.get('cover').size == 0){
            data.delete('cover')
        }

        
        let endpoint = (playlist ? '/api/playlists/newPlaylist' : '/api/albums/newAlbum')
        sendFormData({endpoint, data})
        .then(data => {
            if(data.TYPE == 'SUCCESS'){
                Swal.fire({
                    color: '#fff',
                    background: '#1f1f1f',
                    icon: 'success',
                    title: (playlist ? 'Playlist' : 'Album') + ' creado exitosamente',
                    showConfirmButton: true,
                })
                .then(
                    result => {
                        navigate(-1)
                    }
                )
               
            }else{
                Swal.fire({
                    color: '#fff',
                    background: '#1f1f1f',
                    icon: 'error',
                    title: 'Oops...',
                    text: data.MESSAGE,
                    showConfirmButton: true,
                })
            }
        })
        .catch(err => {
            Swal.fire({
                color: '#fff',
                background: '#1f1f1f',
                icon: 'error',
                title: 'Oops...',
                text: "No se ha podido crear " + (playlist ? 'la playlist.' : 'el mlbum.'),
                showConfirmButton: true,
            })
        })

        console.log(data)
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
                    justify="flex-end"
                    alignItems="top"
                > 
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
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
                            src={album.cover}
                        />
                        <ColorExtractor
                            src={album.cover}
                            getColors={colors => {
                                console.log(colors)
                                selectColor(colors[0])
                            }}
                        />

                        <Button id='1'
                             data-mdb-toggle="modal" data-mdb-target="#changePirctureModal"
                            align='left'
                            sx={{backgroundColor:'#1f1f1f', color:'#fff', borderRadius: "20px", fontSize: '0.9rem', fontWeight: 700, mt:2, px:2, width: '300px',
                            "&:hover": {
                                backgroundColor: "#353535",
                        },}} >Cambiar Fotografia</Button>

                    </Box>
                
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
                                {playlist ? 'Playlist' : 'Album'}
                            </Typography>


                            <CssTextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                name="name"
                                value={album.name}
                                onChange={(e) => setAlbum({...album, name: e.target.value})}
                                 sx={{ 
                                    input: { 
                                        color: '#fff',
                                        fontFamily: "monospace",
                                        fontWeight: 700,
                                        fontSize: "2.5rem",
                                    }, 
                                    borderColor: '#fff' }}
                            />  


                            {
                                playlist ?  
                                <>
                                    <Typography
                                        variant="h5"
                                        component="h5"
                                        align="left"
                                        sx={{
                                            mt:2,
                                            fontFamily: "monospace",
                                            fontWeight: 700,
                                            color: "#fff",
                                        }}
                                        >
                                        Descripcion
                                    </Typography>

                                    <CssTextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="description"
                                        name="description"
                                        value={album.description}
                                        onChange={(e) => setAlbum({...album, description: e.target.value})}
                                        sx={{ 
                                            input: { 
                                                color: '#fff',
                                                fontFamily: "monospace",
                                                fontWeight: 700,
                                                fontSize: "2.5rem",
                                            }, 
                                            borderColor: '#fff' }}
                                    />
                                </>
                                :

                                <>
                                    <Typography
                                        variant="h5"
                                        component="h5"
                                        align="left"
                                        sx={{
                                            mt:2,
                                            fontFamily: "monospace",
                                            fontWeight: 700,
                                            color: "#fff",
                                        }}
                                        >
                                        Artist
                                    </Typography>

                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            align='left'
                                            value={album.singer}
                                            onChange={(e) => {
                                                setAlbum({...album, singer: e.target.value})
                                            }}
                                            sx={{
                                                fontFamily: "monospace",
                                                fontWeight: 700,
                                                color: "#fff",
                                                fontSize: "2.5rem",
                                            }}
                                        >
                                            {artistList.map((artist) => (
                                                <MenuItem key={artist.id} value={artist.name}>{artist.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </>

                            }

                            <Grid
                                container
                                sx={{ width: "100%", ml:2, mt:5}}
                                alignItems="bottom"
                                justifyContent="right"
                            >
                                <Button 
                                    align='right'
                                    sx={{
                                        backgroundColor:'#9d0000', color:'#fff', borderRadius: "20px", fontSize: '0.9rem', fontWeight: 700, px:2, mx:1,
                                        "&:hover": {
                                            backgroundColor: "#b03232",
                                        },
                                    }} 
                                >
                                    Cancelar
                                </Button>
                                    
                                <Button
                                    type="submit"
                                    align='right'
                                    sx={{
                                        backgroundColor:'#1f1f1f', color:'#fff', borderRadius: "20px", fontSize: '0.9rem', fontWeight: 700, px:2, mx:1,
                                        "&:hover": {
                                            backgroundColor: "#353535",
                                        },
                                    }} 
                                >
                                    {playlist ? 'Crear Playlist' : 'Crear Album'}
                                </Button>
                            </Grid>

                    </Grid>

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
                             <input type="file" name="cover" sx={{ align:'center' }}
                             onChange= {(e) => {
                                setPreview(URL.createObjectURL(e.target.files[0]))
                             }} />
                        </div>

                        <div className="modal-body">
                           
                        </div>
                        
                        <div className="modal-footer">

                            <Button className="button my-3" data-mdb-dismiss="modal"
                                onClick={() => {
                                    setPreview(album.cover)
                                }}
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
                            
                            <Button className="button my-3" onClick={() => {setAlbum({...album, cover: preview});}} data-mdb-dismiss="modal"
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
  
 