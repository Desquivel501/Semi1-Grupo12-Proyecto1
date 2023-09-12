import React, { useState, useEffect } from 'react';
import {
    Link,
    Routes,
    Route,
    useParams,
    useNavigate,
} from 'react-router-dom'
import { ColorExtractor } from 'react-color-extractor'

import { ButtonGroup, Typography, Box, Container, Grid, Button, Paper, CssBaseline, Divider, IconButton, TextField } from '@mui/material';
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
        platlist = false,
        admin = true,
        edit = true,
    } = props;

    const { id } = useParams();

    const [isHovered, setIsHovered] = useState(0);
    const [color, setColor] = useState('#626262');
    const [count, setCount] = useState(0);
    const [album, setAlbum] = useState({
        id: 0,
        name: 'Test',
        cover:
            'https://soundstream-semi1-g12.s3.us-east-2.amazonaws.com/no_album.jpg',
    });
    const [preview, setPreview] = useState(album.cover);

    useEffect(() => {
        console.log(id)
        for(var i = 0; i < album_list.length; i++){
            if(album_list[i].id == id){
                setAlbum(album_list[i])
                setPreview(album_list[i].cover)
                break;
            }
        }
        setCount(count + 1);
     
    },[]);

    const removeSong = (id) => {
        for(var i = 0; i < rows.length; i++){
            if(rows[i].no == id){
                rows.splice(i, 1);
                break;
            }
        }
        setCount(count + 1);
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

    const handleSubmit  = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append('id', album.id);
        console.log(data)
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
                                {platlist ? 'Playlist' : 'Album'}
                            </Typography>

                            {/* <Typography
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
                            </Typography> */}

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
                                !platlist &&
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
                                        Artista
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

                            {
                                platlist &&
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
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar nibh vel enim gravida sodales. Aliquam erat volutpat. Fusce eget est ante. Morbi vitae ante quis lacus imperdiet tristique id vel orci. Aliquam congue purus libero, eget pellentesque odio efficitur a. Duis tincidunt cursus finibus. Sed egestas erat id elit finibus mollis. 
                                </Typography>
                            }
                            <Grid
                                container
                                sx={{ width: "100%", ml:2, mt:5}}
                                alignItems="bottom"
                                justifyContent="right"
                            >
                                <Button 
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
                                    Guardar Cambios
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


                    {rows.map((row, i) => (
                        <Grid item xs={12} align='left' display='flex' key={i+1}
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
                                    {row.title}
                                </Typography>
                                
                            </Grid>

                            <Grid
                                item
                                xs={.5}
                                alignItems="top"
                                justifyContent="right"
                            >
                                <IconButton key={"remove"+ i+1}
                                    onClick={() => removeSong(row.no)}
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
                             <input type="file" name="image" sx={{ align:'center' }}
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


               

            </ThemeProvider>

        </Box>
      </>
    );
}
  
