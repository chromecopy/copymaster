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
chrome.contextMenus.create({
    title: "Copy Master Site",
    contexts: ["page_action"],
    onclick: () => {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        }
        else {
            window.open(chrome.runtime.getURL('index.html'));
        }
    }
});
chrome.commands.onCommand.addListener((command) => {
    if (command == "slot1_clipboard")
        setClipboard(1);
    else if (command == "slot2_clipboard")
        setClipboard(2);
});
function setClipboard(slot) {
    chrome.storage.sync.get({
        clipboard: {
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
            8: "",
            9: ""
        }
    }, items => {
        input.value = items.clipboard[slot];
        input.select();
        input.setSelectionRange(0, input.value.length);
        document.execCommand("copy");
    });
}
const input = document.createElement("input");
document.body.appendChild(input);
//# sourceMappingURL=background.js.map