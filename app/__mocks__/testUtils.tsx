import { FunctionComponent, ReactElement, ReactNode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import CoreProvider from "@core/ui/app/CoreProvider";

const CoreProviderMock: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return (
    <CoreProvider>
      <BrowserRouter>
        <Suspense>{children}</Suspense>
      </BrowserRouter>
    </CoreProvider>
  );
};

const render = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  rtlRender(ui, { wrapper: CoreProviderMock, ...options });

export { render };
