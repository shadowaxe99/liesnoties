```javascript
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "id": "copyText",
        "title": "Copy Text",
        "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "copyText") {
        chrome.tabs.sendMessage(tab.id, {type: "copyText", text: info.selectionText});
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "copyText") {
        copyToClipboard(request.text);
    } else if (request.type === "pasteText") {
        pasteFromClipboard();
    } else if (request.type === "generateSuggestion") {
        generateTextSuggestion();
    }
});

function copyToClipboard(text) {
    var input = document.createElement('textarea');
    document.body.appendChild(input);
    input.value = text;
    input.focus();
    input.select();
    document.execCommand('Copy');
    input.remove();
}

function pasteFromClipboard() {
    var input = document.createElement('textarea');
    document.body.appendChild(input);
    input.focus();
    document.execCommand('Paste');
    var text = input.value;
    input.remove();
    return text;
}

function generateTextSuggestion() {
    // This function will be implemented in gptIntegration.js
}
```