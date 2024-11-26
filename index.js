document.addEventListener("DOMContentLoaded", () => {
    const profilesDropdown = document.getElementById("profiles");
    const fillButton = document.getElementById("fill");

    let profiles = [];

    // Load profiles from chrome.storage.local
    chrome.storage.local.get(["profiles"], (result) => {
        profiles = result.profiles || [];
        loadProfiles();
    });

    // Load profiles into the dropdown
    function loadProfiles() {
        profilesDropdown.innerHTML = ""; // Clear the dropdown
        profiles.forEach((profile, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = profile.name || `Profile ${index + 1}`;
            profilesDropdown.appendChild(option);
        });

        // Select the first profile if available
        if (profiles.length > 0) {
            profilesDropdown.value = 0;
        }
    }

    // Fill in the form with the selected profile's data
    fillButton.addEventListener("click", () => {
        const selectedIndex = profilesDropdown.value;
        if (selectedIndex === null || profiles.length === 0) {
            alert("No profiles available to fill the form!");
            return;
        }

        const selectedProfile = profiles[selectedIndex];
        const formFields = document.querySelectorAll("input, textarea");

        // Populate form fields based on profile data
        Object.keys(selectedProfile).forEach((key) => {
            const field = document.getElementById(`${key}Field`);
            if (field) {
                field.value = selectedProfile[key];
            }
        });

        alert("Form filled successfully!");
    });
});
