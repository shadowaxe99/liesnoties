```javascript
let speechRecognition;

if ('webkitSpeechRecognition' in window) {
  speechRecognition = new webkitSpeechRecognition();
} else {
  console.error('Web Speech API not supported in this browser');
}

speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.lang = 'en-US';

let finalTranscript = '';

speechRecognition.onresult = function(event) {
  let interimTranscript = '';

  for (let i = event.resultIndex; i < event.results.length; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript += transcript;
    }
  }

  document.getElementById('textArea').value = finalTranscript + ' ' + interimTranscript;
};

function startVoiceDictation() {
  finalTranscript = '';
  speechRecognition.start();
}

function stopVoiceDictation() {
  speechRecognition.stop();
}

export { startVoiceDictation, stopVoiceDictation };
```