document.addEventListener("DOMContentLoaded", () => {
    const saveButton = document.getElementById("save");
    const reloadButton = document.getElementById("reload");
    const formFields = document.querySelectorAll("input, textarea, select"); // Adjust selector for your form fields
    const messageContainer = document.createElement('div'); // Message container for feedback

    // Add the message container to the page
    document.body.appendChild(messageContainer);
    messageContainer.style.cssText = "margin-top: 10px; text-align: center; color: green; font-weight: bold;";

    // Save draft to Chrome storage
    saveButton.addEventListener("click", () => {
        const formData = {};

        // Collect data from all fields
        formFields.forEach(field => {
            formData[field.name || field.id] = field.value; // Use 'name' or 'id' as the key
        });

        // Get the current tab's URL
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentUrl = tabs[0].url;

            const draftData = {
                url: currentUrl,
                data: formData
            };

            // Save to Chrome storage
            chrome.storage.local.set({ draft: draftData }, () => {
                // Show a success message
                messageContainer.textContent = "Draft saved successfully!";
                setTimeout(() => {
                    messageContainer.textContent = ""; // Clear the message after 3 seconds
                }, 3000);
            });
        });
    });

    // Reload saved draft from Chrome storage
    reloadButton.addEventListener("click", () => {
        chrome.storage.local.get("draft", (result) => {
            const draft = result.draft;

            if (draft) {
                const currentUrl = window.location.href;

                // Check if the draft matches the current URL
                if (draft.url === currentUrl) {
                    // Populate fields with saved data
                    Object.entries(draft.data).forEach(([key, value]) => {
                        const field = document.querySelector(`[name="${key}"], [id="${key}"]`);
                        if (field) field.value = value;
                    });

                    // Show a success message
                    messageContainer.textContent = "Form filled with saved draft!";
                    setTimeout(() => {
                        messageContainer.textContent = ""; // Clear the message after 3 seconds
                    }, 3000);
                } else {
                    alert("No saved draft found for this website.");
                }
            } else {
                alert("No draft saved.");
            }
        });
    });
});
