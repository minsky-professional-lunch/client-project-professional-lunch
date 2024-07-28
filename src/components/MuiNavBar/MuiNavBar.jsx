import * as React from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const settings = [
  "Home",
  "Profile",
  "Available Mentors",
  "Resources",
  "Admin",
  "Logout",
];
const loggedOut = ["Login", "Register", "About"];

export default function MuiNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const profiles = useSelector((store) => store.profileDetails);

  useEffect(() => {
    dispatch({ type: "FETCH_PROFILE_DETAILS" });
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navToSetting = (setting) => {
    if (setting === "Home") {
      history.push("/home");
    } else if (setting === "Profile") {
      history.push("/profile");
    } else if (setting === "Available Mentors") {
      history.push("/available-mentors");
    } else if (setting === "Resources") {
      history.push("/resources");
    } else if (setting === "Admin" && user.isAdmin) {
      history.push("/admin");
    } else if (setting === "Logout") {
      dispatch({ type: "LOGOUT", callback: () => history.push("/login") });
    }
  };

  const navToLog = (log) => {
    if (log === "Login") {
      history.push("/login");
    } else if (log === "Register") {
      history.push("/registration");
    } else if (log === "About") {
      history.push("/about");
    }
  };

  const filteredSettings = settings.filter(
    (setting) =>
      (setting !== "Admin" || user.isAdmin) &&
      (setting !== "Available Mentors" || !user.isMentor)
  );

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "#15A140", height: "75px", padding: "10px" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => history.push('/home')}
          >
            Professional L<span style={{ color: '#184025' }}>A</span>unch
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => history.push('/home')}
          >
            Professional L<span style={{ color: '#184025' }}>A</span>unch
          </Typography>
          {user.id && (
            <Box sx={{ display: "flex", flexGrow: 0 }}>
              <Tooltip title="Open Navbar">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={profiles.first_name}
                    src={profiles?.profile?.avatar}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {filteredSettings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      navToSetting(setting);
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          {!user.id && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src='./images/default-logo.png' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {loggedOut.map((log) => (
                  <MenuItem
                    key={log}
                    onClick={() => {
                      handleCloseUserMenu();
                      navToLog(log);
                    }}
                  >
                    <Typography textAlign="center">{log}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
