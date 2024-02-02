import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  styled,
  Typography,
} from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    // Apply custom styles to the dialog content if needed
  },
});

export const Confirmation = ({
  open,
  onClose,
  onConfirm,
  onCancel,
  message,
  title,
}) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6">{title || "Confirm Action"}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body1">{message}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<CancelIcon />} onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button startIcon={<CheckIcon />} onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};
