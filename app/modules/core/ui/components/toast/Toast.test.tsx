import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CoreProvider from "@core/ui/app/CoreProvider";
import { selectToastState } from "@core/ui/adapters/redux/toast/toast.selectors";
import Toast from "./Toast";

jest.mock("@core/ui/adapters/redux/toast/toast.selectors", () => ({
  selectToastState: jest.fn(),
}));

describe("Toast", () => {
  it("start without toast", () => {
    (selectToastState as jest.Mock).mockReturnValue({ isActive: false });

    const { container } = render(<Toast />, { wrapper: CoreProvider });

    expect(container).toBeEmptyDOMElement();
  });

  it("displays toast on state change", () => {
    (selectToastState as jest.Mock).mockReturnValue({ type: "success" });
    render(<Toast />, { wrapper: CoreProvider });

    const toast = screen.getByTestId("global-toast");

    expect(toast).toBeInTheDocument();
  });

  it("does not close on clickaway, closes on button click", async () => {
    (selectToastState as jest.Mock).mockReturnValue({ type: "success" });
    const { container } = render(<Toast />, { wrapper: CoreProvider });

    const toast = screen.getByTestId("global-toast");

    fireEvent.click(toast);

    expect(toast).toBeInTheDocument();

    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });
});
