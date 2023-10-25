import React, { forwardRef } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Fade,
  IconButton,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

//open dialog box to confirm delete
export default function ConfirmBox({
  open,
  closeDialog,
  firstName,
  deleteFunction,
}) {
  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="md"
      scroll="body"
      onClose={closeDialog}
      onBackdropClick={closeDialog}
      TransitionComponent={Transition}
    >
      <DialogContent sx={{ px: 8, py: 6, position: "relative" }}>
        <IconButton
          size="medium"
          onClick={closeDialog}
          sx={{ position: "absolute", right: "1rem", top: "1rem" }}
        >
          X
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              {/* <Typography variant="h5">Delete {firstName}</Typography> */}

              <img
                width="100"
                height="100"
                src="https://cdn-icons-png.flaticon.com/128/8848/8848798.png"
              />

              <Typography variant="body1" fontWeight="fontWeightBold">
                <br />
                Are you sure you want to delete{" "}
                <Typography
                  fontStyle="italic"
                  fontWeight="fontWeightBold"
                  display="inline"
                >
                  "{firstName}"
                </Typography>{" "}
                ?
              </Typography>
              <Typography variant="body2 bold">
                This action cannot be undone.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
          >
            <Button
              onClick={closeDialog}
              size="large"
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={deleteFunction}
              size="large"
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
