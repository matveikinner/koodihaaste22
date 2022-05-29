import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { render } from "@mocks/testUtils";
import server from "@mocks/server";
import { getRestaurantsWithVote } from "@mocks/handlers";
import SearchPage from "./SearchPage";

describe("SearchPage", () => {
  it("displays navigation link", () => {
    render(<SearchPage />);

    const navLink = screen.getByRole("link");

    expect(navLink).toBeInTheDocument();
  });

  it("displays navigation link with correct icon", () => {
    render(<SearchPage />);

    const navLink = screen.getByRole("link");
    const navLinkIcon = within(navLink).getByTestId(/westicon/i);

    expect(navLinkIcon).toBeInTheDocument();
  });

  it("displays navigation link with correct path", () => {
    render(<SearchPage />);

    const navLink = screen.getByRole("link");

    expect(navLink).toHaveAttribute("href", "/");
  });

  it("starts without suggestions list, on change displays suggestions list", async () => {
    render(<SearchPage />);

    const input = screen.getByRole("combobox");
    const beforeList = screen.queryByRole("listbox");

    expect(beforeList).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "a" } });

    const afterList = await screen.findByRole("listbox");

    expect(afterList).toBeInTheDocument();
  });

  it("starts without restaurants, displays restaurants list", async () => {
    render(<SearchPage />);

    const restaurantList = screen.queryByTestId("restaurantItem");

    expect(restaurantList).not.toBeInTheDocument();

    const input = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "vantaa" } });

    const suggestionList = screen.getByRole("listbox");
    const suggestionListItem = within(suggestionList).getByText(/vantaa/i);

    fireEvent.click(suggestionListItem);

    const restaurantItem = await screen.findByTestId("restaurantItem");

    expect(restaurantItem).toBeInTheDocument();
  });

  it("starts without restaurant selection, selects restaurant upon click", async () => {
    render(<SearchPage />);

    const input = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "vantaa" } });

    const suggestionList = await screen.findByRole("listbox");
    const suggestionListItem = within(suggestionList).getByText(/vantaa/i);

    fireEvent.click(suggestionListItem);

    const restaurantItem = await screen.findByTestId("restaurantItem");

    const selectedRestaurantItemBefore = within(restaurantItem).queryByTestId("restaurantItem-selection");

    expect(selectedRestaurantItemBefore).not.toBeInTheDocument();

    const restaurantItemAccordion = within(restaurantItem).getByTestId("restaurantItem-accordion");

    fireEvent.click(restaurantItemAccordion);

    server.use(getRestaurantsWithVote);

    await waitFor(() => {
      const userSelectionRestaurant = screen.getByTestId("restaurantItem-selection");
      expect(userSelectionRestaurant).toBeInTheDocument();
    });
  });
});
