import * as React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { 
    Box, 
    Drawer, 
    CssBaseline, 
    Toolbar, 
    List,
    Typography, 
    Divider,
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    ListItemButton,
    Collapse,
    AppBar 
} from "@mui/material";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import HomeIcon from '@mui/icons-material/Home';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import RadioIcon from '@mui/icons-material/Radio';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { sesionContext } from "../../context/SessionContext";

import { getData } from "../../api/api";

const drawerWidth = 300;

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
    }
  });

  const list_text = {
    fontSize: '1.1rem',
    color: '#fff',
    fontFamily: 'monospace',
    fontWeight: 500,
}


export default function CustomDrawer() {

    let location = useLocation();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [playlists, setPlaylists] = useState([]);

    const { user } = useContext(sesionContext);

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        console.log(user)
        if(user.id != null && user.id != "" && user.id != undefined){
            let endpoint = `/api/playlists/${user.id}`;
            getData({endpoint})
            .then(data => {
                if(data != null || data != undefined){
                    setPlaylists(data)
                } else {
                    setPlaylists([])
                }
            })
            .catch(err => console.log(err))
        }
    }, [])

    return (
        <>
            {
                location.pathname != "/Login" && location.pathname != "/Signup" &&
                <Box sx={{ display: 'flex'}}>
                    <CssBaseline />
                    <ThemeProvider theme={theme}>
                        
                        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: drawerWidth, left:0, background: '#1f1f1f' }} >
                            <Box
                                alignSelf={'center'}
                                component="img"
                                sx={{
                                    height: 140,
                                    mt:2,
                                    width: 140,
                                    mb:-1
                                }}
                                alt="Logo"
                                src="https://soundstream-semi1-g12.s3.us-east-2.amazonaws.com/logo_white.png"
                            />
                            
                            <Toolbar  align="center" sx={{justifyContent:'center', pb:1}} >
                                
                                <Typography variant="details" noWrap component="div"  align="center" alignSelf={'center'} 
                                    sx={{ border:0, pb:1, color: '#fff'}}>
                                    SoundStream 
                                </Typography>
                            </Toolbar>
                            <Divider sx={{ backgroundColor: '#8b8b8b', mx:2, borderBottomWidth: 2, mb:1}}/>
                        
                        </AppBar>

                        <Drawer
                            sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                                background: '#1f1f1f',
                                paddingTop:'230px',
                            },
                            
                            }}
                            variant="permanent"
                            anchor="left"
                        >
                            <Box  sx={{ overflow: 'auto', paddingBottom:'130px' }} >

                                <List>
                                    <ListItem key="inicio">
                                        <ListItemButton onClick={() => navigate("/")}>
                                            <ListItemIcon>
                                                <HomeIcon sx={{ color: '#fff', fontSize: '2rem'}}/>
                                            </ListItemIcon>
                                            <ListItemText primary="Inicio" sx={{ color: '#fff',}}
                                                primaryTypographyProps={list_text} />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem key="buscar">
                                        <ListItemButton onClick={() => navigate("/Search")}>
                                            <ListItemIcon>
                                                <SearchIcon sx={{ color: '#fff', fontSize: '2rem'}}/>
                                            </ListItemIcon>
                                            <ListItemText primary="Buscar" sx={{ color: '#fff',}}
                                                primaryTypographyProps={list_text} />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem key="playlists_menu">
                                        <ListItemButton onClick={handleClick}>
                                            <ListItemIcon>
                                            <PlaylistPlayIcon sx={{ color: '#fff', fontSize: '2rem'}}/>
                                            </ListItemIcon>
                                            <ListItemText primary="Playlists" sx={{ color: '#fff',}}
                                                primaryTypographyProps={list_text}/>
                                            {open ? <ExpandLess  sx={{ color: '#fff', fontSize: '2rem'}}/> : <ExpandMore  sx={{ color: '#fff', fontSize: '2rem'}}/>}
                                        </ListItemButton>
                                    </ListItem>


                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <List component="div" sx={{ border:0, pl:3 }}>

                                            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/New/Playlist")}>

                                                <ListItemIcon>
                                                <AddCircleIcon sx={{ color: '#fff', fontSize: '2rem'}}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Nueva Playlist" sx={{ color: '#fff', }}
                                                    primaryTypographyProps={list_text}/>
                                            </ListItemButton>

                                            {
                                                playlists.map((playlist) => (
                                                    <ListItemButton sx={{ pl: 4 }} onClick={() => navigate(`/Playlist/${playlist.id}`)} key={playlist.id}>
                                                        <ListItemIcon>
                                                        <FeaturedPlayListIcon sx={{ color: '#fff', fontSize: '2rem'}}/>
                                                        </ListItemIcon>
                                                        <ListItemText primary={playlist.name} sx={{ color: '#fff',}}
                                                            primaryTypographyProps={list_text}/>
                                                    </ListItemButton>
                                                ))
                                            }

                                        </List>
                                    </Collapse>


                                    <ListItem key="perfil">
                                        <ListItemButton   
                                        onClick={() => navigate("/Profile")}
                                        >
                                            <ListItemIcon>
                                                <PersonIcon sx={{ color: '#fff', fontSize: '2rem'}}/>
                                            </ListItemIcon>
                                            <ListItemText primary="Perfil" sx={{ color: '#fff',}}
                                                primaryTypographyProps={list_text}/>
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem key="favoritos">
                                        <ListItemButton   
                                            onClick={() => navigate("/Favoritos")}
                                        >
                                            <ListItemIcon>
                                                <FavoriteIcon sx={{ color: '#fff', fontSize: '2rem'}}/>
                                            </ListItemIcon>
                                            <ListItemText primary="Favoritos" sx={{ color: '#fff',}}
                                                primaryTypographyProps={list_text}/>
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem key="historico">
                                        <ListItemButton   
                                         onClick={() => navigate("/History")}
                                        >
                                            <ListItemIcon>
                                                <EqualizerIcon sx={{ color: '#fff', fontSize: '2rem'}}/>
                                            </ListItemIcon>
                                            <ListItemText primary="Historico" sx={{ color: '#fff',}}
                                                primaryTypographyProps={list_text}/>
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem key="radio">
                                        <ListItemButton     
                                        onClick={() => { navigate("/Radio") }}
                                        >
                                            <ListItemIcon>
                                                <RadioIcon sx={{ color: '#fff', fontSize: '2rem'}}/>
                                            </ListItemIcon>
                                            <ListItemText primary="Radio" sx={{ color: '#fff',}}
                                                primaryTypographyProps={list_text}/>
                                        </ListItemButton>
                                    </ListItem>

                                    {
                                        user.type == 0 &&
                                        <ListItem key="admin">
                                            <ListItemButton   
                                                onClick={() => navigate("/Admin")}  
                                            >
                                                <ListItemIcon>
                                                    <SupervisorAccountIcon sx={{ color: '#fff', fontSize: '2rem'}}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Administrador" sx={{ color: '#fff',}}
                                                    primaryTypographyProps={list_text}/>
                                            </ListItemButton>
                                        </ListItem>
                                    }



                                </List>
                            </Box>
                        </Drawer>
                    </ThemeProvider>
                </Box>
            }
        </>

        
    );
}