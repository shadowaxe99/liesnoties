```javascript
const axios = require('axios');

let gptService;

const initGptService = (apiKey) => {
  gptService = axios.create({
    baseURL: 'https://api.openai.com/v1/engines/davinci-codex/completions',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });
}

const generateTextSuggestion = async (prompt) => {
  try {
    const response = await gptService.post('', {
      prompt,
      max_tokens: 60
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating text suggestion:', error);
    return '';
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'generateSuggestion') {
    generateTextSuggestion(request.prompt)
      .then(suggestion => sendResponse({ suggestion }))
      .catch(error => sendResponse({ error: error.message }));

    return true;  // Keeps the message channel open for async response.
  }
});

module.exports = {
  initGptService,
  generateTextSuggestion
};
```