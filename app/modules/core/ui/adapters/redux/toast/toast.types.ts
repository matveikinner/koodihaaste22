import { AlertProps } from "@mui/material";

export interface ToastState {
  type: AlertProps["severity"];
  message: string;
}
