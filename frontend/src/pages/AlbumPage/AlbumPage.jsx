import React, { useState } from 'react';
import {
    Link,
    Routes,
    Route,
    useNavigate,
} from 'react-router-dom'

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

const rows = [
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


export default function AlbumPage() {

    const [isHovered, setIsHovered] = useState(0);

    const handleMouseEnter = (n) => {
        setIsHovered(n);
      };
    
      const handleMouseLeave = () => {
        setIsHovered(0);
      };

    const navigate = useNavigate();

    return (
      <>
         <Box
            component="main"
            display="flex"
            width="100%"
            height={window.innerHeight - 130}
            justify="flex-end"
            alignItems="top"
            sx={{
                flexGrow: 1,
                border:0,
                borderColor: 'primary.main',
                overflow: 'auto',
                p: 3,
                m:-2,
                backgroundColor: '#626262',
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
                            ml:2
                        }}
                        alt="Logo"
                        src='https://upload.wikimedia.org/wikipedia/en/6/64/SystemofaDownToxicityalbumcover.jpg'
                    />
                
                    <Grid
                        item
                        xs={ window.innerWidth < 1500 ? 7.5 : 9}
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
                                Album
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
                                Toxicity
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
                                System of a Down
                            </Typography>

                            <Grid item xs={12} md={12} lg={12} align='left' sx={{pt:2}} >

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
                                >
                                    <PlayArrowIcon fontSize='large'/>
                                </IconButton> 
                            </Grid>

                            
                        
                    </Grid>

                </Grid>

                <Grid item xs={12} md={12} lg={12} align='left' sx={{pb:2}} >

                    <Grid item xs={12} md={12} lg={12} align='left' display="-webkit-box" sx={{ pl:2}} justify="flex-end"
                        alignItems="center">

                        <IconButton
                            sx={{ color: 'rgba(76, 175, 80, 0)', backgroundColor: 'rgba(76, 175, 80, 0)'}} 
                        >
                            <PlayArrowIcon />
                        </IconButton> 

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

                    {rows.map((row, i) => (
                        <Grid item xs={12} md={12} lg={12} align='left' display="-webkit-box" 
                        sx={{
                                pl:2, 
                                cursor: 'pointer',
                                "&:hover": {
                                    backgroundColor: "#787878",
                                },
                        }} 
                        justify="flex-end"
                        alignItems="center"
                        onMouseEnter={() => handleMouseEnter(i+1)}
                        onMouseLeave={handleMouseLeave}>

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
                                {row.title}
                            </Typography>

                        </Grid>
                        
                    ))}
            
                </Grid>
            


            </Grid>

               

            </ThemeProvider>

        </Box>
      </>
    );
}
  
