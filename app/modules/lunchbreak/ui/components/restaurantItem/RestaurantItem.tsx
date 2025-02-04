import { FunctionComponent, MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Link, Stack, Typography } from "@mui/material";
import {
  LocationOn as LocationOnIcon,
  MenuBook as MenuBookIcon,
  ThumbDownOffAlt as ThumbDownOffAltIcon,
  ThumbUpOffAlt as ThumbUpOffAltIcon,
} from "@mui/icons-material";
import { AccordionExpandIcon } from "@lunchbreak/ui/components";
import RestaurantItemProps from "./RestaurantItem.types";

const RestaurantItem: FunctionComponent<RestaurantItemProps> = ({
  restaurant: { name, openingHours, votes, dishes },
  isSelected,
  onClick,
}: RestaurantItemProps) => {
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(false);

  const handleOnClickExpand = (event: MouseEvent<HTMLDivElement>) => setExpanded(!expanded);

  const formatOpeningHoursTime = (str: string): string => {
    if (str.includes(":")) return str;
    return `${str}:00`;
  };

  const formatOpeningHours = (str: string): string | undefined => {
    const arr = str.split("-");
    const [startTime, endTime] = arr;

    if (arr.length !== 2 && (!startTime || !endTime)) return undefined;

    return `${t([
      "lunchbreak:components.restaurantItem.openingHours.available",
      "error:translations.notExistingKey",
    ])} ${formatOpeningHoursTime(startTime)} - ${formatOpeningHoursTime(endTime)}`;
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "customTheme.main",
        borderRadius: "16px",
        mb: 2,
      }}
      role="listitem"
      data-testid="restaurantItem"
    >
      <Accordion
        disableGutters
        expanded={expanded}
        sx={{
          borderRadius: "16px !important",
          "& .MuiAccordionSummary-expandIconWrapper": {
            transform: "none !important",
          },
          "&:before": {
            display: "none",
            borderRadius: 2,
          },
        }}
        data-testid="restaurantItem-accordion"
        onClick={handleOnClickExpand}
      >
        <AccordionSummary
          id="restaurant-accordion"
          aria-controls="panel1a-content"
          expandIcon={<AccordionExpandIcon votes={votes} onClick={handleOnClickExpand} />}
        >
          <Link
            href={`https://www.google.com/maps?q=${name.replace(/\s/g, "+")}`}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "baseline",
              mt: "2px",
              color: "customTheme.main",
              mr: 2,
            }}
          >
            <LocationOnIcon fontSize="small" />
          </Link>
          <Stack>
            <Typography data-testid="restaurantItem-name" sx={{ color: "customTheme.main" }}>
              {name}
            </Typography>
            <Typography variant="small" sx={{ color: "customTheme.neutral" }}>
              {formatOpeningHours(openingHours) ||
                t([
                  "lunchbreak:components.restaurantItem.openingHours.unavailable",
                  "error:translations.notExistingKey",
                ])}
            </Typography>
            <Button
              data-testid="vote-button"
              variant="contained"
              size="small"
              startIcon={isSelected ? <ThumbDownOffAltIcon /> : <ThumbUpOffAltIcon />}
              sx={{
                width: "fit-content",
                px: 2,
                borderColor: "none",
                borderRadius: "16px",
                color: isSelected ? "customTheme.highlightRedAlt" : "customTheme.highlightGreenAlt",
                backgroundColor: isSelected ? "customTheme.highlightRed" : "customTheme.highlightGreen",
                mt: 1,
                "&:hover": {
                  color: isSelected ? "customTheme.highlightRedAlt" : "customTheme.highlightGreenAlt",
                  backgroundColor: isSelected ? "customTheme.highlightRed" : "customTheme.highlightGreen",
                },
              }}
              onClick={onClick}
            >
              {t([
                `lunchbreak:components.restaurantItem.isSelected.${isSelected.toString()}`,
                "error:translations.notExistingKey",
              ])}
            </Button>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          {dishes.length > 0 ? (
            dishes.map(({ name: dishName, price, attributes }) => (
              <Box key={dishName} sx={{ display: "flex", alignItems: "center", ml: 4 }}>
                <MenuBookIcon fontSize="small" sx={{ color: "customTheme.neutral", alignSelf: "baseline", mr: 2 }} />
                <Typography variant="small" sx={{ color: "customTheme.neutral" }}>
                  {dishName ||
                    t([
                      "lunchbreak:components.restaurantItem.dishNameUnavailable",
                      "error:translations.notExistingKey",
                    ])}{" "}
                  {attributes.length > 0 ? `(${attributes.toString()})` : ""}
                </Typography>
                <Typography variant="small" align="right" sx={{ color: "customTheme.neutral", ml: "auto" }}>
                  {price ||
                    t(["lunchbreak:components.restaurantItem.priceUnavailable", "error:translations.notExistingKey"])}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="small" sx={{ color: "customTheme.neutral", ml: 4 }}>
              {t(["lunchbreak:components.restaurantItem.menuUnavailable", "error:translations.notExistingKey"])}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
      {isSelected && (
        <Box
          sx={{
            width: "100%",
            py: 0.5,
            backgroundColor: "customTheme.main",
            borderRadius: "0 0 16px 16px",
          }}
          data-testid="restaurantItem-selection"
        >
          <Typography variant="small" sx={{ color: "white", ml: 2 }}>
            {t(["lunchbreak:components.restaurantItem.currentSelection", "error:translations.notExistingKey"])}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default RestaurantItem;
