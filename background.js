// chrome.runtime.onInstalled.addListener(() => {
//   const profiles = [
//     { name: "Zakir", surname: "Aghakishiyev", summary: "Experienced developer", location: "Baku" },
//     { name: "John", surname: "Doe", summary: "Project manager with 10 years of experience", location: "New York" }
//   ];
//   localStorage.setItem("profiles", JSON.stringify(profiles));
//   console.log("Profiles added to localStorage:", profiles);
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "getProfiles") {
//     const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
//     console.log("Sending profiles to popup:", profiles);
//     sendResponse(profiles);
//   }
// });
