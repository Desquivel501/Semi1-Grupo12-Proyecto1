
import { ButtonGroup, Typography, Box, Container, Grid, Button, Paper, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import MopedIcon from '@mui/icons-material/Moped';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LockIcon from '@mui/icons-material/Lock';
import { SongCard } from '../../components/SongCard/SongCard';
import { Section } from '../Section/Section';

import song_list from '../../assets/song_list';
import album_list from '../../assets/album_list';
import artist_list from '../../assets/artist_list';

import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { sesionContext } from '../../context/SessionContext';

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


export default function StartPage() {

    const [songList, setSongList] = useState([]);
    const [albumList, setAlbumList] = useState([]);
    const [artistList, setArtistList] = useState([]);

    useEffect(() => {
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

        endpoint = '/api/artists';
        getData({endpoint})
        .then(data => {
            if(data != null || data != undefined){
                setArtistList(data)
            } else {
                setArtistList([])
            }        
        })
        .catch(err => console.log(err))

        endpoint = '/api/albums';
        getData({endpoint})
        .then(data => {
            if(data != null || data != undefined){
                setAlbumList(data)
            } else {
                setAlbumList([])
            }
        })
        .catch(err => console.log(err))
    }, []);

    return (
      <>
         <Box
            component="main"
            display="flex"
            width="100%"
            maxHeight={window.innerHeight - 150}
            sx={{
                flexGrow: 1,
                border:0,
                borderColor: 'primary.main',
                overflow: 'auto',
                pb: 3,
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
                <Section title="Canciones" items={songList} type={"song"}/>
                <Section title="Albumes" items={albumList} type={"album"}/>
                <Section title="Artistas" items={artistList} type={"artist"}/>

            </Grid>

               

            </ThemeProvider>

        </Box>
      </>
    );
}
  
