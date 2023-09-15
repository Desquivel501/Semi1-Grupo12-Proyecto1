
import { ButtonGroup, Typography, Box, Container, Grid, Button, Paper, CssBaseline, Fab } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import MopedIcon from '@mui/icons-material/Moped';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LockIcon from '@mui/icons-material/Lock';
import { SongCard } from '../../components/SongCard/SongCard';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';

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


export const Section = (props) => {
    const {
      title,
      items,
      type
    } = props;

    const navigate = useNavigate();


    return (
        <Grid 
            item xs={12} 
            sx={{ width: "100%" }}
        >
            <Grid
                container
                // spacing={3}
                sx={{ width: "100%", pl:2}}
                alignItems="center"
                justifyContent="space-around"
                // xs={12} 
            > 
                <Grid 
                    item xs={8} 
                    sx={{ width: "100%" }}
                >
                    <Typography variant="details" noWrap component="div"  align="left" alignSelf={'left'} 
                        sx={{ border:0, pb:1, color: '#fff'}}>
                        {title} 
                    </Typography>
                </Grid>

                <Grid 
                    item xs={4} 
                    sx={{ width: "100%" }}
                >
                    <Typography variant="details_text" noWrap component="div"  align="right" alignSelf={'right'}
                        sx={{ border:0, pb:1, pr:3, color: '#fff'}}
                        onClick={() => navigate(type == "song" ? "/Songs" : type == "artist" ? "/Artist" : "/Albums")}
                        >
                        Ver Todo
                    </Typography>
                </Grid>

                <Grid 
                    item xs={12} 
                    sx={{ width: "100%", overflowX: 'auto', display: 'flex', flexDirection: 'row'}}
                    // { ...
                    //     window.innerWidth < 1500 ? {} : {justifyContent:'space-around'}
                    // }
                    // justifyContent={window.innerWidth < 1080 ? 'left' : 'space-around'}
                >
                    {items.map((item, i) => {
                        return i < 5 ?
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
                        : null
                    })}

                </Grid>
        </Grid>
    </Grid>
    );
}
  
