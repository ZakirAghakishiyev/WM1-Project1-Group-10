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

// Create a container for the buttons
const buttonContainer = document.createElement('div');
buttonContainer.style.position = 'fixed';
buttonContainer.style.bottom = '10px';
buttonContainer.style.right = '10px';
buttonContainer.style.zIndex = '9999';
buttonContainer.style.padding = '10px';
buttonContainer.style.backgroundColor = '#fff';
buttonContainer.style.border = '1px solid #ccc';
buttonContainer.style.borderRadius = '5px';
buttonContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';

// Create "Save" button
const saveButton = document.createElement('button');
saveButton.textContent = 'Save Draft';
saveButton.style.margin = '5px';
saveButton.style.padding = '10px';
saveButton.style.border = 'none';
saveButton.style.borderRadius = '3px';
saveButton.style.cursor = 'pointer';
saveButton.style.backgroundColor = '#032b68';
saveButton.style.color = '#fff';
// Add hover effect
saveButton.addEventListener('mouseover', () => {
    saveButton.style.backgroundColor = '#0058b7'; // Slightly darker blue
});

saveButton.addEventListener('mouseout', () => {
    saveButton.style.backgroundColor = '#032b68'; // Original color
});

// Add click effect
saveButton.addEventListener('mousedown', () => {
    saveButton.style.backgroundColor = '#328ced'; // Even darker blue for click
});

saveButton.addEventListener('mouseup', () => {
    saveButton.style.backgroundColor = '#032b68'; // Return to hover color after click
});

// Create "Reload" button
const reloadButton = document.createElement('button');
reloadButton.textContent = 'Reload Draft';
reloadButton.style.margin = '5px';
reloadButton.style.padding = '10px';
reloadButton.style.border = 'none';
reloadButton.style.borderRadius = '3px';
reloadButton.style.cursor = 'pointer';
reloadButton.style.backgroundColor = '#032b68';
reloadButton.style.color = '#fff';
// Add hover effect
reloadButton.addEventListener('mouseover', () => {
    reloadButton.style.backgroundColor = '#0058b7'; // Slightly darker blue
});

reloadButton.addEventListener('mouseout', () => {
    reloadButton.style.backgroundColor = '#032b68'; // Original color
});

// Add click effect
reloadButton.addEventListener('mousedown', () => {
    reloadButton.style.backgroundColor = '#328ced'; // Even darker blue for click
});

reloadButton.addEventListener('mouseup', () => {
    reloadButton.style.backgroundColor = '#032b68'; // Return to hover color after click
});

// Add buttons to the container
buttonContainer.appendChild(saveButton);
buttonContainer.appendChild(reloadButton);



// Function to save the draft
saveButton.addEventListener('click', () => {
    const formFields = document.querySelectorAll('input, textarea, select');
    const formData = {};

    // Collect data from all form fields
    formFields.forEach((field) => {
        formData[field.name || field.id] = field.value; // Use 'name' or 'id' as the key
    });

    // Save form data along with the current URL
    const draft = {
        url: window.location.href,
        data: formData,
    };

    chrome.storage.local.set({ draft }, () => {
        alert('Draft saved successfully!');
    });
});

// Function to reload the draft
reloadButton.addEventListener('click', () => {
    chrome.storage.local.get('draft', (result) => {
        const draft = result.draft;

        if (draft && draft.url === window.location.href) {
            // Populate form fields with saved data
            Object.entries(draft.data).forEach(([key, value]) => {
                const field = document.querySelector(`[name="${key}"], [id="${key}"]`);
                if (field) field.value = value;
            });
            alert('Form reloaded successfully!');
        } else {
            alert('No matching draft found for this page.');
        }
    });
});

if (window.location.href.includes('https://www.linkedin.com/in/')) {
    const grabData = document.createElement('button');
    grabData.innerText = 'Grab Linkedin Data';
    grabData.style.margin = '5px';
    grabData.style.padding = '10px';
    grabData.style.border = 'none';
    grabData.style.borderRadius = '3px';
    grabData.style.cursor = 'pointer';
    grabData.style.backgroundColor = '#032b68';
    grabData.style.color = '#fff';
    // Add hover effect
    grabData.addEventListener('mouseover', () => {
        grabData.style.backgroundColor = '#0058b7'; // Slightly darker blue
    });

    grabData.addEventListener('mouseout', () => {
        grabData.style.backgroundColor = '#032b68'; // Original color
    });

    // Add click effect
    grabData.addEventListener('mousedown', () => {
        grabData.style.backgroundColor = '#328ced'; // Even darker blue for click
    });

    grabData.addEventListener('mouseup', () => {
         grabData.style.backgroundColor = '#032b68'; // Return to hover color after click
    });

    buttonContainer.appendChild(grabData);

    grabData.addEventListener('click', function () {
        const name = document.querySelector('.GOeJUcPFHkspaBiXAWYmOCUxFmlczdTkRE.inline.t-24.v-align-middle.break-words').textContent.trim().split(' ')[0]
        const surname = document.querySelector('.GOeJUcPFHkspaBiXAWYmOCUxFmlczdTkRE.inline.t-24.v-align-middle.break-words').textContent.trim().split(' ')[1]
        const url = window.location.href

        console.log(name)
        console.log(surname)
        console.log(url)

        const user = { name: name, surname: surname, url: url }

        chrome.storage.local.set({ userProfileData: user }, function () {
            console.log("User data saved:", user);
    
            // Alert to notify the user
            alert("Data Grabed. Open profiles in extension");

        });
    })

}

// Add the container to the webpage
document.body.appendChild(buttonContainer);