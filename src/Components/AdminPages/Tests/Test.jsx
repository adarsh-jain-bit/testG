import {
  Stack,
  Typography,
  Container,
  Grid,
  Button,
  Paper,
  InputBase,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import React from "react";
// import Input from "../../Common/Input";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import CustomDropDown from "../../Common/CustomDropDown";
import { Link } from "react-router-dom";
import TestData from "./TestData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JobData } from "../../ReduxSlice/JobRoleSlice";
const Test = () => {
  const Language = ["Hindi", "English", "Urdu", "German"];
  const JobRole = ["Backend", "Frontend", "Full Stack"];
  const TestType = ["Aptitude Test", "Typing Test", "Software Skills"];
  const onlySmallScreen = useMediaQuery("(min-width:500px)");
  const onlyLargeScreen = useMediaQuery("(min-width:1000px)");
  const buttonStyle = {
    backgroundColor: "#5C5470",
    color: "white",
    height: !onlySmallScreen ? "40px" : "50px",
    width: !onlySmallScreen ? "40px" : "250px",
    paddingRight: 0,
  };

  return (
    <Container>
      <Stack
        display="flex"
        justifyContent="space-between"
        direction="row"
        py={5} // Add padding top and bottom for spacing
      >
        <Typography variant="h6" fontWeight="700" fontFamily="sans-serif">
          My Assessments
        </Typography>
        <Stack display="flex" direction="row" gap={2}>
          <Link
            to="/NewAssessment"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              style={buttonStyle}
            >
              {!onlySmallScreen ? " " : "Create new Assessment"}
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        gap={4}
        mt={3}
        justifyContent="center"
        flexWrap={!onlyLargeScreen ? "wrap" : "nowrap"}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 2px",
            display: "flex",
            alignItems: "center",
            width: `${
              !onlyLargeScreen ? (!onlySmallScreen ? "100%" : "43%") : "500px"
            }`,
            height: 60,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, height: "5px" }}
            placeholder="Search Assessment"
            inputProps={{ "aria-label": "Search Assessment" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <CustomDropDown
          background="white"
          label="Language"
          data={Language}
          width={
            !onlyLargeScreen ? (!onlySmallScreen ? "100%" : "43%") : "500px"
          }
        />
        <CustomDropDown
          background="white"
          label="Job role"
          data={JobRole}
          width={
            !onlyLargeScreen ? (!onlySmallScreen ? "100%" : "43%") : "500px"
          }
        />
        <CustomDropDown
          background="white"
          label="Test type"
          data={TestType}
          width={
            !onlyLargeScreen ? (!onlySmallScreen ? "100%" : "43%") : "500px"
          }
        />
      </Stack>
      {/* test data  */}
      <TestData addButton={false} />
    </Container>
  );
};

export default Test;
