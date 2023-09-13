import React, { useState, useEffect } from 'react';
import {
    Link,
    Routes,
    Route,
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

import GetAll from './GetAll';


import SearchBar from '../../components/SearchBar/SearchBar';

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


export default function SearchPage(props) {

    const {
        crud = false,
    } = props;

    const [isHovered, setIsHovered] = useState(0);
    const [color, setColor] = useState('#626262');
    const [search, setSearch] = useState('');
    const [sent, setSent] = useState('');

    const [buttons, setButtons] = useState([ 
        {id: 1, name: 'Canciones', active: true, color: '#626262', type: 'song'},
        {id: 2, name: 'Álbumes', active: false, color: '#1f1f1f', type: 'album'},
        {id: 3, name: 'Artistas', active: false, color: '#1f1f1f', type: 'artist'},
    ]);

    const [active, setActive] = useState('song');

    const [cont, setCont] = useState(0);

    const navigate = useNavigate();

    const handleSearch = (text) => {
        setSearch(text)
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
        setCont(cont+1)
    }


    useEffect(() => {

        const updateSearch = () => {
            if(sent != search){
                if(search != "" && search != undefined && search != null){
                    console.log(search)
                    setSent(search)
                } 
            }    
        };
    
        const interval =  setInterval(() => {
            updateSearch()
          
        }, 750);
        return () => clearInterval(interval);
      },[search, sent]);
    

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
                backgroundColor: "#4b4b4b",
                borderRadius: 5,
                height: window.innerHeight - 150,
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
                <Grid item xs={12} md={12} lg={12} align='left' sx={{height:'max-content'}}>

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

                <Grid item xs={12} md={12} lg={12} align='left' sx={{height:'max-content', pb:2}} >
                    <SearchBar onSearch={handleSearch}/>
                </Grid>

                <Grid
                    container
                    spacing={3}
                    sx={{ width: "100%", ml:3, mt:1, mb:3}}
                    alignItems="top"
                    justifyContent="left"
                > 
                    <Button id='1' onClick={() => pressButtons(1)}
                        sx={{backgroundColor:buttons[0].color, color:'#fff', borderRadius: "20px", fontSize: '0.9rem', fontWeight: 700, mx:1, py:1, px:2,
                        "&:hover": {
                            backgroundColor: "#626262",
                        },}} >Canciones</Button>
                    <Button id='2' onClick={() => pressButtons(2)} 
                        sx={{backgroundColor: buttons[1].color, color:'#fff', borderRadius: "20px", fontSize: '0.9rem', fontWeight: 700, mx:1, py:1, px:2,
                        "&:hover": {
                            backgroundColor: "#626262",
                        },}} >Álbumes</Button>
                    <Button id='3' onClick={() => pressButtons(3)}
                        sx={{backgroundColor: buttons[2].color, color:'#fff', borderRadius: "20px", fontSize: '0.9rem', fontWeight: 700, mx:1, py:1, px:2,
                        "&:hover": {
                            backgroundColor: "#626262",
                        },}} >Artistas</Button>
                </Grid>

                <GetAll type={active} title={false} crud={crud} search={search} sx={{mt:0}}/>

            </Grid>
            
            </ThemeProvider>

        </Box>
      </>
    );
}
  
