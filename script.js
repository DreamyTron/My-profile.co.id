document.addEventListener('DOMContentLoaded', function() {

    const audio = document.getElementById('background-audio');
    const toggleMusicBtn = document.getElementById('toggle-music-btn');
    
    
    let isPlaying = false; 

   
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    if (toggleMusicBtn) {

        toggleMusicBtn.textContent = '▶ Musik'; 

        toggleMusicBtn.addEventListener('click', function() {
            if (isPlaying) {

                audio.pause();
                this.textContent = '▶ Musik'; 
                isPlaying = false;
            } else {
                audio.play()
                    .then(() => {
                        this.textContent = '⏸ Musik'; 
                        isPlaying = true;
                    })
                    .catch(error => {
                        console.error("Gagal memutar audio. Browser memblokir:", error);
                        alert("Musik tidak bisa diputar. Silakan coba periksa izin media browser.");
                    });
            }
        });
    }

    document.addEventListener('click', function attemptPlayOnce() {
        if (audio.paused && !isPlaying) {
             audio.play().then(() => {
                if (toggleMusicBtn) toggleMusicBtn.textContent = '⏸ Musik';
                isPlaying = true;
                document.removeEventListener('click', attemptPlayOnce);
            }).catch(e => {
            });
        }
    }, { once: true });
});