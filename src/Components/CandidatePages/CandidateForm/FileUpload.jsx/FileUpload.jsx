import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Grid, Paper, Typography, ButtonGroup, Stack } from "@mui/material";
import PDF from "../../../../Assets/PDF.png";
import PNG from "../../../../Assets/ppng.png";
import JPG from "../../../../Assets/jjpg.png";
import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState } from "react";
import ProgressBar from "../../../Common/ProgressBar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { updateField } from "../../../ReduxSlice/CandidateDataSlice";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const FileUpload = ({ onValidate }) => {
  const { error } = useSelector((state) => state.CandidateData);

  const dispatch = useDispatch();
  const [progress, setProgress] = useState(10);
  const [file, setFile] = useState("");
  const handleFile = (e) => {
    const fileData = e.target.files[0];
    if (fileData) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64String = e.target.result;
        setFile(fileData.name);
        // Dispatch an action to save the encoded file in Redux
        dispatch(updateField({ field: "resume", value: base64String }));
      };

      reader.readAsDataURL(fileData);
    }
  };

  const handleDelete = () => {
    setFile("");
    dispatch(updateField({ field: "resume", value: "" }));
  };
  return (
    <Paper sx={{ p: "20px", mt: "10px" }}>
      <Typography textAlign="Center" variant="h5" mb={2}>
        Upload Resume
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        display="flex"
        justifyContent="center"
        columnGap="16px"
      >
        <img src={JPG} height="45px" />
        <img src={PDF} height="60px" />
        <img src={PNG} height="46px" />
      </Stack>
      <Stack display="flex" gap={1} mt={2}>
        {file.length > 0 ? (
          <Paper>
            <Stack p={2} direction="row" gap={2}>
              <DescriptionIcon />
              <Stack width="100%">
                <Stack direction="row" justifyContent="space-between">
                  <Typography>{file.slice(0, 20)}</Typography>
                  <Stack direction="row">
                    {progress == 100 && (
                      <DeleteIcon
                        sx={{ color: "red" }}
                        onClick={handleDelete}
                      />
                    )}
                  </Stack>
                </Stack>
                <ProgressBar progress={progress} setProgress={setProgress} />
              </Stack>
            </Stack>
          </Paper>
        ) : (
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            sx={{ justifyContent: "center" }}
          >
            <Button component="label">
              <AddIcon />
              <VisuallyHiddenInput
                type="file"
                // name="resume"
                onChange={(e) => handleFile(e)}
                // onBlur={() => onValidate(name, value)}
              />
            </Button>
            <Button component="label">
              Add file
              <VisuallyHiddenInput
                type="file"
                // name="resume"
                onChange={(e) => handleFile(e)}
                // onBlur={() => onValidate(name, value)}
              />
            </Button>
          </ButtonGroup>
        )}
        <Typography fontSize="12px" color="gray" textAlign="center">
          Accepted file types: JPEG,PDF,PNG,JPG
        </Typography>
      </Stack>
    </Paper>
  );
};

export default FileUpload;
