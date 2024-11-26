/*This API code is writen based on knowladge learned in Codeacademy course of OpenAI API
Google Ai Studio and OpenAI have identical API*/
const { google } = require('googleapis');

async function generateCoverLetter(profile) {
  const apiKey = 'AIzaSyBZeob5l70IU0BNo4Lj981_3nJ-Cs4P7GI'; 
  const gemini = google.gemini({
    version: 'v1',
    auth: apiKey,
  });

  const prompt = `Write a professional cover letter for a job application. The applicant's name is ${profile.name} ${profile.surname}. They have experience in ${profile.experience} and their skills include ${profile.skills}. Here is a summary of their qualifications: ${profile.summary}.`;

  try {
    const response = await gemini.text.generate({
      model: 'gemini-1.5-flash',
      prompt: prompt,
      max_tokens: 500,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error generating cover letter:', error);
    return 'An error occurred while generating the cover letter.';
  }
}

document.getElementById('generate').addEventListener('click', async () => {
  const profile = {
    name: document.getElementById('nameField').value,
    surname: document.getElementById('surnameField').value,
    experience: document.getElementById('experienceField').value,
    skills: document.getElementById('skillsField').value,
    summary: document.getElementById('summaryField').value,
  };

  const coverLetter = await generateCoverLetter(profile);
  document.getElementById('coverLetter').value = coverLetter;
});


