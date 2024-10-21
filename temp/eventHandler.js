/** @format */

// /** @format */
/* global chrome */

window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data.type && event.data.type === "ramen-transaction") {
    chrome.runtime.sendMessage({
      type: "ramen-transaction",
      data: event.data.data,
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "ramen-response") {
    window.postMessage({ type: "ramen-response", data: request.data }, "*");

    sendResponse({ received: true });
  }

  return true;
});
