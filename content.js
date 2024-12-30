"use strict";

(() => {
    let isInitialized = false;

    function init() {
        if (isInitialized) return;
        
        try {
            // וודא שאנחנו ב-YouTube
            if (window.location.hostname.includes('youtube.com')) {
                // טען את הסקריפט הראשי
                import(chrome.runtime.getURL('src/content/youtube.js'))
                    .then(module => {
                        module.initializeYouTubeCaption();
                        isInitialized = true;
                    })
                    .catch(error => {
                        console.error('Failed to initialize YouTube caption:', error);
                    });
            }
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    // נסה לאתחל מיד
    init();

    // האזן לשינויי ניווט ב-YouTube
    window.addEventListener('yt-navigate-finish', init);
})(); 