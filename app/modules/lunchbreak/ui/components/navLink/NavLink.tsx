import { FunctionComponent } from "react";
import { Button, SxProps } from "@mui/material";
import { East as EastIcon, West as WestIcon } from "@mui/icons-material";
import { StyledLink } from "./NavLink.styles";
import NavLinkProps from "./NavLink.types";

const NavLink: FunctionComponent<NavLinkProps> = ({ to, text, position }: NavLinkProps) => {
  const generateButtonIcon = (props?: Omit<SxProps, "fontSize">) => {
    switch (position) {
      case "right":
        return (
          <>
            {text} <EastIcon fontSize="small" sx={{ ...props, ml: 1 }} />
          </>
        );
      case "left":
        return (
          <>
            <WestIcon fontSize="small" sx={{ ...props, mr: 1 }} /> {text}
          </>
        );
      default:
        return text;
    }
  };

  return (
    <StyledLink to={to}>
      <Button
        disableRipple
        disableFocusRipple
        sx={(theme) => ({
          "&.MuiButtonBase-root:hover": {
            bgcolor: "transparent",
          },
          textTransform: "capitalize",
          color: "customTheme.neutral",
          float: `${position}`,
          mb: 8,
          [theme.breakpoints.down("sm")]: {
            mb: 4,
          },
          "&:hover": {
            "svg:first-of-type": {
              animation: "nudge 0.5s linear infinite alternate",
              "@keyframes nudge": {
                "0%": {
                  transform: "translate(4px, 0)",
                },
                "100%": {
                  transform: "translate(-4px, 0)",
                },
              },
            },
          },
        })}
      >
        {generateButtonIcon()}
      </Button>
    </StyledLink>
  );
};

export default NavLink;
