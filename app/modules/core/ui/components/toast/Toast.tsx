import { FunctionComponent, SyntheticEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { selectToastState } from "@core/ui/adapters/redux/toast/toast.selectors";
import { resetToast } from "@core/ui/adapters/redux/toast/toast.slice";

const Toast: FunctionComponent = () => {
  const [open, setOpen] = useState(false);

  const toast = useSelector(selectToastState);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(true);
  }, [toast]);

  const handleClose = (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    dispatch(resetToast());
  };

  if (toast.type) {
    return (
      <Snackbar
        data-testid="global-toast"
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast.type} onClose={handleClose}>
          {toast.message || ""}
        </Alert>
      </Snackbar>
    );
  }
  return null;
};

export default Toast;
