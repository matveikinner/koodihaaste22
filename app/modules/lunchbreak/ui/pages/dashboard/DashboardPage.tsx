import { FunctionComponent, MouseEvent, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { isSameDay } from "date-fns";
import { isEmpty } from "ramda";
import { Grid, Skeleton } from "@mui/material";
import useInterval from "@core/ui/hooks/useInterval";
import { MetaStatusEnum } from "@core/domain/models";
import { selectResultsState } from "@lunchbreak/ui/adapters/redux/results/results.selectors";
import { getResultsWithRestaurantsRequest } from "@lunchbreak/ui/adapters/redux/results/results.slice";
import { NavLink, RestaurantItem, Subtitle, Text } from "@lunchbreak/ui/components";
import { selectRestaurantsState } from "@lunchbreak/ui/adapters/redux/restaurants/restaurants.selectors";
import { submitVoteRequest } from "@lunchbreak/ui/adapters/redux/vote/vote.slice";
import { selectVoteState } from "@lunchbreak/ui/adapters/redux/vote/vote.selectors";

const DashboardPage: FunctionComponent = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { alreadyVoted } = useSelector(selectVoteState);
  const { results, meta: resultsMeta } = useSelector(selectResultsState);
  const { restaurants, meta: restaurantsMeta } = useSelector(selectRestaurantsState);

  // Long poll to retrieve possible updates to voting results as there is no better solution such as web sockets that
  // the server supports
  useInterval(() => {
    dispatch(getResultsWithRestaurantsRequest());
  }, 60 * 1000); // Update results every minute

  // Fetch results and restaurants for the user chosen date
  useEffect(() => {
    dispatch(getResultsWithRestaurantsRequest());
  }, [alreadyVoted]);

  // Returns restaurants which are in results and filters them by user chosen date
  const resultRestaurants = useMemo(
    () =>
      restaurants
        .filter(({ id }) =>
          results
            .find(({ date }) => isSameDay(new Date(date), new Date()))
            ?.results?.some((result) => result.restaurantid === id)
        )
        .sort((a, b) => b.votes - a.votes),
    [results, restaurants]
  );

  const isResultsLoading = resultsMeta.status === MetaStatusEnum.PENDING;

  // Check if restaurants have been retrieved and the result is empty
  const isResultRestaurantsEmpty = isEmpty(resultRestaurants) && restaurantsMeta.status === MetaStatusEnum.SUCCEEDED;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOnClickRestaurantSelection = (restaurantId: string) => (event: MouseEvent<HTMLButtonElement>) =>
    dispatch(submitVoteRequest(restaurantId));

  const getUserSelectionRestaurantName = () =>
    resultRestaurants.find((restaurant) => restaurant.id === alreadyVoted)?.name ||
    t(["lunchbreak:pages.dashboard.userSelection.text", "error:translations.notExistingKey"]);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <NavLink
          to="search"
          text={t(["lunchbreak:pages.dashboard.link", "error:translations.notExistingKey"])}
          position="right"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mb: 8,
          [theme.breakpoints.down("sm")]: {
            mb: 4,
          },
        })}
      >
        <Text
          text={t(["lunchbreak:pages.dashboard.userSelection.title", "error:translations.notExistingKey"])}
          typographyProps={{ align: "center" }}
        />
        <Subtitle text={getUserSelectionRestaurantName() || ""} />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Text
          text={t(["lunchbreak:pages.dashboard.coWorkerSelection.title", "error:translations.notExistingKey"])}
          typographyProps={{ align: "center" }}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {isResultsLoading ? (
          <>
            {[1, 2, 3].map((count) => (
              <Skeleton
                data-testid="skeleton"
                key={count}
                variant="rectangular"
                height={69}
                sx={{ borderRadius: "16px", mb: 2 }}
              />
            ))}
          </>
        ) : isResultRestaurantsEmpty ? (
          <Subtitle
            text={t(["lunchbreak:pages.dashboard.coWorkerSelection.text", "error:translations.notExistingKey"])}
          />
        ) : (
          resultRestaurants.map(({ id, ...rest }) => (
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

export default DashboardPage;
