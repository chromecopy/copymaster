const listEl = document.createElement("ul");
const listStyle = document.createElement("style");
let listType: 'copy' | 'cut' | 'paste';
let listOpen = false;

listEl.classList.add("copymastermenu");
listEl.innerHTML = `
<li id="slot1"><span class="slot"><span class="func"></span> 1</span><span class="text"></span></li>
<li id="slot2"><span class="slot"><span class="func"></span> 2</span><span class="text"></span></li>
<li id="slot3"><span class="slot"><span class="func"></span> 3</span><span class="text"></span></li>
<li id="slot4"><span class="slot"><span class="func"></span> 4</span><span class="text"></span></li>
<li id="slot5"><span class="slot"><span class="func"></span> 5</span><span class="text"></span></li>
<li id="slot6"><span class="slot"><span class="func"></span> 6</span><span class="text"></span></li>
<li id="slot7"><span class="slot"><span class="func"></span> 7</span><span class="text"></span></li>
<li id="slot8"><span class="slot"><span class="func"></span> 8</span><span class="text"></span></li>
<li id="slot9"><span class="slot"><span class="func"></span> 9</span><span class="text"></span></li>`;
listStyle.innerHTML = `
ul.copymastermenu{position:fixed;width:300px;height:auto;left:calc(50% - 150px);top:calc(50% - 234px);box-shadow: 0 0 7px 7px grey;background:#fff;padding:1em;
    border-radius:1em;list-style:none;margin:0}
ul.copymastermenu:not(.open){display:none !important}
ul.copymastermenu li{cursor: normal;padding:0 1em}
ul.copymastermenu li:hover{background: #eee;border-radius:1em;}
ul.copymastermenu li span.slot{pointer-events: none;font-size:.75em;color:#aaa}
ul.copymastermenu.copy li span.slot span.func:before{content:'copy'}
ul.copymastermenu.paste li span.slot span.func:before{content:'paste'}
ul.copymastermenu.cut li span.slot span.func:before{content:'cut'}
ul.copymastermenu li span.text{pointer-events:none;display:inline-block;width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}`;

document.body.appendChild(listEl);
document.body.appendChild(listStyle);

for (let i = 1; i < 9; ++i) {
    document.querySelector(`li#slot${i}`).addEventListener("mousedown", () => listActive(i));
}

function updateListEl() {
    chrome.storage.sync.get({
        clipboard: false
    }, items => {
        for (let i = 1; i < 9; ++i) {
            if (!items.clipboard[i])
                items.clipboard[i] = "..."
            listEl.querySelectorAll("li")[i - 1].querySelector("span.text").innerHTML = items.clipboard[i];
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.altKey && event.shiftKey && event.code.includes("Digit")) {
        pageClipboards[0].paste(parseInt(event.code.replace("Digit", "")));
    } else if (event.altKey && event.code.includes("Digit")) {
        pageClipboards[0].copy(parseInt(event.code.replace("Digit", "")))
    }

    if (event.ctrlKey && event.code == "KeyV") {
        event.preventDefault();
        toggleList(true, 'paste');
    }

    if (event.ctrlKey && event.code == "KeyC") {
        event.preventDefault();
        toggleList(true, 'copy');
    }

    if (event.ctrlKey && event.code == "KeyX") {
        event.preventDefault();
        toggleList(true, 'cut');
    }

    if (event.code == "Escape") {
        if (listOpen)
            listEl.classList.remove("open");
    }
});

function toggleList(open: boolean, type?: 'copy' | 'cut' | 'paste'): void {
    updateListEl();
    if (type)
        listType = type;
    if (open) {
        listOpen = true;
        listEl.classList.add("open");
        listEl.classList.add(type);
    } else {
        listOpen = false;
        listEl.classList.remove("open");
        listEl.classList.remove("copy");
        listEl.classList.remove("cut");
        listEl.classList.remove("paste");
    }
}

function listActive(index: number): void {
    if (listType == 'copy') {
        pageClipboards[0].copy(index);
    }
    else if (listType == 'paste') {
        pageClipboards[0].paste(index);
    }
    else if (listType == 'cut') {
        pageClipboards[0].cut(index);
    }
    toggleList(false);
}