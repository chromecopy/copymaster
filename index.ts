document.querySelector('button#options').addEventListener("mousedown", () => {
	if (chrome.runtime.openOptionsPage) {
		chrome.runtime.openOptionsPage();
	} else {
		window.open(chrome.runtime.getURL('options.html'));
	}
});

const slotElements = {};
for (let i = 1; i < 9; ++i) {
	slotElements[i] = document.querySelector(`li#slot${i}`);
	slotElements[i].addEventListener("mousedown", () =>  pageClipboards[0].setDefaultClipboard(i));
}

function updateSlotElements(): void {
	chrome.storage.sync.get({
		clipboard: false
	}, items => {
		for (let i = 1; i < 9; ++i) {
			if (!items.clipboard[i])
				items.clipboard[i] = "..."
			slotElements[i].querySelector("span.text").innerHTML = items.clipboard[i];
		}
	});
} setInterval(updateSlotElements, 1000); updateSlotElements();