/** @format */
/* global chrome */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "ramen-transaction") {
    chrome.action.openPopup();
    chrome.storage.local.set({ pageData: request.data });
  }

  if (request.type === "ramen-response") {
    // Dapatkan tab yang aktif
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (!tabs[0]?.id) {
        console.error("No active tab found");
        return;
      }

      try {
        // Kirim pesan ke content script dengan Promise
        const response = await chrome.tabs.sendMessage(tabs[0].id, {
          type: "ramen-response",
          data: request.data,
        });
        console.log("Message sent successfully:", response);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });
  }
  // Return true untuk async response
  return true;
});
