chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fillForm") {
    const profile = message.profile;

    if (profile) {
      document.querySelector("#name").value = profile.name || "";
      document.querySelector("#surname").value = profile.surname || "";
      document.querySelector("#summary").value = profile.summary || "";
      document.querySelector("#location").value = profile.location || "";
    } else {
      console.error("Profile data is missing.");
    }
  }
});
