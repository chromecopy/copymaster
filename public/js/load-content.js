const content = document.createElement("script");
content.innerHTML = `
const http = new XMLHttpRequest();
http.addEventListener("load", () => {});
http.open("GET","http://localhost:8887/content.js",true);
http.send();
`;
document.body.appendChild(content);
