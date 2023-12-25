import React from "react";
import TestCard from "./TestCard";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

const TestData = ({ addButton, addTest }) => {
  const { JobRoleData } = useSelector((state) => state.jobRole);
  console.log(JobRoleData);
  return (
    <Grid container spacing={4} mt={3}>
      {JobRoleData.length > 1 &&
        JobRoleData?.map(({ name, desc }, index) => {
          return (
            <TestCard
              index={index}
              name={name}
              desc={desc}
              addButton={addButton}
              addTest={addTest}
            />
          );
        })}
    </Grid>
  );
};

export default TestData;
