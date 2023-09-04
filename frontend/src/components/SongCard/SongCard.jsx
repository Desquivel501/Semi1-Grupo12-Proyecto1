import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

export const SongCard = (props) => {
  const {
    image,
    id,
    title,
    descripcion,
    onSelect,
    size,
  } = props;

  const handleSelect = () => {
    onSelect(id);
  };

  const theme = useTheme();

  return (
    <Grid
      item
      xs={size}
      sx={{
        border: 0,
        my: 1,
        mx: 1,
        py:2,
        pl: '0px !important',
        backgroundColor: '#1f1f1f',
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
          sx={{ border: 0 }}
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