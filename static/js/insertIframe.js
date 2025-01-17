
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.youtube-container');

        const playButton = container.querySelector('.play-button');

        playButton.addEventListener('click', function () {
            const videoId = container.getAttribute('data-video-id');
            const iframe = document.createElement('iframe');

            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.classList.add('iframe');

            // Reemplaza la fachada con el iframe
            container.innerHTML = '';
            container.appendChild(iframe);
        });
   
});

