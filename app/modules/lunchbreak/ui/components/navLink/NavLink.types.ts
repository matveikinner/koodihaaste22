import { LinkProps } from "react-router-dom";

interface NavLinkProps {
  to: LinkProps["to"];
  text: string;
  position: "right" | "left";
}

export default NavLinkProps;
