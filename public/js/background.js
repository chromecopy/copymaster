chrome.contextMenus.create({
    title: "Support and help",
    contexts: ["browser_action"],
    onclick: () => window.open("https://chromecopy.github.io/", "_new")
});
