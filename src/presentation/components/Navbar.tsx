import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="absolute" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Justicket 🎟️
        </Typography>
        <Button color="inherit" component={Link} to="/concerts">Concerts</Button>
        <Button color="inherit" component={Link} to="/billets">Mes Billets</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
