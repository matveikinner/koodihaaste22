import { render, screen } from "@testing-library/react";
import CoreProvider from "@core/ui/app/CoreProvider";
import Loader from "./Loader";
import { selectLoaderState } from "@core/ui/adapters/redux/loader/loader.selectors";

jest.mock("@core/ui/adapters/redux/loader/loader.selectors", () => ({
  selectLoaderState: jest.fn(),
}));

describe("Loader", () => {
  it("starts without loader", () => {
    (selectLoaderState as jest.Mock).mockReturnValue({ isActive: false });

    const { container } = render(<Loader />, { wrapper: CoreProvider });

    expect(container).toBeEmptyDOMElement();
  });

  it("displays loader on state change", () => {
    (selectLoaderState as jest.Mock).mockReturnValue({ isActive: true });

    render(<Loader />, { wrapper: CoreProvider });

    const loader = screen.getByTestId("global-loader");

    expect(loader).toBeInTheDocument();
  });
});
