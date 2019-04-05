chrome.contextMenus.create({
    title: "Support and help",
    contexts: ["page_action"],
    onclick: () => window.open("https://chromecopy.github.io/", "_new")
});
