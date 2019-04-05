let selectedText = "";
let selectedElement;
const input = document.createElement("input");
input.setAttribute("style", "position:absolute;left:-9999999px");
document.body.appendChild(input);
/**
 * Cosutom clipboards
 */
const pageClipboards = [];
/**
 * Used for saving text to costum clipboard
 */
class PageClipboard {
    constructor() {
        this.text = {
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
            8: "",
            9: "",
        };
    }
    /**
     * Used to insert costum clipboard text
     * @param slot which cliboard slot to paste
     */
    paste(slot) {
        this.updateClipboard();
        const active = document.activeElement;
        if (active instanceof HTMLTextAreaElement || active instanceof HTMLInputElement) {
            document.execCommand("insertText", false, this.text[slot]);
            selectedElement.focus();
            selectedElement.setSelectionRange(selectedElement.selectionStart, selectedElement.selectionEnd);
            //TODO: BUG: remove timeout
            // setTimeout(() => {
            //     selectedElement.focus();
            //     selectedElement.setSelectionRange(selectedElement.selectionStart, selectedElement.selectionEnd);
            // });
        }
    }
    /**
     * Used to save text to costum slot clipboard
     * @param slot which cliboard slot to copy
     */
    copy(slot) {
        if (selectedText) {
            this.text[slot] = selectedText;
            chrome.storage.sync.set({ clipboard: this.text });
        }
        else {
            this.setDefaultClipboard(slot);
        }
    }
    /**
     * Used to save text to costum slot clipboard
     * @param slot which cliboard slot to copy
     */
    cut(slot) {
        if (selectedText) {
            this.text[slot] = selectedText;
            window.getSelection().empty();
            chrome.storage.sync.set({ clipboard: this.text });
        }
    }
    static updateSelectedText() {
        if (window.getSelection) {
            selectedText = window.getSelection().toString();
        }
        else if (document.selection && document.selection.type != "Control") {
            selectedText = document.selection.createRange().text;
        }
        ;
        if (document.activeElement instanceof HTMLTextAreaElement || document.activeElement instanceof HTMLInputElement) {
            selectedElement = document.activeElement;
        }
    }
    /**
     * Updates the clipboard — in case the cliboard has been changed
     * @param slot which cliboard slot to copy
     */
    updateClipboard() {
        chrome.storage.sync.get({
            clipboard: this.text
        }, items => {
            this.text = items.clipboard;
        });
    }
    /**
     * Sets the text on **slot** to default cliboard — Ctrl + V
     * @param slot which cliboard slot to copy
     */
    setDefaultClipboard(slot) {
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
}
//set and export pageClipboard
pageClipboards.push(new PageClipboard);
chrome.storage.sync.set({ pageClipboards: pageClipboards });
//updates the selected text
setInterval(PageClipboard.updateSelectedText, 50);
PageClipboard.updateSelectedText();
