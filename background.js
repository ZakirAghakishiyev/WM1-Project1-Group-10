//OpenAI. (2024, November 4). ChatGPT (Oct 2023 version) [Large language model]. https://chat.openai.com/chat

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getProfileData') {
      const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
      sendResponse(profiles);
    }
  });
  