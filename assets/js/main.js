const swiper = new Swiper(".hero-slider", {
    loop: true,
    speed: 1200,
    grabCursor: true,
    autoplay: { delay: 3500, disableOnInteraction: false },
    effect: "fade",
    fadeEffect: { crossFade: true },
    on: {
        slideChangeTransitionStart: function () {
            const currentSlide = this.slides[this.activeIndex];
            const text = currentSlide.querySelector(".text");
            if (text) {
                text.classList.remove("opacity-0", "translate-x-20");
                text.classList.add("opacity-100", "translate-x-0");
            }
        },
        slideChangeTransitionEnd: function () {
            this.slides.forEach(slide => {
                const text = slide.querySelector(".text");
                if (text && slide !== this.slides[this.activeIndex]) {
                    text.classList.remove("opacity-100", "translate-x-0");
                    text.classList.add("opacity-0", "translate-x-20");
                }
            });
        }
    }
});
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");

let isMenuOpen = false;

menuBtn.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove("max-h-0", "opacity-0");
        mobileMenu.classList.add("max-h-96", "opacity-100");
        bar1.style.transform = "rotate(45deg) translateY(8px)";
        bar2.style.opacity = "0";
        bar3.style.transform = "rotate(-45deg) translateY(-8px)";
    } else {
        mobileMenu.classList.add("max-h-0", "opacity-0");
        mobileMenu.classList.remove("max-h-96", "opacity-100");
        bar1.style.transform = "rotate(0) translateY(0)";
        bar2.style.opacity = "1";
        bar3.style.transform = "rotate(0) translateY(0)";
    }
});
const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
        isMenuOpen = false;
        mobileMenu.classList.add("max-h-0", "opacity-0");
        mobileMenu.classList.remove("max-h-96", "opacity-100");
        bar1.style.transform = "rotate(0) translateY(0)";
        bar2.style.opacity = "1";
        bar3.style.transform = "rotate(0) translateY(0)";
    });
});


const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        navbar.classList.add("shadow-xl", "bg-white/98", "backdrop-blur-md", "py-3");
        navbar.classList.remove("shadow-md", "py-5");
    } else {
        navbar.classList.remove("shadow-xl", "bg-white/98", "backdrop-blur-md", "py-3");
        navbar.classList.add("shadow-md", "py-5");
    }
    lastScroll = currentScroll;
});


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            const offsetTop = target.offsetTop - navbar.offsetHeight - 20;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
    });
});


const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - navbar.offsetHeight - 100) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("text-[#2576a8]");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("text-[#2576a8]");
        }
    });
});

AOS.init({ once: true });
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        scrollBtn.classList.remove("opacity-0", "pointer-events-none");
        scrollBtn.classList.add("opacity-100");
    } else {
        scrollBtn.classList.add("opacity-0", "pointer-events-none");
        scrollBtn.classList.remove("opacity-100");
    }
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
const testimonialsSwiper = new Swiper(".testimonials-slider", {
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 30,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {
        768: {
            slidesPerView: 2,
        },
    },
});
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    item.addEventListener("click", () => {
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".faq-icon");

        if (answer.classList.contains("hidden")) {
            answer.classList.remove("hidden");
            icon.textContent = "-";
        } else {
            answer.classList.add("hidden");
            icon.textContent = "+";
        }
    });
});

emailjs.init("DieSxLv94d4cyn2zq"); // ضع الـ User ID من EmailJS

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const templateParams = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value,
    };

    emailjs.send("service_ukdc5n6", "template_fn62eo9", templateParams)
        .then(function () {
            formMessage.textContent = "Your message has been sent successfully!";
            formMessage.classList.add("text-green-600");
            contactForm.reset();
        }, function (error) {
            formMessage.textContent = "Oops! Something went wrong. Please try again.";
            formMessage.classList.add("text-red-600");
            console.error("EmailJS error:", error);
        });
});

// emailjs.send('service_ukdc5n6', 'template_fn62eo9', {
//     from_name: document.querySelector('#name').value,
//     from_email: document.querySelector('#email').value,
//     phone: document.querySelector('#phone').value || '—',
//     message: document.querySelector('#message').value
// })
//     .then(function () {
//         console.log('SUCCESS!');
//     }, function (error) {
//         console.log('FAILED...', error);
//     });