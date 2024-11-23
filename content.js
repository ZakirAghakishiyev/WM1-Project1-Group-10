chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fillForm") {
    // Example: Fill out forms based on the user's profile data
    const profile = message.profile; // Passed from the popup
    document.querySelector("#name").value = profile.name;
    document.querySelector("#surname").value = profile.surname;
    // Continue filling other fields...
  }
});
