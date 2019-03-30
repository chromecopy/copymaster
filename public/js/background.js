/// <reference path="@types/chrome/index.d.ts"/>
chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
                conditions: [new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {},
                    })],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }]);
    });
});
//# sourceMappingURL=background.js.map