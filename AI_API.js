/*This API code is writen based on knowladge learned in Codeacademy course of OpenAI API
Google Ai Studio and OpenAI have identical API*/
const {PipelineServiceClient} = require('@google-cloud/aiplatform');
const client = new PipelineServiceClient({
  projectId: 'YOUR_PROJECT_ID',
  keyFilename: 'path/to/your-service-account-key.json'
});

async function generateCoverLetter(profile) {
  const prompt = `Write a professional cover letter for a job application. The applicant's name is ${profile.predefinedFields.name} ${profile.predefinedFields.surname}. They have experience in ${profile.predefinedFields.experience} and their skills include ${profile.predefinedFields.skills}. Here is a summary of their qualifications: ${profile.predefinedFields.summary}.`;

  const request = {
    parent: `projects/YOUR_PROJECT_ID/locations/YOUR_LOCATION`,
    prompt: prompt,
    model: "text-bison@001",
  };

  const [response] = await client.predict(request);
  return response.predictions[0]; 
}
