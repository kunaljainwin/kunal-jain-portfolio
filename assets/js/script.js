$(document).ready(function () {

    // Mobile Navbar toggle
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 80) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        // Active link scroll spy
        $('section').each(function () {
            const height = $(this).outerHeight();
            const offset = $(this).offset().top - 120;
            const top = $(window).scrollTop();
            const id = $(this).attr('id');

            if (top >= offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Smooth scrolling for navigation anchors
    $('a[href*="#"]').on('click', function (e) {
        const target = $(this).attr('href');
        if (target === '#' || !$(target).length) return;
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(target).offset().top - 70,
        }, 400, 'swing');
    });

});

// Page visibility title handler
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
        document.title = 'Portfolio | Kunal Jain';
    } else {
        document.title = 'Kunal Jain | Backend & Distributed Systems';
    }
});

// Typed.js effect
if ($('.typing-text').length) {
    new Typed('.typing-text', {
        strings: [
            'Low-Latency & Distributed Systems',
            'Backend Microservices in Java & Go',
            'High-Performance Systems in Modern C++',
            'Event-Driven Architectures (Kafka & Postgres)',
            'Cloud-Native Platforms (K8s & Argo CD)'
        ],
        loop: true,
        typeSpeed: 45,
        backSpeed: 25,
        backDelay: 1200,
    });
}

// Fetch helper with error safety
async function fetchData(type = "skills") {
    let url = "skills.json";
    if (type === "projects") {
        url = "./projects/projects.json";
    } else if (type === "notes") {
        url = "dsa.json";
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        console.error(`Error loading ${type}:`, err);
        return [];
    }
}

function showSkills(skills) {
    const container = document.getElementById("skillsContainer");
    if (!container || !skills.length) return;

    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" loading="lazy" />
                <span>${skill.name}</span>
            </div>
        </div>`;
    });
    container.innerHTML = skillHTML;
}

function showNotes(notes) {
    const container = document.getElementById("notesContainer");
    if (!container || !notes.length) return;

    let notesHTML = "";
    notes.forEach(item => {
        notesHTML += `
        <div class="bar">
            <div class="info">
                <a target="_blank" rel="noopener noreferrer" href="${item.link}" aria-label="${item.name}">
                    <img src="${item.icon}" alt="${item.name}" loading="lazy" />
                </a>
                <span>${item.name}</span>
                <a target="_blank" rel="noopener noreferrer" href="${item.link}" style="margin-left: auto; color: var(--primary);">
                    <i class="fas fa-external-link-alt" style="font-size: 1.2rem;"></i>
                </a>
            </div>
        </div>`;
    });
    container.innerHTML = notesHTML;
}

function getCategoryLabel(category) {
    const map = {
        'backend': 'Backend & Distributed',
        'systems': 'Systems & Low-Latency',
        'cloud': 'Cloud & DevOps',
        'web_app': 'Full-Stack Application'
    };
    return map[category] || 'Software Engineering';
}

function showProjects(projects) {
    const container = document.querySelector("#work .box-container");
    if (!container || !projects.length) return;

    let projectHTML = "";
    projects.slice(0, 9).forEach(project => {
        const categoryLabel = getCategoryLabel(project.category);
        projectHTML += `
        <div class="box tilt">
            <div class="img-wrapper">
                <img draggable="false" src="assets/images/projects/${project.image}.png" alt="${project.name}" loading="lazy" />
                <span class="category-badge">${categoryLabel}</span>
            </div>
            <div class="content">
                <div class="tag">
                    <h3>${project.name}</h3>
                </div>
                <div class="desc">
                    <p>${project.desc}</p>
                    <div class="btns">
                        <a href="${project.links.code}" class="btn" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i> Code
                        </a>
                        <a href="${project.links.view}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i> Architecture
                        </a>
                    </div>
                </div>
            </div>
        </div>`;
    });
    container.innerHTML = projectHTML;

    // Initialize Tilt on dynamically rendered cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".work .tilt"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.15,
        });
    }

    // Scroll reveal for project cards
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.work .box', {
            origin: 'bottom',
            distance: '30px',
            duration: 800,
            interval: 150,
            reset: false
        });
    }
}

// Initial Data Loads
fetchData("skills").then(data => showSkills(data));
fetchData("projects").then(data => showProjects(data));
fetchData("notes").then(data => showNotes(data));

// Initialize Tilt for static elements
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".profile-wrapper, .bento-card"), {
        max: 8,
        speed: 400,
        glare: false
    });
}

// ScrollReveal Animations
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '40px',
        duration: 900,
        reset: false
    });

    sr.reveal('.home .content', { delay: 100 });
    sr.reveal('.home .image', { delay: 200 });
    sr.reveal('.about .heading', { delay: 100 });
    sr.reveal('.bento-card', { interval: 120 });
    sr.reveal('.skills .heading', { delay: 100 });
    sr.reveal('.skills .container', { delay: 150 });
    sr.reveal('#notes .heading', { delay: 100 });
    sr.reveal('#notes .container', { delay: 150 });
    sr.reveal('.experience .heading', { delay: 100 });
    sr.reveal('.experience .timeline .container', { interval: 200 });
    sr.reveal('.education .heading', { delay: 100 });
    sr.reveal('.education .box', { interval: 150 });
}