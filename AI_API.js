/*This API code is writen based on knowladge learned in Codeacademy course of OpenAI API
Google Ai Studio and OpenAI have identical API*/
\const {PipelineServiceClient} = require('@google-cloud/aiplatform');

\const client = new PipelineServiceClient({
  projectId: 'YOUR_PROJECT_ID',
  keyFilename: 'path/to/your-service-account-key.json' 
});

async function listPipelines() {
  const [pipelines] = await client.listPipelines({
    parent: `projects/YOUR_PROJECT_ID/locations/YOUR_LOCATION`
  });
  pipelines.forEach(pipeline => console.log(pipeline));
}

listPipelines().catch(console.error);
