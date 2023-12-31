import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { JobData } from "../../ReduxSlice/JobRoleSlice";
const pages = [
  { name: "My assessments", link: "/MyAssessment" },
  { name: "My candidates", link: "/MyCandidates" },
  { name: "Tests", link: "/Tests" },
  { name: "My Profile", link: "/MyProfile" },
];
const DrawerComp = () => {
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const changePage = (pages) => {
    if (pages === "Tests") {
      dispatch(JobData("All"));
    }
  };
  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{
          ".MuiDrawer-paper": {
            width: "50%",
          },
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: "15px",
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Link to="AssessmentPage">
              <Typography
                sx={{
                  color: "black",
                  fontSize: "22px",
                  fontWeight: "bold",
                }}
              >
                TestGorilla
              </Typography>
            </Link>
            <ArrowBackIcon onClick={() => setOpenDrawer(!openDrawer)} />
          </Stack>
        </Paper>
        <List>
          {pages.map(({ name, link }, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                <Link to={link}>
                  <ListItemText
                    primary={name}
                    sx={{
                      color: "black",
                    }}
                    onClick={() => {
                      changePage(name);
                      setOpenDrawer(!openDrawer);
                    }}
                  ></ListItemText>
                </Link>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "black", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="black" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
