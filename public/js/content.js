let selectedText = "";
const clipboard = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: ""
};
function paste(slot) {
    document.execCommand("insertHTML", false, clipboard[slot]);
}
;
function copy(slot) {
    clipboard[slot] = selectedText;
    chrome.storage.sync.set({ clipboard: clipboard });
}
;
const doc = document;
function updateSelectedText() {
    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    }
    else if (doc.selection && doc.selection.type != "Control") {
        selectedText = doc.selection.createRange().text;
    }
    ;
}
;
setInterval(updateSelectedText, 100);
document.addEventListener("keydown", event => {
    if (event.altKey && event.shiftKey && event.code.includes("Digit")) {
        paste(parseInt(event.code.replace("Digit", "")));
    }
    else if (event.altKey && event.code.includes("Digit")) {
        copy(parseInt(event.code.replace("Digit", "")));
    }
    ;
});
//# sourceMappingURL=content.js.map