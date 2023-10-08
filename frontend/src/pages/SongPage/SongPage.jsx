import React, { useState, useEffect } from 'react';
import {
    useParams,
    useNavigate,
} from 'react-router-dom'
import { ColorExtractor } from 'react-color-extractor'

import { ButtonGroup, Typography, Box, Container, Grid, Button, Paper, CssBaseline, Divider, IconButton, Table, TableBody, TableHead, TableRow, TableContainer, Fab } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MopedIcon from '@mui/icons-material/Moped';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LockIcon from '@mui/icons-material/Lock';
import { SongCard } from '../../components/SongCard/SongCard';
import { Section } from '../Section/Section';

import song_list from '../../assets/song_list';
import album_list from '../../assets/album_list';
import artist_list from '../../assets/artist_list';

import { getData, sendJsonData } from '../../api/api';

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

export default function SongPage(props) {

    const {
        admin=true
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
        inFav: 0
      });
    
      const [count, setCount] = useState(0);

    
    const sendFavorite = () => {
        const endpoint = '/api/users/addFavorite';
        sendJsonData({endpoint, data: {song: song.id, email: window.localStorage.getItem('id')}})
        .then(data => {
            console.log(data)
            if(song.inFav === 0){
                setSong({...song, inFav: 1})
            } else {
                setSong({...song, inFav: 0})
            }
        })
    };


    useEffect(() => {
        let endpoint = `/api/songs/${id}/${window.localStorage.getItem('id')}`;
        getData({endpoint})
        .then(data => {
            if(data != null || data != undefined){
                console.log(data)
                setSong(data[0])
            } else {
                console.log('error')
                navigate(-1)
            }        
        })

        setCount(count + 1);
     
    },[]);

    
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

    function handlePlay(){
      const queue = {
        song_list: [song],
        lastUpdate: Date.now()
      }
      window.sessionStorage.setItem("queue",JSON.stringify(queue));
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
                    // alignItems="top"
                    // justifyContent="left"
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
                        src={song.cover}
                    />

                    <ColorExtractor
                        src={song.cover}
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
                                Canción
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
                                {song.name}
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
                                {song.singer}
                            </Typography>
                            
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
                                Duracion: {song.duration}
                            </Typography>
                            

                            <Grid item xs={12} md={12} lg={12} align='left' sx={{pt:2}} >

                                <IconButton aria-label="play" 
                                    onClick={() => handlePlay()}
                                    sx={{
                                        mr:1,
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

                                <IconButton aria-label="favorite" 
                                    onClick={() => sendFavorite()}
                                    sx={{
                                        mr:1,
                                        color:'#fff', 
                                        backgroundColor: "#1f1f1f",
                                        border:0,
                                        "&:hover": {
                                            backgroundColor: "#353535",
                                            borderColor: '#1f1f1f',
                                        },
                                    }} 
                                >
                                    {
                                        song.inFav === 1 ? <FavoriteIcon fontSize='large'/> : <FavoriteBorderIcon fontSize='large'/>
                                    }
                                </IconButton> 

                                {
                                    admin &&
                                    <Button id='1'
                                        onClick={() => navigate('/Edit/Song/'+song.id)}
                                        sx={{backgroundColor:'#1f1f1f', color:'#fff', borderRadius: "20px", fontSize: '0.9rem', fontWeight: 700, mx:1, py:1, px:2,
                                        "&:hover": {
                                            backgroundColor: "#353535",
                                    },}} >Editar</Button>
                                }

                            </Grid>

                            
                        
                    </Grid>

                </Grid>

            </Grid>
            </ThemeProvider>
        </Box>
      </>
    );
}
  
