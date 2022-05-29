import { MouseEvent } from "react";

interface AccordionExpandIconProps {
  votes: number;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export default AccordionExpandIconProps;
