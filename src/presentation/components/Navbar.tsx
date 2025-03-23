import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    alert("Déconnexion réussie.");
    navigate("/");
  };
  return (
    <AppBar position="absolute" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "white" }}>
          Justicket 🎟️
        </Typography>
        <Button sx={{ color: "white" }} component={Link} to="/">Acceuil</Button>
        <Button sx={{ color: "white" }} component={Link} to="/concerts">Concerts</Button>
        {isLoggedIn && (
        <Button sx={{ color: "white" }} component={Link} to="/billets">Mes Billets</Button>
        )}
        {!isLoggedIn ? (
          <>
        <Button sx={{ color: "white" }} component={Link} to="/login">Se connecter</Button>
        <Button sx={{ color: "white" }} component={Link} to="/signup">Créer un compte</Button>
          </>
        ) : (
          <Button sx={{ color: "white" }} onClick={handleLogout}>Se déconnecter</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
