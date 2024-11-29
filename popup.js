document.addEventListener("DOMContentLoaded", () => {

  
    const profileSelect = document.getElementById("profile");
    const applyButton = document.getElementById("applyProfile");
  
    // Fetch profiles from background.js
    chrome.runtime.sendMessage({ action: "getProfiles" }, (profiles) => {
      if (profiles && profiles.length > 0) {
        console.log("Profiles received:", profiles);
        profiles.forEach((profile, index) => {
          const option = document.createElement("option");
          option.value = index;
          option.textContent = `${profile.name} ${profile.surname}`;
          profileSelect.appendChild(option);
        });
      } else {
        console.error("No profiles found or error fetching profiles.");
      }
    });
  
    // Apply the selected profile
    applyButton.addEventListener("click", () => {
      const selectedIndex = profileSelect.value;
  
      chrome.runtime.sendMessage({ action: "getProfiles" }, (profiles) => {
        const selectedProfile = profiles[selectedIndex];
        chrome.runtime.sendMessage({ action: "fillForm", profile: selectedProfile });
      });
    });
  });
  


  