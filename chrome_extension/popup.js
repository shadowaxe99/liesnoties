```javascript
let gptService;
let speechRecognition;

document.addEventListener('DOMContentLoaded', function() {
    const textArea = document.getElementById('textArea');
    const voiceDictationButton = document.getElementById('voiceDictationButton');

    // Initialize GPT service
    gptService = new GptService();

    // Initialize Speech Recognition
    speechRecognition = new SpeechRecognition();
    speechRecognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        textArea.value = transcript;
    }

    voiceDictationButton.addEventListener('click', function() {
        if (speechRecognition.isListening) {
            stopVoiceDictation();
        } else {
            startVoiceDictation();
        }
    });

    textArea.addEventListener('input', function() {
        generateTextSuggestion(textArea.value);
    });
});

function startVoiceDictation() {
    speechRecognition.start();
    voiceDictationButton.textContent = 'Stop Dictation';
}

function stopVoiceDictation() {
    speechRecognition.stop();
    voiceDictationButton.textContent = 'Start Dictation';
}

function generateTextSuggestion(inputText) {
    gptService.generateSuggestion(inputText)
        .then(suggestion => {
            textArea.value = suggestion;
        });
}
```