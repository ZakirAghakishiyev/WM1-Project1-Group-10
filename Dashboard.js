const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");

let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
let editIndex = -1;

// Save jobs to localStorage
function saveJobs() {
    localStorage.setItem("jobs", JSON.stringify(jobs));
}

// Display jobs in the table
function displayJobs() {
    jobList.innerHTML = jobs.map((job, index) => `
        <tr data-index="${index}">
            <td>${job.company}</td>
            <td>${job.jobTitle}</td>
            <td>${new Date(job.dateApplied).toLocaleDateString()}</td>
            <td>${job.status}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        </tr>
    `).join("");

    // Attach event listeners to buttons
    document.querySelectorAll(".edit-btn").forEach((button, idx) => {
        button.addEventListener("click", () => editJob(idx));
    });
    document.querySelectorAll(".delete-btn").forEach((button, idx) => {
        button.addEventListener("click", () => deleteJob(idx));
    });
}

// Handle form submission
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

// Delete a job
function deleteJob(index) {
    jobs.splice(index, 1);
    saveJobs();
    displayJobs();
}

// Edit a job
function editJob(index) {
    const job = jobs[index];
    document.getElementById("company").value = job.company;
    document.getElementById("jobTitle").value = job.jobTitle;
    document.getElementById("dateApplied").value = job.dateApplied;
    document.getElementById("status").value = job.status;

    editIndex = index;
}

// Initialize the app
displayJobs();
