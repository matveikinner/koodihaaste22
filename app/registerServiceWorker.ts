import { Workbox } from "workbox-window";

const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    const wb = new Workbox("serviceWorker.js");

    void wb
      .register()
      .then(() => {
        console.log("Service Worker registration completed");
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  }
};

export default registerServiceWorker;
