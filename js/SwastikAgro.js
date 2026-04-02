/* Register GSAP plugins once at the top */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


/* ================= back to top ================= */

const btn = document.getElementById("backToTop");

// Exit if back-to-top button doesn't exist
if (!btn) {
    console.warn("Back to top button not found");
} else {

    /* =====================================================
       SHOW / HIDE (PERFORMANCE OPTIMIZED)
       ===================================================== */
    let isVisible = false;

    ScrollTrigger.create({
        start: 200,
        onUpdate: (self) => {
            const show = self.scroll() > 200;

            if (show && !isVisible) {
                isVisible = true;

                gsap.to(btn, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });

            } else if (!show && isVisible) {
                isVisible = false;

                gsap.to(btn, {
                    autoAlpha: 0,
                    y: 20,
                    duration: 0.3,
                    ease: "power2.in"
                });
            }
        }
    });


    /* =====================================================
       SCROLL TO TOP (SMOOTH)
       ===================================================== */
    btn.addEventListener("click", () => {
        gsap.to(window, {
            scrollTo: { y: 0 },
            duration: 0.9,
            ease: "power3.out"
        });
    });


    /* =====================================================
       MAGNETIC HOVER EFFECT (DESKTOP ONLY)
       ===================================================== */
    if (window.innerWidth > 768) {

        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();

            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.25,
                y: y * 0.25,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.4,
                ease: "elastic.out(1, 0.4)"
            });
        });

    }

}  // Close else block for btn check











/* ================= HERO ANIMATION ================= */

const heroTL = gsap.timeline();

heroTL
    .from(".nav-inner, .menu a", {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    })

heroTL.from(".title, .desc, .hero-btn", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1
})

    .from(".scroll", {
        y: 30,
        opacity: 0,
        duration: 0.6
    });


/* ================= HIGHLIGHT SECTION ================= */

gsap.from(".highlight-left", {
    scrollTrigger: {
        trigger: ".highlight-section",
        start: "top 80%"
    },
    x: -60,
    opacity: 0,
    duration: 0.8
});

gsap.from(".brochure-btn", {
    scrollTrigger: {
        trigger: ".highlight-section",
        start: "top 80%"
    },
    scale: 0,
    duration: 0.8,
    ease: "back.out(1.7)"
});


gsap.to(".brochure-btn img", {
    rotate: 360,
    duration: 20,
    ease: "none",
    repeat: -1,
    force3D: true   // smoother rendering
});

gsap.from(".highlight-right", {
    scrollTrigger: {
        trigger: ".highlight-section",
        start: "top 80%"
    },
    x: 60,
    opacity: 0,
    duration: 0.8
});


/* ================= ABOUT SECTION ================= */

gsap.from(".about-tag", {
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%"
    },
    opacity: 0,
    y: 20,
    duration: 0.8
});

gsap.from(".about-heading", {
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%"
    },
    opacity: 0,
    x: -40,
    duration: 0.8
});

gsap.from(".accordion-item", {
    scrollTrigger: {
        trigger: ".accordion",
        start: "top 80%"
    },
    opacity: 1,
    y: 40,

    duration: 0.8
});

gsap.from(".about-text", {
    scrollTrigger: {
        trigger: ".about-text",
        start: "top 85%"
    },
    opacity: 0,
    x: 40,
    duration: 0.8
});

gsap.from(".about-image img", {
    scrollTrigger: {
        trigger: ".about-image",
        start: "top 85%"
    },
    opacity: 0,
    scale: 0.9,
    duration: 0.8
});


/* ================= ACCORDION ================= */

// set default open item height
document.querySelectorAll(".accordion-item.active .accordion-content").forEach(el => {
    el.style.height = el.scrollHeight + "px";
    el.style.opacity = 1;
});

document.querySelectorAll(".accordion-item").forEach(item => {

    item.addEventListener("click", () => {

        const content = item.querySelector(".accordion-content");
        const icon = item.querySelector(".icon");

        const isOpen = item.classList.contains("active");

        // close all
        document.querySelectorAll(".accordion-item").forEach(el => {

            el.classList.remove("active");

            const elContent = el.querySelector(".accordion-content");
            const elIcon = el.querySelector(".icon");

            gsap.to(elContent, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });

            gsap.to(elIcon, {
                rotate: 0,
                duration: 0.3
            });

            elIcon.textContent = "+";
        });

        // open clicked
        if (!isOpen) {

            item.classList.add("active");

            gsap.to(content, {
                height: content.scrollHeight,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            });

            gsap.to(icon, {
                rotate: 180,
                duration: 0.3,
                onComplete: () => {
                    icon.textContent = "-";
                }
            });

        }

    });

});


/* ================= news ================= */


/* heading animation */

gsap.from(".news-title", {
    scrollTrigger: {
        trigger: ".news-title",
        start: "top 85%"
    },
    opacity: 0,
    y: 40,
    duration: 0.8
})

/* cards animation */

gsap.from(".news-card", {
    scrollTrigger: {
        trigger: ".news-grid",
        start: "top 85%"
    },
    opacity: 0,
    y: 80,
    stagger: 0.2,
    duration: 0.8
})


/* ================= achievements ================= */

/* ================= COUNTER ================= */

function formatNumber(num) {

    if (num >= 1000000) {
        return (num / 1000000) + "M+";
    }

    if (num >= 1000) {
        return (num / 1000) + "K+";
    }

    return num + "+";

}

document.querySelectorAll(".counter").forEach(counter => {

    let target = +counter.dataset.target;

    gsap.to(counter, {
        innerText: target,
        duration: 2,
        ease: "power1.out",
        snap: { innerText: 1 },

        scrollTrigger: {
            trigger: counter,
            start: "top 85%"
        },

        onUpdate: function () {
            counter.innerText = formatNumber(Math.floor(counter.innerText));
        }

    });

});


/* ================= LOGO MARQUEE ================= */

const track = document.querySelector(".logo-track");

/* duplicate for infinite loop */




gsap.from(".mission-item", {
    scrollTrigger: {
        trigger: ".mission-grid",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out"
});




gsap.from(".mission-item .icon", {
    scrollTrigger: {
        trigger: ".mission-grid",
        start: "top 80%"
    },
    scale: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: "back.out(2)"
});




gsap.from(".mission-item .divider", {
    scrollTrigger: {
        trigger: ".mission-grid",
        start: "top 80%"
    },
    width: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out"
});


gsap.fromTo(".tractor img",
    { x: 350 },
    {
        x: -250,
        rotate: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: {
            trigger: ".mission-section",
            start: "top 85%",
            end: "bottom 20%",
            scrub: 1
        }
    });




gsap.from(".about-content .line", {
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%"
    },
    scaleY: 0,
    transformOrigin: "top",
    duration: 1,
    ease: "power2.out"
});


// ==================================== products=========================---------------------------



document.addEventListener("DOMContentLoaded", () => {

    const productSwiper = new Swiper(".productSwiper", {

        slidesPerView: 3,
        spaceBetween: 24,
        centeredSlides: true,
        loop: true,
        speed: 800,

        /* autoplay */
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },

        /* pagination bullets */
        pagination: {
            el: " .swiper-pagination",
            clickable: true,
            dynamicBullets: true
        },

        /* navigation arrows */
        navigation: {
            nextEl: ".productSwiper .swiper-button-next",
            prevEl: ".productSwiper .swiper-button-prev"
        },

        /* keyboard navigation */
        keyboard: {
            enabled: true
        },

        /* responsive breakpoints */
        breakpoints: {

            0: {
                slidesPerView: 1,
                spaceBetween: 16
            },

            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },

            1024: {
                slidesPerView: 3,
                spaceBetween: 24
            }

        }

    });

});
/* active bullet animation */

const active = document.querySelector(".swiper-pagination-bullet-active");

if (active) {
    gsap.to(active, {
        width: 8,
        height: 8,
        background: "#1d4ed8",
        borderRadius: "50%",
        duration: .80,
        ease: "power2.out"
    });
}













/* =========================================================
   GSAP CONTACT SECTION ANIMATION (PRODUCTION LEVEL)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       DEFAULT SETTINGS (Reusable Animation)
       ========================================================= */
    const defaultEase = "power3.out";

    /* =========================================================
       LEFT SIDE ANIMATION (TEXT + INFO)
       ========================================================= */
    const leftTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top 75%",   // animation starts when section enters viewport
            toggleActions: "play none none none"
        }
    });

    // Badge animation
    leftTimeline.from(".contact-section .tag", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: defaultEase
    });

    // Title animation (split feel using delay)
    leftTimeline.from(".contact-section .contact-title", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        immediateRender: false,
        ease: defaultEase
    }, "-=0.4");

    // Underline animation (scale effect)
    leftTimeline.from(".underline", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.4");

    // Contact info items (stagger)
    leftTimeline.from(".info .item", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: defaultEase
    }, "-=0.2");


    /* =========================================================
       RIGHT SIDE FORM ANIMATION
       ========================================================= */
    const formTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Form container
    formTimeline.from(".contact-form", {
        x: 80,
        opacity: 0,
        duration: 0.8,
        ease: defaultEase
    });

    // Inputs stagger animation
    formTimeline.from(".contact-form input, .contact-form textarea", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.4");

    // Button animation
    formTimeline.from(".contact-form button", {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: "back.out(1.7)"
    }, "-=0.2");


    /* =========================================================
       MAP SECTION ANIMATION
       ========================================================= */
    const mapSection = document.querySelector(".map-section");

    if (mapSection) {
        ScrollTrigger.matchMedia({
            // Mobile
            "(max-width: 768px)": function () {
                gsap.from(".map-box", {
                    scrollTrigger: {
                        trigger: ".map-section",
                        start: "top 90%",
                        toggleActions: "play none none none"
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: defaultEase
                });
            },
            // Desktop
            "(min-width: 769px)": function () {
                gsap.from(".map-box", {
                    scrollTrigger: {
                        trigger: ".map-section",
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: defaultEase
                });
            }
        });
    }


    /* =========================================================
       PERFORMANCE OPTIMIZATION (IMPORTANT)
       ========================================================= */

    // Reduce animations on low-power devices
    ScrollTrigger.matchMedia({

        "(max-width: 768px)": function () {
            gsap.set(".contact-form", { x: 0 }); // disable heavy movement
        }

    });

});