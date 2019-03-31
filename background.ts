chrome.contextMenus.create({
	title: "Copy Master Site",
	contexts: ["page_action"],
	onclick: () => window.open("https://chromecopy.github.io/", "_new")
});

chrome.commands.onCommand.addListener((command: "slot1_clipboard" | "slot2_clipboard") => {
	if (command == "slot1_clipboard")
		setClipboard(1);
	else if (command == "slot2_clipboard")
		setClipboard(2);
});

function setClipboard(slot: number): void {
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
	})
}

const input = document.createElement("input");
document.body.appendChild(input);