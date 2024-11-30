// https://chatgpt.com/share/674b2f1f-d424-8004-b684-d17cab97e2de

document.addEventListener("DOMContentLoaded", () => {
    const profilesDropdown = document.getElementById("profiles");
    const newProfileButton = document.getElementById("newProfile");
    const deleteProfileButton = document.getElementById("deleteProfile");
    const saveButton = document.getElementById("saveData");
    const sendEmailButton = document.getElementById("sendEmail");

    let profiles = [];
    let activeProfileIndex = null;

    chrome.storage.local.get(["profiles"], (result) => {
        profiles = result.profiles || [];
        loadProfiles();
    });

    // Load profiles into dropdown
    function loadProfiles() {
        profilesDropdown.innerHTML = "";
        const option1 = document.createElement("option");
        option1.value = -1;
        option1.textContent = "Select Profile..."
        profilesDropdown.appendChild(option1);

        profiles.forEach((profile, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = profile.name || `Profile ${index + 1}`;
            profilesDropdown.appendChild(option);
        });

        if (profiles.length > 0) {
            profilesDropdown.value = -1;
            setActiveProfile(-1);
        }
    }

    let activeProfile
    function setActiveProfile(index) {
        if (index == -1) {
            console.log('dds')
            document.getElementById("linkedin").value = "";
            document.getElementById("nameField").value = "";
            document.getElementById("surnameField").value = "";
            document.getElementById("birthday").value = "";
            document.getElementById("phoneNumber").value = "";
            document.getElementById("email").value = "";
            document.getElementById("summaryField").value = "";
            document.getElementById("locationField").value = "";
            document.getElementById("educationField").value = "";
            document.getElementById("experienceField").value = "";
            document.getElementById("skillsField").value = "";
            document.getElementById("certificationsField").value = "";
            document.getElementById("coverLetter").value = "";
            document.getElementById("portfolioField").value = "";
            return;
        }
        activeProfileIndex = parseInt(index, 10);
        activeProfile = profiles[activeProfileIndex];
        document.getElementById("linkedin").value = activeProfile.linkedin || "";
        document.getElementById("nameField").value = activeProfile.name || "";
        document.getElementById("surnameField").value = activeProfile.surname || "";
        document.getElementById("birthday").value = activeProfile.birthday || "";
        document.getElementById("phoneNumber").value = activeProfile.phoneNumber || "";
        document.getElementById("email").value = activeProfile.email || "";
        document.getElementById("summaryField").value = activeProfile.summary || "";
        document.getElementById("locationField").value = activeProfile.location || "";
        document.getElementById("educationField").value = activeProfile.education || "";
        document.getElementById("experienceField").value = activeProfile.experience || "";
        document.getElementById("skillsField").value = activeProfile.skills || "";
        document.getElementById("certificationsField").value = activeProfile.certifications || "";
        document.getElementById("coverLetter").value = activeProfile.coverLetter || "";
        document.getElementById("portfolioField").value = activeProfile.portfolio || "";
    }
    // https://chatgpt.com/share/674b2f1f-d424-8004-b684-d17cab97e2de

    saveButton.addEventListener("click", () => {
        if (activeProfileIndex === null) return;

        profiles[activeProfileIndex] = {
            linkedin: document.getElementById("linkedin").value,
            name: document.getElementById("nameField").value,
            surname: document.getElementById("surnameField").value,
            birthday: document.getElementById("birthday").value,
            phoneNumber: document.getElementById("phoneNumber").value,
            email: document.getElementById("email").value,
            summary: document.getElementById("summaryField").value,
            location: document.getElementById("locationField").value,
            education: document.getElementById("educationField").value,
            experience: document.getElementById("experienceField").value,
            skills: document.getElementById("skillsField").value,
            certifications: document.getElementById("certificationsField").value,
            coverLetter: document.getElementById("coverLetter").value,
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
                linkedin: "",
                name: profileName,
                surname: "",
                summary: "",
                birthday: "",
                phoneNumber: "",
                email: "",
                location: "",
                education: "",
                experience: "",
                skills: "",
                certifications: "",
                coverLetter: "",
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
            Linkedin: ${activeProfile.linkedin}
            Name: ${activeProfile.name}
            Surname: ${activeProfile.surname}
            Date of Birth: ${activeProfile.birthday}
            Phone Number: ${activeProfile.phoneNumber}
            Email: ${activeProfile.email}
        ----------------------------------------------------
            Summary: ${activeProfile.summary}
        ----------------------------------------------------
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
    //https://chatgpt.com/share/674b2fec-9194-8004-9f95-65edb42a4b83
    //https://stackoverflow.com/questions/68831782/sending-email-in-javascript

    // Handle dropdown change to update active profile
    profilesDropdown.addEventListener("change", (event) => {
        setActiveProfile(event.target.value);
    });

    document.getElementById('generate').addEventListener('click', runAI)

    async function runAI() {
        if (activeProfile == null) {
            return alert('Select a profile for generating cover letter')
        }
        console.log(activeProfile)

        const genAI = new window.GoogleGenerativeAI(
            "AIzaSyBZeob5l70IU0BNo4Lj981_3nJ-Cs4P7GI"
        );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const prompt = `Write a professional cover letter for a job application. The name of applicant is ${activeProfile.name} ${activeProfile.surname}. They have experience in ${activeProfile.experience} and their skills include ${activeProfile.skills}. Here is a summary of their qualifications: ${activeProfile.summary}. Do not iclude the fields that are not given such as mail, phone number and etc.`;

        console.log(prompt)

        let retries = 3;
        let aiOutput = "";

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                console.log(`Attempt ${attempt}...`);
                const result = await model.generateContent(prompt);

                // Extract the text from the AI response
                aiOutput = result.response.text();

                console.log("Generated Response:", aiOutput);

                // Write the AI output to the textarea with id "coverLetter"
                const coverLetterTextarea = document.getElementById("coverLetter");
                if (coverLetterTextarea) {
                    coverLetterTextarea.value = aiOutput; // Write response to textarea
                } else {
                    console.error("Textarea with id 'coverLetter' not found.");
                }
                return; // Exit after a successful response
            } catch (error) {
                if (attempt < retries) {
                    console.error(
                        `Error during API call (Attempt ${attempt}):`,
                        error.message
                    );

                } else {
                    console.error("Please try again later.");
                    return;
                }
            }
        }
    }
});



// import { GoogleGenerativeAI } from './AI_API.js';

// const genAI = new GoogleGenerativeAI('YOUR_API_KEY');

// // Use `genAI` in your code
// console.log(genAI);


async function runAI(activeProfile) {
    const genAI = new window.GoogleGenerativeAI(
        "AIzaSyBZeob5l70IU0BNo4Lj981_3nJ-Cs4P7GI"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Write a professional cover letter for a job application. The name of applicant is ${activeProfile.name} ${activeProfile.surname}. They have experience in ${activeProfile.experience} and their skills include ${activeProfile.skills}. Here is a summary of their qualifications: ${activeProfile.summary}.`;

    let retries = 3; // Number of retries
    let aiOutput = ""; // Variable to store the AI response

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`Attempt ${attempt}...`);
            const result = await model.generateContent(prompt);

            // Extract the text from the AI response
            aiOutput = result.response.text();

            console.log("Generated Response:", aiOutput);

            // Write the AI output to the textarea with id "coverLetter"
            const coverLetterTextarea = document.getElementById("coverLetter");
            if (coverLetterTextarea) {
                coverLetterTextarea.value = aiOutput; // Write response to textarea
            } else {
                console.error("Textarea with id 'coverLetter' not found.");
            }
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

//https://www.youtube.com/watch?v=LgR1ZFoJKxA

document.getElementById("fill").addEventListener("click", async () => {
    // Retrieve the profiles from Chrome storage
    chrome.storage.local.get("profiles", (result) => {
        const profiles = result.profiles || {};
        const currentProfile = document.getElementById("profiles").value;

        if (!currentProfile || !profiles[currentProfile]) {
            alert("No profile selected or profile data is empty.");
            return;
        }

        const profileData = profiles[currentProfile];

        // Use Chrome's scripting API to inject code into the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: fillWebsiteForm,
                args: [profileData, fieldMapping], // Pass the profile data and field mapping to the function
            });
        });
    });
});

// Function to be executed on the active tab to fill in the form
function fillWebsiteForm(profileData, fieldMapping) {
    // Iterate through the field mapping object
    for (const [profileKey, selectors] of Object.entries(fieldMapping)) {
        let elementFound = false;

        // Iterate through each possible selector for the current profile key
        for (const selector of selectors) {
            const element = document.querySelector(`input[name='${selector}'], textarea[name='${selector}']`);
            if (element) {
                element.value = profileData[profileKey] || "";

                // Trigger input and change events
                element.dispatchEvent(new Event("input", { bubbles: true }));
                element.dispatchEvent(new Event("change", { bubbles: true }));

                elementFound = true;
                break; // Stop searching once a match is found
            }
        }

        if (!elementFound) {
            console.warn(`No matching form field found for profile key: ${profileKey}`);
        }
    }

    alert("Form filled with the selected profile data!");
}

document.getElementById("downloadProfile").addEventListener("click", () => {
    const profileSelector = document.getElementById("profiles");
    const selectedProfileName = profileSelector.value;

    if (!selectedProfileName) {
        alert("No profile selected to download!");
        return;
    }

    chrome.storage.local.get("profiles", (result) => {
        const profiles = result.profiles || {};
        const selectedProfile = profiles[selectedProfileName];

        if (!selectedProfile) {
            alert("The selected profile does not exist.");
            return;
        }

        const profileData = JSON.stringify(selectedProfile, null, 2);
        const blob = new Blob([profileData], { type: "application/json" });
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${selectedProfileName}.json`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        alert(`Profile "${selectedProfileName}" downloaded successfully!`);
    });
});

const fieldMapping = {
    linkedin: ["linkedin", "linkedIn", "linkedin_url", "profile_url", "linkedinprofile"],
    nameField: ["name", "first_name", "firstname", "givenname", "first"],
    surnameField: ["lastname", "last_name", "surname", "familyname", "secondname"],
    birthday: ["dob", "dateofbirth", "birthdate", "birthday"],
    phoneNumber: ["phone", "phone_number", "phonenumber", "contact"],
    email: ["email", "email_address", "emailaddress"],
    summaryField: ["summary", "profile_summary", "about", "description"],
    locationField: ["location", "city", "town", "address", "region"],
    educationField: ["education", "educations", "studies", "academic_experience"],
    experienceField: ["experience", "experiences", "work_experience", "job_experience"],
    skillsField: ["skills", "technical_skills", "soft_skills", "relevant_skills"],
    certificationsField: ["certifications", "certs", "accreditations", "awards"],
    coverLetter: ["coverletter", "cover_letter", "application_letter", "motivation"]
};
//ChatGPT generated all the different id options


document.getElementById("downloadProfile").addEventListener("click", () => {
    const profileSelector = document.getElementById("profiles");
    const selectedProfileName = profileSelector.value;

    if (!selectedProfileName) {
        alert("No profile selected to download!");
        return;
    }

    chrome.storage.local.get("profiles", (result) => {
        const profiles = result.profiles || {};
        const selectedProfile = profiles[selectedProfileName];

        if (!selectedProfile) {
            alert("The selected profile does not exist.");
            return;
        }

        const profileData = JSON.stringify(selectedProfile, null, 2);
        const blob = new Blob([profileData], { type: "application/json" });
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${selectedProfileName}.json`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        alert(`Profile "${selectedProfileName}" downloaded successfully!`);
    });
});

document.getElementById("importProfile").addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            try {
                const importedData = JSON.parse(reader.result);

                // Populate the fields
                document.getElementById("linkedin").value = importedData.linkedin || "";
                document.getElementById("nameField").value = importedData.name || "";
                document.getElementById("surnameField").value = importedData.surname || "";
                document.getElementById("birthday").value = importedData.birthday || "";
                document.getElementById("phoneNumber").value = importedData.phoneNumber || "";
                document.getElementById("email").value = importedData.email || "";
                document.getElementById("summaryField").value = importedData.summary || "";
                document.getElementById("locationField").value = importedData.location || "";
                document.getElementById("educationField").value = importedData.education || "";
                document.getElementById("experienceField").value = importedData.experience || "";
                document.getElementById("skillsField").value = importedData.skills || "";
                document.getElementById("certificationsField").value = importedData.certifications || "";
                document.getElementById("coverLetter").value = importedData.coverLetter || "";
                document.getElementById("portfolioField").value = importedData.portfolio || "";

                alert("Profile data imported successfully!");
            } catch (error) {
                alert("Invalid JSON file. Please check the file and try again.");
            }
        };

        reader.readAsText(file);
    });

    fileInput.click();
    document.body.removeChild(fileInput);
});

document.getElementById('loadLinkedinData').addEventListener('click', function () {
    chrome.storage.local.get(["userProfileData"], function (result) {
        if (result.userProfileData) {
            console.log("Retrieved user data:", result.userProfileData);
            document.getElementById('nameField').value = result.userProfileData.name
            document.getElementById('surnameField').value = result.userProfileData.surname
            document.getElementById('linkedin').value = result.userProfileData.url
        } else {
            alert('No user data found.')
        }
    });
})

