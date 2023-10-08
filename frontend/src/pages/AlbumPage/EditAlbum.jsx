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

import { deleteData, getData, patchData, sendJsonData } from '../../api/api';
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

function createData(no, title) {
    return {no, title };
  }

var rows = [
    createData(1,'Prison Song'),
    createData(2,'Needles'),
    createData(3,'Deer Dance'),
    createData(4,'Jet Pilot'),
    createData(5,'X'),
    createData(6,'Chop Suey!'),
    createData(7,'Bounce'),
    createData(8,'Forest'),
    createData(9,'ATWA'),
    createData(10,'Science'),
    createData(11,'Shimmy'),
    createData(12,'Toxicity'),
    createData(13,'Psycho'),
    createData(14,'Aerials'),
  ];


export default function EditAlbum(props) {

    const {
        playlist = false,
        admin = true,
        edit = true,
    } = props;

    const { id } = useParams();

    const [isHovered, setIsHovered] = useState(0);
    const [color, setColor] = useState('#626262');
    const [count, setCount] = useState(0);
    const [album, setAlbum] = useState({
        id: 0,
        name: '',
        cover:
            'https://soundstream-semi1-g12.s3.us-east-2.amazonaws.com/no_album.jpg',
        singer: '',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar nibh vel enim gravida sodales. Aliquam erat volutpat. Fusce eget est ante. Morbi vitae ante quis lacus imperdiet tristique id vel orci. Aliquam congue purus libero, eget pellentesque odio efficitur a. Duis tincidunt cursus finibus. Sed egestas erat id elit finibus mollis.',
    });
    const [preview, setPreview] = useState(album.cover);
    const [artistList, setArtistList] = useState([]);
    const [songList, setSongList] = useState([]);
    const [currentSongs, setCurrentSongs] = useState([]);
    const [artistId, setArtistId] = useState(0);

    const [state, setState] = useState(0);

    useEffect(() => {

        if(edit){
            let current_name = ""
            let artist_id = 0;
            let endpoint = `/api/albums/${id}`
            getData({endpoint})
            .then(data => {
                if(data === null || data === undefined){
                    navigate(-1)
                    return
                }
                current_name = data.singer;
                setAlbum(data)
            })

            endpoint = `/api/artists`;
            getData({endpoint})
            .then(data => {
                data.find(element => {
                    if(element.name === current_name){
                        setArtistId(element.id)
                        let endpoint = `/api/artists/${element.id}/songs/notInAlbum`;
                        getData({endpoint})
                        .then(data => {
                            if(data != null || data != undefined){
                                setSongList(data)
                            } else {
                                setSongList([]) 
                            }
                        })
                        return
                    }
                })
            })
            
            endpoint = `/api/albums/${id}/songs`;
            getData({endpoint})
            .then(data => {
                if(data != null || data != undefined){
                    setCurrentSongs(data)
                } else {
                    setCurrentSongs([]) 
                }
            })
            setCount(count + 1);
       }

    },[]);


    useEffect(() => {

        if(state > 0){
            let endpoint = `/api/artists`;
            getData({endpoint})
            .then(data => {
                data.find(element => {
                    if(element.name === album.singer){
                        let endpoint = `/api/artists/${element.id}/songs/notInAlbum`;
                        getData({endpoint})
                        .then(data => {
                            if(data != null || data != undefined){
                                setSongList(data)
                            } else {
                                setSongList([]) 
                            }
                        })
                        return
                    }
                })
            })
            
            endpoint = `/api/albums/${id}/songs`;
            getData({endpoint})
            .then(data => {
                if(data != null || data != undefined){
                    setCurrentSongs(data)
                } else {
                    setCurrentSongs([]) 
                }
            })

            setCount(count + 1);
        }

    },[state]);

    const handleSubmit  = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append('id', album.id);
        data.append('artist', artistId);
        data.append('description', "");

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
            data.set('cover', '')
        }

        console.log(data)

        let endpoint = `/api/albums/`;
        patchData({endpoint, data})
        .then(data => {
            console.log(data)
            if(data.TYPE === 'SUCCESS'){
                Swal.fire({
                    icon: 'success',
                    title: 'Album actualizado exitosamente',
                    showConfirmButton: false,
                }).then(() => {
                    navigate(-1)
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.MESSAGE,
                  })
            }
        })
    }


    const addSong = (id_song) => {
        console.log(id_song)
        let endpoint = `/api/albums/addSong`;
        sendJsonData({endpoint, data: {id_album: album.id, id_song: id_song}})
        .then(data => {
            console.log(data)
            if(data.TYPE === 'SUCCESS'){
                Swal.fire({
                    icon: 'success',
                    title: 'Cancion agregada exitosamente',
                    showConfirmButton: false,
                })
                setState(state + 1)

            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.MESSAGE,
                  })
            }
        })
    }

    const removeSong = (song_id) => {
        console.log("Remove: " + id)
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9d0000',
            cancelButtonColor: '#717171',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
            }).then((result) => {
                if(result.isConfirmed){
                    let endpoint = `/api/albums/removeSong`;
                    sendJsonData({endpoint, data: {id_album: album.id, id_song: song_id}})
                    .then(data => {
                        console.log(data)
                        if(data.TYPE === 'SUCCESS'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Cancion eliminada del album exitosamente',
                                showConfirmButton: false,
                            })
                            setState(state + 1)
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: data.MESSAGE,
                            })
                        }
                    })
                }
        })
    }

    const onDelete = () => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9d0000',
            cancelButtonColor: '#717171',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
            }).then((result) => {
                if(result.isConfirmed){
                    console.log("Delete: " + id)
                    let endpoint = `/api/albums/${id}`;
                    deleteData({endpoint})
                    .then(data => {
                        console.log(data)
                        if(data.TYPE === 'SUCCESS'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Album eliminado exitosamente',
                                showConfirmButton: false,
                            }).then(() => {
                                navigate(-2)
                            })
                            
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: data.MESSAGE,
                            })
                        }
                    })
                }
        })
    }


    const handleMouseEnter = (n) => {
        setIsHovered(n);
      };
    
      const handleMouseLeave = () => {
        setIsHovered(0);
      };

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
                pb:'90px',
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
                                        id="name"
                                        name="name"
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

                                    {/* <Typography
                                        variant="h6"
                                        component="h6"
                                        align="left"
                                        sx={{
                                            fontFamily: "monospace",
                                            fontWeight: 700,
                                            color: "#fff",
                                        }}
                                        >
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar nibh vel enim gravida sodales. Aliquam erat volutpat. Fusce eget est ante. Morbi vitae ante quis lacus imperdiet tristique id vel orci. Aliquam congue purus libero, eget pellentesque odio efficitur a. Duis tincidunt cursus finibus. Sed egestas erat id elit finibus mollis. 
                                    </Typography> */}
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

                                    <Typography
                                        variant="h3"
                                        component="h3"
                                        align="left"
                                        sx={{
                                            fontFamily: "monospace",
                                            fontWeight: 700,
                                            color: "#fff",
                                        }}
                                        >
                                        {album.singer}
                                    </Typography>
                                </>

                            }

                            <Grid
                                container
                                sx={{ width: "100%", ml:2, mt:5}}
                                alignItems="bottom"
                                justifyContent="right"
                            >
                                <Button 
                                    onClick={() => edit ? onDelete() : navigate(-1)}
                                    align='right'
                                    sx={{
                                        backgroundColor:'#9d0000', color:'#fff', borderRadius: "20px", fontSize: '0.9rem', fontWeight: 700, px:2, mx:1,
                                        "&:hover": {
                                            backgroundColor: "#b03232",
                                        },
                                    }} 
                                >
                                    {edit ? "Eliminar" : "Cancelar"}
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
                                    {edit ? "Guardar Cambios" : "Crear Album"}
                                </Button>
                            </Grid>

                    </Grid>

                </Grid>

                <Grid item xs={12} md={12} lg={12} align='left' sx={{pb:2}} >

                    <Grid item xs={12} md={12} lg={12} align='left' display='flex'  sx={{ pl:2}} justify="flex-end"
                        alignItems="center">

                        <Grid
                            item
                            xs={.5}
                        >
                            <IconButton
                                sx={{ color: 'rgba(76, 175, 80, 0)', backgroundColor: 'rgba(76, 175, 80, 0)'}} 
                            >
                                <PlayArrowIcon />
                            </IconButton> 
                        </Grid>

                        <Grid
                            item
                            xs={.5}
                        >
                           <Typography
                                variant="h6"
                                component="h6"
                                align="left"
                                sx={{
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    color: "#fff",
                                    pl:2,
                                    pr:1,
                                    py:1.5
                                }}
                                >
                            #
                            </Typography>
                        </Grid>
                        
                        <Typography
                            variant="h6"
                            component="h6"
                            align="left"
                            sx={{
                                fontFamily: "monospace",
                                fontWeight: 700,
                                color: "#fff",
                                pl:2,
                                py:1.5
                            }}
                            >
                            Title
                        </Typography>
                    </Grid>

                    <Divider sx={{borderColor:'#fff', mb:2}}/>

                    <Grid item xs={12} md={12} lg={12} align='left' display='flex' 
                        data-mdb-toggle="modal" data-mdb-target="#addSongModal"
                        sx={{
                            pl:2, 
                            cursor: 'pointer',
                            "&:hover": {
                                backgroundColor: changeColor(color, -20),
                            },
                            borderRadius: 4,
                        }} 
                        justify="flex-end"
                        alignItems="center"
                    >
                        <Grid
                            item
                            xs={.5}
                        >
                             <IconButton
                                sx={{
                                    color:'#fff', 
                                    backgroundColor: "#1f1f1f",
                                    border:0,
                                    "&:hover": {
                                        backgroundColor: "#353535",
                                        borderColor: '#1f1f1f',
                                    },
                                }} 
                            >
                                <AddIcon />
                            </IconButton> 
                        </Grid>

                        <Typography
                            variant="h6"
                            component="h6"
                            align="left"
                            
                            sx={{
                                fontFamily: "monospace",
                                fontWeight: 700,
                                color: "#fff",
                                pl:2,
                                py:1.5
                            }}
                            >
                                Agregar canción
                        </Typography>

                    </Grid>

                    <Divider sx={{borderColor:'#fff', my:2}}/>


                    {currentSongs.map((item, i) => (
                        <Grid item xs={12} align='left' display='flex' key={item.id}
                            sx={{
                                pl:2, 
                                cursor: 'pointer',
                                "&:hover": {
                                    backgroundColor: changeColor(color, -20),
                                },
                                borderRadius: 4
                            }} 
                            justify="flex-end"
                            alignItems="center"
                            onMouseEnter={() => handleMouseEnter(i+1)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Grid
                                item
                                xs={.5}
                            >
                                <IconButton key={i+1}
                                    
                                    sx={{
                                        color:'#fff', 
                                        backgroundColor: "#1f1f1f",
                                        border:0,
                                        "&:hover": {
                                            backgroundColor: "#353535",
                                            borderColor: '#1f1f1f',
                                        },
                                    }} 
                                >
                                    
                                    {isHovered == (i+1) ? <PlayArrowIcon /> : <MusicNoteIcon />}
                                </IconButton> 
                            </Grid>

                            <Grid
                                item
                                xs={.5}
                            >
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    align="left"
                                    sx={{
                                        fontFamily: "monospace",
                                        fontWeight: 700,
                                        color: "#fff",
                                        pl:2,
                                        pr:1,
                                        py:1.5,
                                    }}
                                    >
                                    {i+1}
                                </Typography>

                            </Grid>
                            
                            <Grid
                                item
                                xs={9}
                            >
                                <Typography
                                    width='90%'
                                    variant="h6"
                                    component="h6"
                                    align="left"
                                    sx={{
                                        fontFamily: "monospace",
                                        fontWeight: 700,
                                        color: "#fff",
                                        pl:2,
                                        py:1.5
                                    }}
                                    >
                                    {item.name}
                                </Typography>
                                
                            </Grid>

                            <Grid
                                item
                                xs={.5}
                                alignItems="top"
                                justifyContent="right"
                            >
                                <IconButton key={"remove"+ i+1}
                                    onClick={() => removeSong(item.id)}
                                    sx={{
                                        color:'#fff', 
                                        backgroundColor: "#9d0000",
                                        border:0,
                                        "&:hover": {
                                            backgroundColor: "#b03232",
                                            borderColor: '#1f1f1f',
                                        },
                                    }} 
                                >
                                    <RemoveIcon />
                                </IconButton> 
                            
                            </Grid>


                        </Grid>
                        
                    ))}
            
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



            <div className="modal fade" id="addSongModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{background:"#1f1f1f"}}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Agregar Canciones</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'center'}}>
                            <Typography 
                                variant="h6"
                                component="h6"
                                align="left"
                                sx={{
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    color: "#fff",
                                    pl:2,
                                    py:1.5
                                }}
                                >
                                Canciones Disponibles
                            </Typography>

                            <Grid container spacing={3} sx={{ width: "100%", mx:2, mt:2}}
                                // alignItems="bottom"
                                justify="flex-end"
                                alignItems="center"
                            >

                            {songList.map((item, i) => (
                                
                                <Grid item xs={12} align='left' display='flex' key={item.id}
                                    data-mdb-dismiss="modal"
                                    onClick={() => {
                                        addSong(item.id)
                                    }}
                                    sx={{
                                        // pl:2,
                                        // py:0.5,
                                        py:1,
                                        cursor: 'pointer',
                                        "&:hover": {
                                            backgroundColor: changeColor(color, -20),
                                        },
                                        borderRadius: 4
                                    }}
                                    // justify="flex-end"
                                    // alignItems="center"
                                >
                                    <Grid item xs={10}>
                                        <Typography
                                            key={item.id}
                                            width='90%'
                                            variant="h6"
                                            component="h6"
                                            align="left"
                                            sx={{
                                                fontFamily: "monospace",
                                                fontWeight: 700,
                                                color: "#fff",
                                                // pl:2,
                                                // py:1.5
                                            }}
                                            >
                                            {item.name}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={1}
                                        alignItems="top"
                                        justifyContent="right"
                                    >
                                        <IconButton
                                            sx={{
                                                color:'#fff', 
                                                backgroundColor: "#38761d",
                                                border:0,
                                                "&:hover": {
                                                    backgroundColor: "#5f914a",
                                                    borderColor: '#1f1f1f',
                                                },
                                            }} 
                                        >
                                            <AddIcon />
                                        </IconButton> 
                            
                                    </Grid>


                                </Grid>
                            ))}

                            </Grid>
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
  
