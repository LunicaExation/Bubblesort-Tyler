
// Update progress
function updateProgress(newProgress, message) {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const messageText = document.getElementById('message-text');

    // Update progress bar and text
    progressBar.style.width = `${newProgress}%`;
    progressText.innerText = `${newProgress}% completed`;
    messageText.innerText = `Updates: ${message}`;
}

// Load JSON file and display progress
fetch('progress.json')
    .then(response => response.json())
    .then(data => {
        updateProgress(data.progress, data.message);
    })
    .catch(error => {
        console.error('Error loading progress data:', error);
    });
