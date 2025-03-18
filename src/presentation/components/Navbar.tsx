import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="absolute" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "white" }}>
          Justicket 🎟️
        </Typography>
        <Button sx={{ color: "white" }} component={Link} to="/">Acceuil</Button>
        <Button sx={{ color: "white" }} component={Link} to="/concerts">Concerts</Button>
        <Button sx={{ color: "white" }} component={Link} to="/billets">Mes Billets</Button>
        <Button sx={{ color: "white" }} component={Link} to="/login">Se connecter</Button>
        <Button sx={{ color: "white" }} component={Link} to="/signup">Créer un compte</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
