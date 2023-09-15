import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Typography, Fab, Paper } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useState, useEffect, useRef } from 'react'
import {
  useNavigate,
} from 'react-router-dom'

export const SongCard = (props) => {
  const ref = useRef(null)

  const navigate = useNavigate();

  const {
    image,
    id,
    title,
    descripcion,
    size,
    data,
    type
  } = props;

  const handleSelect = () => {
    console.log(type);
    if(type == "song"){
      const route = `/Song/${data.id}`;
      navigate(route);
    }

    if(type == "album"){
      const route = `/Album/${data.id}`;
      navigate(route);
    }

    if(type == "artist"){
      const route = `/Artist/${data.id}`;
      navigate(route);
    }

    if(type == "playlist"){
      const route = `/Playlist/${data.id}`;
      navigate(route);
    }

    if(type == "new_song"){
      const route = `/New/Song`;
      navigate(route);
    }

    if(type == "new_album"){
      const route = `/New/Album`;
      navigate(route);
    }

    if(type == "new_artist"){
      const route = `/New/Artist`;
      navigate(route);
    }
  };

  const theme = useTheme();

  return (
    <Grid
      ref={ref}
      item
      xs={size}
      sx={{
        border: 0,
        my: 1,
        mx: 1,
        py:2,
        pl: '0px !important',
        backgroundColor: '#1f1f1f',
        cursor: 'pointer',
        "&:hover": {
          backgroundColor: "#626262",
        },
      }}
      minWidth='250px'
      component={Paper}
      elevation={6}
      onClick={handleSelect}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ border: 0 }}
      >
        <Grid
          item
          xs={12}
          sx={{ border: 0, pb:1 }}
          textAlign='center'
        >
          <Box
                component="img"
                sx={{
                  height: "auto",
                  maxWidth: "80%",
                }}
                alt="Logo"
                src={image}
            />
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ border: 0, px:1.5 }}
        >
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
                {title}
            </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ border: 0,  px:1.5 }}
        >
            <Typography
                variant="h6"
                component="h6"
                align="left"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 200,
                  color: "#bbb",
                }}
              >
                {descripcion}
            </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};