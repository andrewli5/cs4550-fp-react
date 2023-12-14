import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Button,
  Grid,
  InputAdornment,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { APP_NAME } from "../constants";
import { clearBrowserStorage, getCurrentUser } from "../client";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import * as client from "../client";
import Link from "@mui/material/Link";
import { useState } from "react";
import SadCat from "../assets/crying_cat_icon.png";
import Logo from "../assets/main_icon.png";
import ExpandingTextField from "../reusable/ExpandingTextField";
import MusicOn from "@mui/icons-material/MusicNote";
import MusicOff from "@mui/icons-material/MusicOff";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

export default function TopBar({ music, setMusic }) {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    const query = event.currentTarget.search.value;
    event.preventDefault();
    if (query.length === 0) {
      navigate("/search");
    } else {
      navigate(`/search/${query}`);
    }
  };

  const handleLogout = async () => {
    try {
      await client.signOut();
      clearBrowserStorage();
      setIsLogoutDialogOpen(false);
      window.location.reload();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <Box bgcolor="primary.main">
      <Toolbar>
        <img
          src={Logo}
          alt="logo"
          style={{
            width: 40,
            height: 40,
            marginRight: "10px",
          }}
        />
        <Typography variant="h3" noWrap>
          <Link style={{ color: "white", textDecoration: "none" }} href="/">
            {APP_NAME + "."}
          </Link>
        </Typography>
        <Box
          sx={{
            marginLeft: 5,
            flexGrow: 1,
            height: 80,
            display: { xs: "none", md: "flex", alignItems: "center" },
          }}
        >
          <Box
            component="form"
            action="search"
            onSubmit={handleSearch}
            noValidate
            sx={{ width: "100%" }}
          >
            <ExpandingTextField
              size="small"
              id="search"
              label="search cats..."
              variant="outlined"
              color="white"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon color="white" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <Dialog
          onClose={() => setIsLogoutDialogOpen(false)}
          open={isLogoutDialogOpen}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title" variant="h3">
            {"Log out?"}
          </DialogTitle>
          <Box textAlign={"center"}>
            <img src={SadCat} alt="sad cat" style={{ width: 40, height: 40 }} />
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <Button color="white" onClick={() => setIsLogoutDialogOpen(false)}>
              <Typography variant="h4" textAlign="center">
                No
              </Typography>
            </Button>
            <Button color="error" onClick={handleLogout}>
              <Typography variant="h4" textAlign="center">
                Yes
              </Typography>
            </Button>
          </div>
        </Dialog>
        <Box>
          <Grid container spacing={1}>
            <Grid item>
              <IconButton
                onClick={() => {
                  setMusic(!music);
                  localStorage.setItem("music", !music);
                }}
              >
                <Avatar
                  color="white"
                  sx={{
                    border: "1px solid white",
                    bgcolor: "primary.main",
                  }}
                >
                  {music ? (
                    <MusicOn color="white" />
                  ) : (
                    <MusicOff color="white" />
                  )}
                </Avatar>
              </IconButton>
            </Grid>
            {!getCurrentUser() ? (
              <>
                <Grid item>
                  <Button href="/signin" color="white" variant="outlined">
                    sign in
                  </Button>
                </Grid>
                <Grid item>
                  <Button href="/signup" color="tertiary" variant="contained">
                    sign up
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                {" "}
                <Grid item>
                  <Button href="/myprofile" color="white" variant="outlined">
                    {"hi, " + getCurrentUser().firstName + "!"}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="tertiary"
                    onClick={() => setIsLogoutDialogOpen(true)}
                  >
                    log out
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Toolbar>
    </Box>
  );
}
