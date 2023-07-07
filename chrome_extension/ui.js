```javascript
document.addEventListener('DOMContentLoaded', function() {
    const textArea = document.getElementById('textArea');
    const formatSelect = document.getElementById('formatSelect');
    const voiceDictationButton = document.getElementById('voiceDictationButton');

    // Load user settings on startup
    chrome.runtime.sendMessage({method: "loadSettings"}, function(response) {
        formatSelect.value = response.format;
    });

    // Listen for changes in format selection
    formatSelect.addEventListener('change', function() {
        chrome.runtime.sendMessage({method: "saveSettings", format: formatSelect.value});
    });

    // Listen for voice dictation button click
    voiceDictationButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({method: "startVoiceDictation"});
    });

    // Listen for messages from background script or other parts of the extension
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.method === "stopVoiceDictation") {
            // Handle stopping voice dictation
        } else if (request.method === "generateSuggestion") {
            // Handle text suggestion
            textArea.value += request.suggestion;
        }
    });
});
```