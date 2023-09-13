
import { ButtonGroup, Typography, Box, Container, Grid, Button, Paper, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import MopedIcon from '@mui/icons-material/Moped';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LockIcon from '@mui/icons-material/Lock';
import { SongCard } from '../../components/SongCard/SongCard';
import { Section } from '../Section/Section';
import { useState, useEffect, useRef } from 'react'

import song_list from '../../assets/song_list';
import album_list from '../../assets/album_list';
import artist_list from '../../assets/artist_list';
import { useSesion } from '../../hooks/useSession';

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


export default function GetAll(props) {
    const {
        title = false,
        type = "song",
        items = "song",
        crud = false,
        search = "",
        sx = {
            flexGrow: 1,
            overflow: 'auto',
        },
    } = props;
    
    const { user } = useSesion();

    function filter(item) {

        return item.name.toLowerCase().includes(search.toLowerCase())
    }

    return (
      <>
         <Box
            component="main"
            display="flex"
            width="100%"
            maxHeight={window.innerHeight - 150}
            sx={{
                ...sx,
                border:0,
                borderColor: 'primary.main',
                pb: 3,
                pt:2,
                pl:2,
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
                <Grid
                    container
                    // spacing={3}
                    sx={{ width: "100%", pl:2}}
                    alignItems="center"
                    justifyContent="space-around"
                    // xs={12} 
                > 
                    {
                        title &&
                        <Grid 
                            item xs={12} 
                            sx={{ width: "100%" }}
                        >
                            <Typography variant="details" noWrap component="div"  align="left" alignSelf={'left'} 
                                sx={{ border:0, pb:1, color: '#fff'}}>
                                {type === "song" ? "Canciones" : type === "album" ? "Albums" : type === "artist" ? "Artistas" : ""}
                            </Typography>
                        </Grid>
                    }

                    <Grid 
                        container
                        sx={{ width: "100%", justifyContent:'space-around', display: 'flex', flexDirection: 'row'}}

                        // justifyContent={window.innerWidth < 1080 ? 'left' : 'space-around'}
                    >
                        {
                            crud && user.type === 1 &&
                            <SongCard 
                                key={0}
                                id={0}
                                title='Agregar Cancion'
                                image='https://shorturl.at/pxAF1'
                                descripcion=""
                                size={2}
                                data={{}}
                                type='new_song'
                            />
                        }

                        {(type === "song" ? song_list : type === "album" ? album_list : artist_list).map((item, i) =>(
                            (filter === "" || filter(item)) &&
                            <SongCard 
                                key={i}
                                id={i}
                                title={item.name}
                                image={item.cover}
                                descripcion={item.singer}
                                size={2}
                                data={item}
                                type={type}
                            />
                        ))}

                    </Grid>
            </Grid>
        </Grid>

               

            </ThemeProvider>

        </Box>
      </>
    );
}
  
