import {
  fireEvent,
  queryAllByTestId,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { render } from "@mocks/testUtils";
import DashboardPage from "./DashboardPage";
import server from "@mocks/server";
import { getRestaurantsWithVote } from "@mocks/handlers";

describe("DashboardPage", () => {
  it("displays navigation link", () => {
    render(<DashboardPage />);

    const navLink = screen.getByRole("link");

    expect(navLink).toBeInTheDocument();
  });

  it("displays navigation link with correct icon", () => {
    render(<DashboardPage />);

    const navLink = screen.getByRole("link");
    const navLinkIcon = within(navLink).getByTestId(/easticon/i);

    expect(navLinkIcon).toBeInTheDocument();
  });

  it("displays navigation link with correct path", () => {
    render(<DashboardPage />);

    const navLink = screen.getByRole("link");

    expect(navLink).toHaveAttribute("href", "/search");
  });

  it("displays user selection title", () => {
    render(<DashboardPage />);

    const userSelectionTitle = screen.getByText(/your pick/i);

    expect(userSelectionTitle).toBeInTheDocument();
  });

  it("displays no selection, then displays user selection restaurant", async () => {
    render(<DashboardPage />);

    const userSelectionRestaurantDefault = screen.getByText(/your co-workers are missing your vote!/i);

    expect(userSelectionRestaurantDefault).toBeInTheDocument();

    const restaurantItemAccordion = await screen.findByTestId("restaurantItem-accordion");

    fireEvent.click(restaurantItemAccordion);

    await waitFor(() => {
      const userSelectionRestaurant = screen.getByTestId("subtitle");
      expect(userSelectionRestaurant).toHaveTextContent(/loru vantaa/i);
    });
  });

  it("displays restaurants list upon results", async () => {
    render(<DashboardPage />);

    const restaurantItem = await screen.findByTestId("restaurantItem-name");

    expect(restaurantItem).toHaveTextContent(/loru vantaa/i);
  });

  it("there is no user restaurant selection by default", async () => {
    render(<DashboardPage />);

    const restaurantItem = await screen.findByTestId("restaurantItem");

    const boxElement = within(restaurantItem).queryByTestId("restaurantItem-selection");

    await waitFor(() => {
      expect(boxElement).not.toBeInTheDocument();
    });
  });

  it("renders user restaurant selection on click", async () => {
    render(<DashboardPage />);

    const restaurantItemAccordion = await screen.findByTestId("restaurantItem-accordion");

    fireEvent.click(restaurantItemAccordion);

    server.use(getRestaurantsWithVote);

    await waitFor(() => {
      const userSelectionRestaurant = screen.getByTestId("restaurantItem-selection");
      expect(userSelectionRestaurant).toBeInTheDocument();
    });
  });
});
