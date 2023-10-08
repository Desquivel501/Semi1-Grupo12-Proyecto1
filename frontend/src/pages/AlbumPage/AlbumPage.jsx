import React, { useState, useEffect } from 'react';
import {
    Link,
    Routes,
    Route,
    useParams,
    useNavigate,
} from 'react-router-dom'
import { ColorExtractor } from 'react-color-extractor'

import { ButtonGroup, Typography, Box, Container, Grid, Button, Paper, CssBaseline, Divider, IconButton, Table, TableBody, TableHead, TableRow, TableContainer } from '@mui/material';
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

import { getData } from '../../api/api';

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

function createData(no, title) {
    return {no, title };
  }

export default function AlbumPage(props) {

    const {
        playlist = false,
        favoritos = false,
        radio = false,
        admin = (localStorage.getItem('type') == 0),
    } = props;

    const navigate = useNavigate();

    const { id } = useParams();

    const [isHovered, setIsHovered] = useState(0);
    const [color, setColor] = useState('#626262');
    const [count, setCount] = useState(0);
    const [album, setAlbum] = useState({
        id: 0,
        name: '',
        cover:
            'https://soundstream-semi1-g12.s3.us-east-2.amazonaws.com/no_album.jpg',
        description: '',
        singer: ''
    });
    const [songList, setSongList] = useState([]);

    useEffect(() => {
        if(favoritos){
            setAlbum({
                id: 0,
                name: 'Favoritos',
                cover:
                    'https://soundstream-semi1-g12.s3.us-east-2.amazonaws.com/favorites.png',
                description: 'Las canciones que te gustan.',
                singer: ''
            })
            // setSongList(song_list)
            let endpoint = `/api/users/${window.localStorage.getItem('id')}/favorites/`;
            getData({endpoint})
            .then(data => {
                if(data === undefined){
                    setSongList([])
                } else {    
                    setSongList(data)
                }
            })

        } else if(playlist){

            let endpoint = `/api/playlists/${id}/data`;
            getData({endpoint})
            .then(data => {

                if(data === undefined){
                    navigate('/')
                }
                
                if(Array.isArray(data)){
                    data = data[0]
                }

                if(data.email !== localStorage.getItem('id')){
                    navigate('/')
                }

                setAlbum({...data})
            })
            .catch(err => {
                console.log(err)
                navigate('/')
            })
            
            endpoint = `/api/playlists/${id}/songs`;
            getData({endpoint})
            .then(data => {
                setSongList(data)
            })

        } else if(radio){
            setAlbum({
                id: 0,
                name: 'Radio',
                cover:
                    'https://soundstream-semi1-g12.s3.us-east-2.amazonaws.com/radio.png',
                description: 'Escucha todas nuestras canciones.',
                singer: ''
            })
            let endpoint = '/api/songs';
            getData({endpoint})
            .then(data => {
                if(data != null || data != undefined){
                    setSongList(data)
                } else {
                    setSongList([])
                }
            })
            .catch(err => console.log(err))

        }else{

            let endpoint = `/api/albums/${id}`;
            getData({endpoint})
            .then(data => {
                if(data === undefined){
                    navigate('/')
                }
                setAlbum({...data, description: ''})
            })

            endpoint = `/api/albums/${id}/songs`;
            getData({endpoint})
            .then(data => {
                if(data === undefined){
                    setSongList([])
                } else {
                    setSongList(data)
                }
            })
        }
        setCount(count + 1);
    },[]);


    const handlePlay = (id) => {

        const song = songList.find((song) => song.id === id)
        console.log(song)
        const queue = {
          song_list: [song],
          lastUpdate: Date.now()
        }
        window.sessionStorage.setItem("queue",JSON.stringify(queue));
    }

    const handlePlayAll = () => {
        const queue = {
          song_list: songList,
          lastUpdate: Date.now()
        }
        window.sessionStorage.setItem("queue",JSON.stringify(queue));
    }



    const handleMouseEnter = (n) => {
        setIsHovered(n);
      };
    
      const handleMouseLeave = () => {
        setIsHovered(0);
      };

    

    
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
            component="main"
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
                    alignItems="center"
                    
                > 
                    <Box
                        component="img"
                        sx={{
                            height: "auto",
                            maxWidth: "300px",
                            ml:2,
                            mr:2,
                            mb:2,
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
                                {playlist ? 'Playlist' : favoritos ? '' : radio ? '' : 'Album'  }
                            </Typography>

                            <Typography
                                variant="h1"
                                component="h1"
                                align="left"
                                sx={{
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    color: "#fff",
                                }}
                                >
                                {album.name}
                            </Typography>
                            
                            {
                                !(playlist || radio) &&
                                <Typography
                                    variant="h4"
                                    component="h4"
                                    align="left"
                                    sx={{
                                        fontFamily: "monospace",
                                        fontWeight: 700,
                                        color: "#fff",
                                    }}
                                    >
                                    {album.singer}
                                </Typography>
                            }

                            <Typography
                                variant="h6"
                                component="h6"
                                align="left"
                                sx={{
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    color: "#fff",
                                }}
                                >
                                {album.description}
                            </Typography>

                            <Grid item xs={12} md={12} lg={12} align='left' sx={{pt:2}} >

                                <IconButton aria-label="play_all"
                                    onClick={handlePlayAll}
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
                                    <PlayArrowIcon fontSize='large'/>
                                </IconButton> 

                                {
                                    ((playlist || admin) && (!favoritos && !radio)) &&
                                    <Button id='1'
                                        onClick={() => navigate(playlist ? `/Edits/Playlist/${id}` : `/Edit/Album/${id}`)}
                                        sx={{backgroundColor:'#1f1f1f', color:'#fff', borderRadius: "20px", fontSize: '0.9rem', fontWeight: 700, mx:1, py:1, px:2,
                                        "&:hover": {
                                            backgroundColor: "#353535",
                                    },}} >Editar</Button>
                                }

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

                        <Grid
                            item
                            xs={4.5}
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
                                    py:1.5
                                }}
                                >
                                Titulo
                            </Typography>
                        </Grid>

                        {
                            (playlist || radio || favoritos) &&
                            <Grid
                                item
                                xs={4.5}
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
                                Artista
                                </Typography>
                            </Grid>
                        }
       
                    </Grid>

                    <Divider sx={{borderColor:'#fff', mb:2}}/>

                    {songList.map((item, i) => (
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
                            onClick={() => handlePlay(item.id)}
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
                                xs={4.5}
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

                            {
                                (playlist || radio || favoritos) &&
                                <Grid
                                    item
                                    xs={4.5}
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
                                        {item.artist !== undefined ? item.artist : item.singer}
                                    </Typography>
                                    
                                </Grid>
                            }
                        </Grid>
                        
                    ))}
            
                </Grid>
            


            </Grid>

               

            </ThemeProvider>

        </Box>
      </>
    );
}
  
