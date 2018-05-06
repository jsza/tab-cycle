var extensionState = {"cycling": false}


function next_tab() {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    // Sort tabs according to their index in the window.
    tabs.sort((a, b) => {
      if (a.index < b.index) {
        return 1
      }
      else {
        return -1
      }
      // return a.index < b.index;
    });
    console.log(tabs)
    let activeIndex = tabs.findIndex((tab) => { return tab.active; });
    let lastTab = tabs.length - 1;
    let newIndex = -1;
    // if (command === 'flip-tabs-forward')
    newIndex = activeIndex === 0 ? lastTab : activeIndex - 1;
    // else  // 'flip-tabs-backwards'
    //   newIndex = activeIndex === lastTab ? 0 : activeIndex + 1;
    chrome.tabs.update(tabs[newIndex].id, {active: true, highlighted: true});
  });
};


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.action === "begin_cycle")
      sendResponse(true);
  });
