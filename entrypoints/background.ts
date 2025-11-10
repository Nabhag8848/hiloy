export default defineBackground(() => {
  browser.tabs.onActivated.addListener(async ({ tabId }) => {
    if (tabId) {
      const tab = await browser.tabs.get(tabId);
      const { url } = tab;

      if (!url?.includes("myntra.com")) {
        await browser.sidePanel.setOptions({
          path: "sidepanel.html",
          tabId,
          enabled: false,
        });
      }
    }
  });

  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    console.log("Tab updated", tabId, changeInfo, tab);

    if (tabId) {
      const tab = await browser.tabs.get(tabId);
      const { url } = tab;
      if (url?.includes("myntra.com")) {
        await browser.sidePanel.setOptions({
          path: "sidepanel.html",
          tabId,
          enabled: true,
        });

        await browser.sidePanel.setPanelBehavior({
          openPanelOnActionClick: true,
        });

        await browser.sidePanel.open({ tabId });
      } else {
        await browser.sidePanel.setOptions({
          path: "sidepanel.html",
          tabId,
          enabled: false,
        });
      }
    }
  });
});
