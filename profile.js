document.addEventListener("DOMContentLoaded", () => {
    const profilesDropdown = document.getElementById("profiles");
    const newProfileButton = document.getElementById("newProfile");
    const deleteProfileButton = document.getElementById("deleteProfile");
    const saveButton = document.getElementById("saveData");
    const sendEmailButton = document.getElementById("sendEmail");

    let profiles = [];
    let activeProfileIndex = null;

    // Load profiles from chrome.storage.local
    chrome.storage.local.get(["profiles"], (result) => {
        profiles = result.profiles || [];
        loadProfiles();
    });

    // Load profiles into dropdown
    function loadProfiles() {
        profilesDropdown.innerHTML = ""; // Clear the dropdown
        profiles.forEach((profile, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = profile.name || `Profile ${index + 1}`;
            profilesDropdown.appendChild(option);
        });

        if (profiles.length > 0) {
            profilesDropdown.value = 0; // Set the first profile as default
            setActiveProfile(0);
        }
    }

    // Set the active profile and populate fields
    function setActiveProfile(index) {
        activeProfileIndex = parseInt(index, 10);
        const activeProfile = profiles[activeProfileIndex];
        document.getElementById("nameField").value = activeProfile.name || "";
        document.getElementById("surnameField").value = activeProfile.surname || "";
        document.getElementById("summaryField").value = activeProfile.summary || "";
        document.getElementById("locationField").value = activeProfile.location || "";
        document.getElementById("educationField").value = activeProfile.education || "";
        document.getElementById("experienceField").value = activeProfile.experience || "";
        document.getElementById("skillsField").value = activeProfile.skills || "";
        document.getElementById("certificationsField").value = activeProfile.certifications || "";
        document.getElementById("portfolioField").value = activeProfile.portfolio || "";
    }

    // Save the active profile's data
    saveButton.addEventListener("click", () => {
        if (activeProfileIndex === null) return;
        profiles[activeProfileIndex] = {
            name: document.getElementById("nameField").value,
            surname: document.getElementById("surnameField").value,
            summary: document.getElementById("summaryField").value,
            location: document.getElementById("locationField").value,
            education: document.getElementById("educationField").value,
            experience: document.getElementById("experienceField").value,
            skills: document.getElementById("skillsField").value,
            certifications: document.getElementById("certificationsField").value,
            portfolio: document.getElementById("portfolioField").value
        };
        chrome.storage.local.set({ profiles }, () => {
            alert("Profile saved successfully!");
        });
    });

    // Create a new profile
    newProfileButton.addEventListener("click", () => {
        const profileName = prompt("Enter a name for the new profile:");
        if (profileName) {
            const newProfile = {
                name: profileName,
                surname: "",
                summary: "",
                location: "",
                education: "",
                experience: "",
                skills: "",
                certifications: "",
                portfolio: ""
            };
            profiles.push(newProfile);
            chrome.storage.local.set({ profiles }, () => {
                loadProfiles();
                alert("New profile created successfully!");
            });
        }
    });

    // Delete the active profile
    deleteProfileButton.addEventListener("click", () => {
        if (activeProfileIndex === null) return;
        profiles.splice(activeProfileIndex, 1);
        chrome.storage.local.set({ profiles }, () => {
            loadProfiles();
            alert("Profile deleted successfully!");
        });
    });

    // Send the active profile's data via email
    sendEmailButton.addEventListener("click", () => {
        if (activeProfileIndex === null) return;
        const activeProfile = profiles[activeProfileIndex];
        const emailBody = `
            Name: ${activeProfile.name}
            Surname: ${activeProfile.surname}
            Summary: ${activeProfile.summary}
            Location: ${activeProfile.location}
            Education: ${activeProfile.education}
            Experience: ${activeProfile.experience}
            Skills: ${activeProfile.skills}
            Certifications: ${activeProfile.certifications}
            Portfolio: ${activeProfile.portfolio}
        `;
        const mailtoLink = `mailto:?subject=Profile Data&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
    });

    // Handle dropdown change to update active profile
    profilesDropdown.addEventListener("change", (event) => {
        setActiveProfile(event.target.value);
    });
});

document.getElementById('generate').addEventListener('click', runAI)


// import { GoogleGenerativeAI } from './AI_API.js';

// const genAI = new GoogleGenerativeAI('YOUR_API_KEY');

// // Use `genAI` in your code
// console.log(genAI);


async function runAI() {
    const genAI = new window.GoogleGenerativeAI(
        "AIzaSyBZeob5l70IU0BNo4Lj981_3nJ-Cs4P7GI"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = 'tell me about yourself';

    let retries = 3; // Number of retries
    let delay = 5000; // Delay between retries in milliseconds
    let aiOutput = ""; // Variable to store the AI response

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`Attempt ${attempt}...`);
            const result = await model.generateContent({ contents: [prompt] });
            aiOutput = result.response.candidates[0].content.parts[0].text; // Save the response to a variable
            console.log("Generated Response:", aiOutput);

            // Write the AI output to the textarea with id "coverLetter"
            document.getElementById("coverLetter").value = aiOutput;
            return; // Exit after a successful response
        } catch (error) {
            if (attempt < retries) {
                console.error(
                    `Error during API call (Attempt ${attempt}):`,
                    error.message
                );
                console.log(`Retrying in ${delay / 1000} seconds...`);
                await new Promise((res) => setTimeout(res, delay));
            } else {
                console.error("All retry attempts failed. Please try again later.");
                return;
            }
        }
    }
}
    