// ==========================================
// MODAL FUNCTIONS
// ==========================================

// Function to open modal
function openModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Function to close modal
function closeModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside the modal content
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const activeModals = document.querySelectorAll('.modal.active');
        activeModals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});


// ==========================================
// SCROLL ANIMATIONS FOR CARDS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Observer for about cards
    const aboutCards = document.querySelectorAll('.about-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Remove scroll-animate class after animation completes
                setTimeout(() => {
                    entry.target.classList.remove('scroll-animate');
                }, 600);
            }
        });
    }, observerOptions);
    
    // Setup initial state and observe
    aboutCards.forEach((card, index) => {
        card.classList.add('scroll-animate');
        card.style.setProperty('--animation-delay', `${index * 0.1}s`);
        observer.observe(card);
    });

    // Observer for other animated elements
    const animatedElements = document.querySelectorAll('.project-card, .section-title');
    animatedElements.forEach(element => {
        element.classList.add('scroll-animate');
        observer.observe(element);
    });
});

// ==========================================
// LIGHTBOX FUNCTIONALITY
// ==========================================

let currentLightboxIndex = 0;
let currentGalleryType = '';
let mediaItems = [];

// Define all galleries with their media
const galleries = {
    football: [
        { type: 'image', src: 'images/Sports/house_champion.jpg', alt: 'Football match moment' },
        { type: 'video', src: 'videos/house_champ_celebration.mp4', alt: 'Football video 1' }
    ],
    topscorer: [
        { type: 'video', src: 'videos/winning_goal.mp4', alt: 'Winning goal' }
    ],
    race: [
        { type: 'image', src: 'images/Sports/race_medels.jpg', alt: 'Race victory moment' }
    ],
    captain: [
        { type: 'image', src: 'images/Sports/team.jpg', alt: 'Team captain moment' }
    ]
};

// Open lightbox
function openLightbox(index, galleryType) {
    console.log('Opening lightbox with index:', index, 'gallery:', galleryType);
    
    currentLightboxIndex = index;
    currentGalleryType = galleryType;
    mediaItems = galleries[galleryType];
    
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('active');
        displayMedia(currentLightboxIndex);
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Lightbox element not found!');
    }
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        // Stop all videos before closing
        const videos = lightbox.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
        
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Display media at specific index
function displayMedia(index) {
    if (index < 0) {
        currentLightboxIndex = mediaItems.length - 1;
    } else if (index >= mediaItems.length) {
        currentLightboxIndex = 0;
    } else {
        currentLightboxIndex = index;
    }
    
    const media = mediaItems[currentLightboxIndex];
    const lightboxContent = document.querySelector('.lightbox-content');
    const counter = document.querySelector('.lightbox-counter');
    
    if (!lightboxContent || !counter) {
        console.error('Lightbox content or counter not found!');
        return;
    }
    
    // Stop any playing videos before clearing content
    const oldVideos = lightboxContent.querySelectorAll('video');
    oldVideos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
    
    // Clear previous content
    lightboxContent.innerHTML = '';
    
    // Add image or video
    if (media.type === 'image') {
        const img = document.createElement('img');
        img.src = media.src;
        img.alt = media.alt;
        lightboxContent.appendChild(img);
    } else if (media.type === 'video') {
        const video = document.createElement('video');
        video.src = media.src;
        video.controls = true;
        video.autoplay = true;
        video.style.borderRadius = '8px';
        lightboxContent.appendChild(video);
    }
    
    // Update counter
    counter.textContent = `${currentLightboxIndex + 1} of ${mediaItems.length}`;
}

// Navigate to next media
function nextMedia() {
    displayMedia(currentLightboxIndex + 1);
}

// Navigate to previous media
function prevMedia() {
    displayMedia(currentLightboxIndex - 1);
}

// Close lightbox when clicking outside the content
document.addEventListener('click', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        if (event.key === 'ArrowLeft') {
            prevMedia();
        } else if (event.key === 'ArrowRight') {
            nextMedia();
        } else if (event.key === 'Escape') {
            closeLightbox();
        }
    }
});