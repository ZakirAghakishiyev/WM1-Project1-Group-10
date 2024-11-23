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

function addField() {
    const fieldsContainer = document.getElementById("fieldsContainer");
    const fieldDiv = document.createElement("div");

    const fieldNameInput = document.createElement("input");
    fieldNameInput.type = "text";
    fieldNameInput.placeholder = "Field Name";

    const fieldValueInput = document.createElement("input");
    fieldValueInput.type = "text";
    fieldValueInput.placeholder = "Field Value";

    fieldDiv.appendChild(fieldNameInput);
    fieldDiv.appendChild(fieldValueInput);
    fieldsContainer.appendChild(fieldDiv);
}

function saveData() {
    const predefinedFields = {
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

    const fieldsContainer = document.getElementById("fieldsContainer");
    const fieldElements = fieldsContainer.children;
    const updatedCustomFields = [];

    for (let i = 0; i < fieldElements.length; i++) {
        const inputs = fieldElements[i].querySelectorAll("input");
        const fieldName = inputs[0].value;
        const fieldValue = inputs[1].value;

        if (fieldName && fieldValue) {
            updatedCustomFields.push({ name: fieldName, value: fieldValue });
        }
    }

    if (activeProfile) {
        activeProfile.predefinedFields = predefinedFields;
        activeProfile.customFields = updatedCustomFields;
        localStorage.setItem("profiles", JSON.stringify(profiles));
        alert("Data saved successfully!");
    }
}

function displayFields() {
    if (activeProfile) {
        const { predefinedFields } = activeProfile;
        document.getElementById("nameField").value = predefinedFields.name;
        document.getElementById("surnameField").value = predefinedFields.surname;
        document.getElementById("summaryField").value = predefinedFields.summary;
        document.getElementById("locationField").value = predefinedFields.location;
        document.getElementById("educationField").value = predefinedFields.education;
        document.getElementById("experienceField").value = predefinedFields.experience;
        document.getElementById("skillsField").value = predefinedFields.skills;
        document.getElementById("certificationsField").value = predefinedFields.certifications;
        document.getElementById("portfolioField").value = predefinedFields.portfolio;

        const fieldsContainer = document.getElementById("fieldsContainer");
        fieldsContainer.innerHTML = ""; 

        activeProfile.customFields.forEach(field => {
            const fieldDiv = document.createElement("div");

            const fieldNameInput = document.createElement("input");
            fieldNameInput.type = "text";
            fieldNameInput.value = field.name;

            const fieldValueInput = document.createElement("input");
            fieldValueInput.type = "text";
            fieldValueInput.value = field.value;

            fieldDiv.appendChild(fieldNameInput);
            fieldDiv.appendChild(fieldValueInput);
            fieldsContainer.appendChild(fieldDiv);
        });
    }
}

document.getElementById("profiles").addEventListener("change", function() {
    setActiveProfile(this.value);
});
