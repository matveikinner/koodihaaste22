import { FunctionComponent, MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Autocomplete, CircularProgress, Grid, Skeleton, TextField, Typography } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { anyPass, isEmpty, isNil } from "ramda";
import { MetaStatusEnum } from "@core/domain/models";
import { selectRestaurantsState } from "@lunchbreak/ui/adapters/redux/restaurants/restaurants.selectors";
import { getRestaurantsRequest } from "@lunchbreak/ui/adapters/redux/restaurants/restaurants.slice";
import { selectVoteState } from "@lunchbreak/ui/adapters/redux/vote/vote.selectors";
import { NavLink, RestaurantItem } from "@lunchbreak/ui/components";
import { submitVoteRequest } from "@lunchbreak/ui/adapters/redux/vote/vote.slice";
import { getMunicipalitiesRequest } from "@lunchbreak/ui/adapters/redux/ymparisto/ymparisto.slice";
import { selectYmparistoState } from "@lunchbreak/ui/adapters/redux/ymparisto/ymparisto.selectors";

const SearchPage: FunctionComponent = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { alreadyVoted } = useSelector(selectVoteState);
  const { restaurants, meta: restaurantsMeta } = useSelector(selectRestaurantsState);
  const { municipalities, meta: municipalitiesMeta } = useSelector(selectYmparistoState);

  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getMunicipalitiesRequest());
  }, []);

  useEffect(() => {
    if (value) dispatch(getRestaurantsRequest(value));
  }, [value, alreadyVoted]);

  const isRestaurantsLoading = restaurantsMeta.status === MetaStatusEnum.PENDING;
  const isRestaurantsEmpty =
    !anyPass([isNil, isEmpty])(value) &&
    isEmpty(restaurants.filter((restaurant) => restaurant.city === value)) &&
    restaurantsMeta.status === MetaStatusEnum.SUCCEEDED;
  const isRestaurantsError = !isEmpty(value) && restaurantsMeta.status === MetaStatusEnum.FAILED;
  const isMunicipalitiesLoading = municipalitiesMeta.status === MetaStatusEnum.PENDING;
  const isMunicipalitiesError = municipalitiesMeta.status === MetaStatusEnum.FAILED;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOnClickRestaurantSelection = (restaurantId: string) => (event: MouseEvent<HTMLDivElement>) =>
    dispatch(submitVoteRequest(restaurantId));

  const getHelperText = () => {
    switch (true) {
      case isMunicipalitiesLoading:
        return (
          <Typography variant="link" sx={{ color: "customTheme.neutral" }}>
            {t(["lunchbreak:pages.search.helperText.loading", "error:translations.notExistingKey"])}
          </Typography>
        );
      case isMunicipalitiesError:
        return (
          <Typography variant="link" sx={{ color: "customTheme.error" }}>
            {t(["lunchbreak:pages.search.helperText.error.municipalities", "error:translations.notExistingKey"])}
          </Typography>
        );
      case isRestaurantsEmpty:
        return (
          <Typography variant="link" sx={{ color: "customTheme.neutral" }}>
            {t(["lunchbreak:pages.search.helperText.empty", "error:translations.notExistingKey"], { city: value })}
          </Typography>
        );
      case isRestaurantsError:
        return (
          <Typography variant="link" sx={{ color: "customTheme.error" }}>
            {t(["lunchbreak:pages.search.helperText.error.restaurants", "error:translations.notExistingKey"], {
              city: value,
            })}
          </Typography>
        );
      default:
        return "";
    }
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <NavLink
          to="/"
          text={t(["lunchbreak:pages.search.link", "error:translations.notExistingKey"])}
          position="left"
        />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <Autocomplete
          id="search-restaurants"
          autoComplete
          autoHighlight
          includeInputInList
          options={municipalities.map((option) => option?.name)}
          disabled={isMunicipalitiesLoading || isMunicipalitiesError}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={t(["lunchbreak:pages.search.input.placeholder", "error:translations.notExistingKey"])}
              variant="standard"
              helperText={getHelperText()}
            />
          )}
          onChange={(event: unknown, newValue: string | null) => setValue(newValue)}
          popupIcon={
            isMunicipalitiesLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : !anyPass([isNil, isEmpty])(value) ? null : (
              <SearchIcon fontSize="small" />
            )
          }
          sx={{ my: 2, width: "50%", minWidth: "311px", "& .MuiAutocomplete-popupIndicator": { transform: "none" } }}
        />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {isRestaurantsLoading ? (
          <>
            {[1, 2, 3].map((count) => (
              <Skeleton
                key={count}
                variant="rectangular"
                height={69}
                sx={{ borderRadius: "16px", mb: 2, width: "100%" }}
              />
            ))}
          </>
        ) : (
          restaurants
            .filter((restaurant) => restaurant.city === value)
            .map(({ id, ...rest }) => (
              <RestaurantItem
                key={id}
                restaurant={{ id, ...rest }}
                isSelected={id === alreadyVoted}
                onClick={handleOnClickRestaurantSelection(id)}
              />
            ))
        )}
      </Grid>
    </Grid>
  );
};

export default SearchPage;
