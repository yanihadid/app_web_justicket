import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
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
    <AppBar position="static" elevation={0} 
    sx={{
      mb: 0,
      backgroundColor: "#000", 
      color: "white",
    }} >
      <Toolbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", 
          mr: "auto" 
        }}
      >
        <img
          src="/logo_t.png"
          alt="Justicket Logo"
          style={{ height: 50, marginBottom: 4 }}
        />
        <Typography
          sx={{
            fontFamily: "'Fugaz One', cursive",
            color: "white",
            fontSize: "1.1rem",
            letterSpacing: 1,
          }}
        >
          Justicket
        </Typography>
      </Box>


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
