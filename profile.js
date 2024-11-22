document.getElementById("generateCoverLetterBtn").addEventListener("click", function() {
=    const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
    if (profiles.length > 0) {
        const profile = profiles[1];  
        generateCoverLetter(profile).then((coverLetter) => {
            alert("Generated Cover Letter: \n\n" + coverLetter);
        });
    } else {
        alert("No profile found. Please create a profile first.");
    }
});

async function generateCoverLetter(profile) {
    const coverLetter = await fetch('https://your-ai-api-url/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            profile: profile
        })
    }).then(response => response.json());
    return coverLetter.text;  
}
