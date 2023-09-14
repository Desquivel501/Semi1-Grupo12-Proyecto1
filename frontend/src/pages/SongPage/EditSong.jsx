import React, { useState, useEffect, useRef  } from 'react';
import {
    useParams,
    useNavigate,
} from 'react-router-dom'
import { ColorExtractor } from 'react-color-extractor'

import { ButtonGroup, Typography, Box, Container, Grid, Button, Paper, CssBaseline, Divider, IconButton, Table, TableBody, TableHead, TableRow, TableContainer, Fab, TextField, InputLabel, FormControl, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { sendFormData } from '../../api/api';

import song_list from '../../assets/song_list';
import artist_list from '../../assets/artist_list';

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

export default function EditSong(props) {

    const {
        edit=true
    } = props;

    const navigate = useNavigate();
    const { id } = useParams();

    const [color, setColor] = useState('#626262');
    const [song, setSong] = useState({
        id: 0,
        name: '',
        singer: '',
        cover:
          'https://soundstream-semi1-g12.s3.us-east-2.amazonaws.com/no_album.jpg',
        musicSrc: '',
      });
    
    const [count, setCount] = useState(0);
    
    const [newSong, setNewSong] = useState('');
    const [preview, setPreview] = useState(song.cover);
    const [duration, setDuration] = useState(0);

    const [file, setFile] = useState(null);


    useEffect(() => {
        console.log(id)
        if(edit){
            const song = song_list.find( song => song.id == id);
            setSong(song)
            setPreview(song.cover)
            setNewSong(song.musicSrc)
            setDuration(song.duration)
        }
        setCount(count + 1) 
     
    },[]);

    const handleChange = (event) => {
        setSong({...song, singer: event.target.value});
    };

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(image);
            return;
        }
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        (edit ? data.append('id', song.id) : null)
        data.append('artist', 11)

        if(song.musicSrc === ''){
            Swal.fire({
                color: '#fff',
                background: '#1f1f1f',
                icon: 'error',
                title: 'Oops...',
                text: "No se ha seleccionado una cancion.",
            })
            return
        }
        
        if(data.get('source').size == 0){
            data.delete('source')
        }

        if(song.cover === ''){
            Swal.fire({
                color: '#fff',
                background: '#1f1f1f',
                icon: 'error',
                title: 'Oops...',
                text: "No se ha seleccionado una imagen.",
            })
            return
        }

        if(data.get('cover').size == 0){
            data.delete('cover')
        }

        console.log(data)

        sendFormData({
            endpoint: edit ? '/api/songs/newSong' : '/api/songs/newSong',
            data: data,
        }).then((response) => {
            console.log(response)
        })
        .catch((err) => console.log(err));
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
            // component="main"
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

            component="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            
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
                <Grid item xs={12} md={12} lg={12} align='left' sx={{pb:2, height:'max-content'}} >

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
                            src={song.cover}
                        />
                        <ColorExtractor
                            src={song.cover}
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
                                Nombre
                            </Typography>

                            <CssTextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                name="name"
                                value={song.name}
                                onChange={(e) => setSong({...song, name: e.target.value})}
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
                                    mt:2,
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    color: "#fff",
                                }}
                                >
                                Artista
                            </Typography> 

                            {
                                edit ?
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
                                    {song.singer}
                                </Typography>
                                :
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        align='left'
                                        value={song.singer}
                                        onChange={(e) => setSong({...song, singer: e.target.value})}
                                        sx={{
                                            fontFamily: "monospace",
                                            fontWeight: 700,
                                            color: "#fff",
                                            fontSize: "2.5rem",
                                        }}
                                    >
                                        {artist_list.map((artist) => (
                                            <MenuItem key={artist.id} value={artist.name}>{artist.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>


                            }

                            <Typography
                                variant="h6"
                                component="h6"
                                align="left"
                                sx={{
                                    pt:1.5,
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    color: "#fff",
                                }}
                                >
                                Duracion:
                            </Typography>

                            <CssTextField
                                margin="normal"
                                type='number'
                                required
                                fullWidth
                                id="duration"
                                name="duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                sx={{ 
                                input: { 
                                    color: '#fff',
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                }, 
                                borderColor: '#fff' }}
                            /> 

                            
                            <Typography
                                variant="h6"
                                component="h6"
                                align="left"
                                sx={{
                                    pt:1.5,
                                    mb:1,
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    color: "#fff",
                                }}
                                >
                                Cancion:
                            </Typography>

                            <audio controls style={{width:'100%'}} key={count} id='main_audio'>
                                <source src={song.musicSrc} type="audio/mpeg"/>
                                Your browser does not support the audio element.
                            </audio>
                                                    
                            <Grid item xs={12} md={12} lg={12} align='left' sx={{pt:2}} >
                                <Button id='1'
                                    data-mdb-toggle="modal" data-mdb-target="#changeSongModal"
                                    sx={{backgroundColor:'#1f1f1f', color:'#fff', borderRadius: "20px", fontSize: '0.9rem', fontWeight: 700, mx:0, py:1, px:2, width:'300px',
                                    "&:hover": {
                                        backgroundColor: "#353535",
                                    },}} 
                                >
                                    Cambiar Cancion
                                </Button>
                            </Grid> 

                            
                        
                    </Grid>

                    <Grid
                        container
                        spacing={3}
                        sx={{ width: "100%", ml:2, mt:1}}
                        alignItems="top"
                        justifyContent="right"
                    >
                        <Button 
                            align='right'
                            sx={{
                                backgroundColor:'#9d0000', color:'#fff', borderRadius: "20px", fontSize: '0.9rem', fontWeight: 700, mt:4, px:2, mx:1,
                                "&:hover": {
                                    backgroundColor: "#b03232",
                                },
                            }} 
                        >
                            {edit ? "Eliminar" : "Cancelar"}
                        </Button>
                            
                        <Button
                            // onClick={() => guardarCambios()}
                            type="submit"
                            align='right'
                            sx={{
                                backgroundColor:'#1f1f1f', color:'#fff', borderRadius: "20px", fontSize: '0.9rem', fontWeight: 700, mt:4, px:2, mx:1,
                                "&:hover": {
                                    backgroundColor: "#353535",
                                },
                            }} 
                        >
                            {edit ? "Guardar Cambios" : "Crear Canción"}
                            
                        </Button>
                        
                    </Grid>

                </Grid>

                <div className="modal fade" id="changeSongModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{background:"#1f1f1f"}}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Cambiar Cancion</h5>
                                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body" style={{display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'center'}}>
                                <audio controls style={{width:'100%'}} key={count} id='main_audio'
                                    className="my-3">
                                    <source src={newSong} type="audio/mpeg"/>
                                    Your browser does not support the audio element.
                                </audio>
                                <input type="file" name="source" accept=".mp3" 
                                    onChange= {(e) => {
                                        setNewSong(URL.createObjectURL(e.target.files[0]))
                                        setCount(count + 1)
                                    }} 
                                />
                            </div>
                            
                            <div className="modal-footer">

                                <Button className="button my-3" data-mdb-dismiss="modal"
                                    onClick={() => setNewSong(song.musicSrc)}
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
                                
                                <Button className="button my-3" onClick={() => {setSong({...song, musicSrc: newSong}); setCount(count + 1)}} data-mdb-dismiss="modal"
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
                             <input type="file" name="cover" accept='.png, .jpg, .jpeg'
                                onChange= {(e) => {
                                    setPreview(URL.createObjectURL(e.target.files[0]))
                                }} 
                             />
                        </div>

                        <div className="modal-footer">

                            <Button className="button my-3" data-mdb-dismiss="modal"
                                onClick={() => {
                                    setPreview(song.cover)
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
                            
                            <Button className="button my-3" onClick={() => {setSong({...song, cover: preview});}} data-mdb-dismiss="modal"
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

            </Grid>
            </ThemeProvider>
        </Box>
      </>
    );
}
  
