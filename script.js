
// Fortschritt aktualisieren
function updateProgress(newProgress, message) {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    progressBar.style.width = `${newProgress}%`;
    progressText.innerText = `${newProgress}% abgeschlossen - ${message}`;
}

// JSON-Datei laden und Fortschritt anzeigen
fetch('progress.json')
    .then(response => response.json())
    .then(data => {
        updateProgress(data.progress, data.message);
    })
    .catch(error => {
        console.error('Fehler beim Laden der Fortschrittsdaten:', error);
    });
