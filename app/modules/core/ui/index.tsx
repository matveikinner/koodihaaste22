import "reflect-metadata";
import { createRoot } from "react-dom/client";
import CoreProvider from "./app/CoreProvider";
import CoreModule from "./app/CoreModule";

import "./frameworks/i18next/i18next.config";

import registerServiceWorker from "../../../registerServiceWorker";

const container = document.getElementById("root");

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <CoreProvider>
    <CoreModule />
  </CoreProvider>
);

// There are several issues when running with Webpack --watch flag https://github.com/GoogleChrome/workbox/issues/1790
if (process.env.NODE_ENV !== "development") registerServiceWorker();
