import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import TestData from "../Tests/TestData";
import { Stack, Grid, Paper, useMediaQuery } from "@mui/material";
import CustomDropDown from "../../Common/CustomDropDown";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function AssessmentStage2nd({ onFieldChange }) {
  const [addTestName, setAddTestName] = useState([]);
  const data = useSelector((state) => state.newAssessmentField);
  console.log(data);
  const [chipData, setChipData] = useState([
    { key: 0, label: "1st Test" },
    { key: 1, label: "2st Test" },
    { key: 2, label: "3st Test" },
    { key: 3, label: "4st Test" },
    { key: 4, label: "5st Test" },
  ]);
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleDelete = (chipToDelete) => () => {
    console.log(chipToDelete);
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const addTest = (name) => {
    setAddTestName([...addTestName, name]);
    onFieldChange("testData", addTestName);
  };
  const combinedData = chipData.map((data, index) => {
    if (addTestName.length > index) {
      return { key: data.key, label: addTestName[index] };
    } else {
      return data;
    }
  });
  console.log(combinedData);
  return (
    <div>
      <Stack direction="row" justifyContent="center" spacing={5} mb={10}>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 2,
            m: 0,
            width: 1200,
          }}
          component="ul"
        >
          {combinedData.map((data) => {
            let icon;

            return (
              <ListItem key={data.key}>
                <Box
                  component="span"
                  sx={{
                    p: 1.5,
                    border:
                      addTestName.length > data.key
                        ? "1px dashed white"
                        : "1px dashed grey",
                    mx: 3,
                    backgroundColor:
                      addTestName.length > data.key ? "gray" : "white",
                    ".css-9d4p3e-MuiButtonBase-root-MuiChip-root .MuiChip-deleteIcon":
                      {
                        color:
                          addTestName.length > data.key
                            ? "white"
                            : "rgba(25, 118, 210, 0.7)",
                      },
                  }}
                >
                  <Chip
                    icon={icon}
                    label={data.label}
                    onDelete={handleDelete(data)}
                    color="primary"
                    variant="outlined"
                    size="large"
                    sx={{
                      border: "none",
                      my: 1,
                      fontSize: 20,
                      color:
                        addTestName.length > data.key ? "white" : undefined,
                    }}
                  />
                </Box>
              </ListItem>
            );
          })}
        </Paper>
      </Stack>
      <Stack
        direction="row"
        justifyContent={onlySmallScreen ? "center" : "space-between"}
        mb={5}
        display="flex"
        flexWrap="wrap"
        gap={2}
      >
        <CustomDropDown
          background="white"
          label="Job role"
          width="300px"
          data={testType}
        />
        <CustomDropDown
          background="white"
          label="Test type"
          width="300px"
          data={testName}
        />
      </Stack>
      {/* test data */}
      <Stack direction="row" justifyContent="space-between">
        <TestData addButton={true} addTest={addTest} />
      </Stack>
    </div>
  );
}

export default AssessmentStage2nd;

const testType = [
  "My company Test",
  "Cognitive Test",
  "Personality & Culture",
  "Programming Skill",
];
const testName = [
  "My company Test",
  "Cognitive Test",
  "Personality & Culture",
  "Programming Skill",
];
