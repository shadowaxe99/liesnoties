```javascript
document.addEventListener('DOMContentLoaded', loadSettings);

document.getElementById('saveButton').addEventListener('click', saveSettings);

function loadSettings() {
    chrome.storage.sync.get(['format', 'gptFrequency', 'gptType'], function(items) {
        document.getElementById('formatSelect').value = items.format || 'default';
        document.getElementById('gptFrequency').value = items.gptFrequency || 'medium';
        document.getElementById('gptType').value = items.gptType || 'contextual';
    });
}

function saveSettings() {
    let format = document.getElementById('formatSelect').value;
    let gptFrequency = document.getElementById('gptFrequency').value;
    let gptType = document.getElementById('gptType').value;

    chrome.storage.sync.set({
        'format': format,
        'gptFrequency': gptFrequency,
        'gptType': gptType
    }, function() {
        let status = document.getElementById('status');
        status.textContent = 'Settings saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 2000);
    });
}
```