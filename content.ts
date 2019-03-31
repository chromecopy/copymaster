//used to check if values exist on document
const doc = <any>document;
let selectedText = "";
let clipboard = {
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

function updateClipboard() {
    chrome.storage.sync.get({
        clipboard: clipboard
    }, items => {
        clipboard = items.clipboard;
    });
}

function paste(slot: number): void {
    updateClipboard();
    document.execCommand("insertHTML", false, clipboard[slot]);
}

function copy(slot: number) {
    clipboard[slot] = selectedText;
    chrome.storage.sync.set({ clipboard: clipboard });
}

function updateSelectedText(): void {
    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    } else if (doc.selection && doc.selection.type != "Control") {
        selectedText = doc.selection.createRange().text;
    };
} setInterval(updateSelectedText, 100);

document.addEventListener("keydown", event => {
    if (event.altKey && event.shiftKey && event.code.includes("Digit")) {
        paste(parseInt(event.code.replace("Digit", "")));
    } else if (event.altKey && event.code.includes("Digit")) {
        copy(parseInt(event.code.replace("Digit", "")))
    }
})