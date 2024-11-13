let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
let activeProfile = null;

window.onload = function() {
    loadProfiles();
};

function loadProfiles() {
    const profilesDropdown = document.getElementById("profiles");
    profilesDropdown.innerHTML = "";  

    profiles.forEach((profile, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = profile.name;
        profilesDropdown.appendChild(option);
    });

    if (profiles.length > 0) {
        profilesDropdown.selectedIndex = 0;
        setActiveProfile(0);
    }
}

function setActiveProfile(index) {
    activeProfile = profiles[index];
    displayFields();
}

function createNewProfile() {
    const profileName = prompt("Enter a name for the new profile:");
    if (profileName) {
        const newProfile = {
            name: profileName,
            predefinedFields: {
                name: "",
                surname: "",
                summary: "",
                location: "",
                education: "",
                experience: "",
                skills: "",
                certifications: "",
                portfolio: ""
            },
            customFields: []
        };
        profiles.push(newProfile);
        localStorage.setItem("profiles", JSON.stringify(profiles));
        loadProfiles();
    }
}

