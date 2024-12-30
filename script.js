let progress = 0;

// Funktion zum Aktualisieren des Fortschritts
function updateProgress(newProgress) {
    progress = Math.min(newProgress, 100);
    document.getElementById('progress-bar').style.width = progress + '%';
    document.getElementById('progress-text').innerText = progress + '% abgeschlossen';
}

// Simulierte Fortschrittsaktualisierung
setInterval(() => {
    if (progress < 100) {
        updateProgress(progress + 10); // Fortschritt um 10% erhöhen
    }
}, 2000);
