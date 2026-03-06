document.addEventListener('DOMContentLoaded', () => {
    initIntro();
    initScrollReveal();
});

function initIntro() {
    const introScreen = document.getElementById('intro-screen');
    if (!introScreen) {
        revealInicioVideo();
        return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        introScreen.remove();
        revealInicioVideo();
        return;
    }

    document.body.classList.add('intro-active');

    const logoDurationMs = 1900;
    const holdDurationMs = 350;

    window.setTimeout(() => {
        introScreen.classList.add('is-exit');
    }, logoDurationMs + holdDurationMs);

    introScreen.addEventListener('animationend', (event) => {
        if (event.animationName !== 'introSlideDown') {
            return;
        }

        introScreen.remove();
        document.body.classList.remove('intro-active');
        revealInicioVideo();
    });
}

function revealInicioVideo() {
    const videoCard = document.querySelector('.inicio-video-card');
    if (!videoCard) {
        return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        videoCard.classList.add('is-visible');
        return;
    }

    window.requestAnimationFrame(() => {
        videoCard.classList.add('is-visible');
    });
}

function initScrollReveal() {
    const animatedBlocks = document.querySelectorAll('.coctel-feature-text, .coctel-feature-media, .index-story-media, .index-story-text, .barman-feature-text, .barman-feature-media');
    if (!animatedBlocks.length) {
        return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        animatedBlocks.forEach((block) => block.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('is-visible');
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.25
    });

    animatedBlocks.forEach((block) => observer.observe(block));
}
