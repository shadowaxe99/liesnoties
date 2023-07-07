```javascript
// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'copyText') {
        copyToClipboard();
    } else if (request.message === 'pasteText') {
        pasteFromClipboard();
    }
});

// Function to copy text to clipboard
function copyToClipboard() {
    let textToCopy = document.getSelection().toString();
    navigator.clipboard.writeText(textToCopy).then(() => {
        console.log('Text copied to clipboard');
    }).catch(err => {
        console.error('Error in copying text: ', err);
    });
}

// Function to paste text from clipboard
function pasteFromClipboard() {
    navigator.clipboard.readText().then(text => {
        console.log('Pasted text: ', text);
    }).catch(err => {
        console.error('Error in pasting text: ', err);
    });
}
```