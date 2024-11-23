const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");

let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
let editIndex = -1; 


//following function is written according to W3 schools JSON section
function saveJobs() {
    localStorage.setItem("jobs", JSON.stringify(jobs));
}

//With the help of ChatGPT I learned how to map saved items into a table and save there
function displayJobs() {
    jobList.innerHTML = jobs.map((job, index) => `
        <tr>
            <td>${job.company}</td>
            <td>${job.jobTitle}</td>
            <td>${new Date(job.dateApplied).toLocaleDateString()}</td>
            <td>${job.status}</td>
            <td>
                <button onclick="editJob(${index})">Edit</button>
                <button onclick="deleteJob(${index})">Delete</button>
            </td>
        </tr>
    `).join("");
}

jobForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newJob = {
        company: document.getElementById("company").value,
        jobTitle: document.getElementById("jobTitle").value,
        dateApplied: document.getElementById("dateApplied").value,
        status: document.getElementById("status").value,
    };

    if (editIndex >= 0) {
        jobs[editIndex] = newJob;
        editIndex = -1; 
    } else {
        jobs.push(newJob);
    }

    saveJobs();
    displayJobs();
    jobForm.reset();
});

function deleteJob(index) {
    jobs.splice(index, 1);
    saveJobs();
    displayJobs();
}

function editJob(index) {
    const job = jobs[index];
    document.getElementById("company").value = job.company;
    document.getElementById("jobTitle").value = job.jobTitle;
    document.getElementById("dateApplied").value = job.dateApplied;
    document.getElementById("status").value = job.status;

    editIndex = index; 
}

displayJobs();
