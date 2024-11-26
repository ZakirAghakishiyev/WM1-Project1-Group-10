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
saveButton.style.backgroundColor = '#4CAF50';
saveButton.style.color = '#fff';

// Create "Reload" button
const reloadButton = document.createElement('button');
reloadButton.textContent = 'Reload Draft';
reloadButton.style.margin = '5px';
reloadButton.style.padding = '10px';
reloadButton.style.border = 'none';
reloadButton.style.borderRadius = '3px';
reloadButton.style.cursor = 'pointer';
reloadButton.style.backgroundColor = '#2196F3';
reloadButton.style.color = '#fff';

// Add buttons to the container
buttonContainer.appendChild(saveButton);
buttonContainer.appendChild(reloadButton);

// Add the container to the webpage
document.body.appendChild(buttonContainer);

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
