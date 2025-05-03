// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Scroll Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.section-title, .about-image, .about-text, .skill-card, .project-card, .form-group, .copyright');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const animationStart = windowHeight / 1.2;
        
        if (elementPosition < animationStart) {
            const delay = element.getAttribute('data-delay') || 0;
            
            setTimeout(() => {
                element.classList.add('animate');
            }, delay * 300);
        }
    });
}

// Initialize animations on load
window.addEventListener('load', () => {
    // Immediately animate hero content
    document.querySelector('.hero-content').style.animation = 'fadeIn 1s ease forwards';
    
    // Animate other elements on scroll
    animateOnScroll();
});

// Animate on scroll
window.addEventListener('scroll', animateOnScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    console.log({ name, email, subject, message });
    
    });

// Gallery functionality
const projectCards = document.querySelectorAll(".project-card");
const galleryPopup = document.getElementById("gallery-popup");
const popupImg = document.getElementById("popup-img");
const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const projectGalleries = {
  0: ["Restro1.png", "Restro2.png","Restro3.png","Restro4.png","Restro5.png","Restro6.png"],
  1: ["Jeewan1.png", "Jeewan2.png","Jeewan3.png","Jeewan4.png","Jeewan5.png","Jeewan6.png","Jeewan7.png","Jeewan8.png"],
  2: ["cloth1.png", "cloth2.png","cloth3.png"],
  3: ["Dotted1.png","Dotted2.png"],
  4: ["10beasts1.png","10beasts2.png","10beasts3.png","10beasts4.png","10beasts5.png","10beasts6.png","10beasts7.png"],
  5: ["Service1.png","Service2.png","Service3.png","Service4.png"],
};

let currentImages = [];
let currentIndex = 0;

projectCards.forEach((card, index) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    currentImages = projectGalleries[index] || [];
    currentIndex = 0;
    if (currentImages.length > 0) {
      popupImg.src = currentImages[currentIndex];
      galleryPopup.classList.remove("hidden");
    }
  });
});

closeBtn.addEventListener("click", () => {
  galleryPopup.classList.add("hidden");
});

nextBtn.addEventListener("click", () => {
  if (currentImages.length > 0) {
    currentIndex = (currentIndex + 1) % currentImages.length;
    popupImg.src = currentImages[currentIndex];
  }
});

prevBtn.addEventListener("click", () => {
  if (currentImages.length > 0) {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    popupImg.src = currentImages[currentIndex];
  }
});


// EmailJS function
function sendMail(){
    let parms = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
    }
    
    emailjs.send("service_zoxzpr9", "template_0k3kewt", parms)
        .then(function(response) {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        }, function(error) {
            alert('There was an error sending your message. Please try again later.');
            console.error('EmailJS error:', error);
        });
}