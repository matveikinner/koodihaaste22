import { clientsClaim, skipWaiting } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope;

// This clientsClaim() should be at the top level
// of your service worker, not inside of, e.g.,
// an event handler.
// See https://developer.chrome.com/docs/workbox/modules/workbox-core/#clients-claim
clientsClaim();

skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);
