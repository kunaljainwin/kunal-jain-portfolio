$(document).ready(function () {

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
    });
});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Projects | Kunal Jain";
    } else {
        document.title = "Kunal Jain | Software Engineer";
    }
});

function getCategoryLabel(category) {
    const map = {
        'backend': 'Backend & Distributed',
        'systems': 'Systems & Low-Latency',
        'cloud': 'Cloud & DevOps',
        'web_app': 'Full-Stack Application'
    };
    return map[category] || 'Software Engineering';
}

async function getProjects() {
    try {
        const response = await fetch("projects.json");
        return await response.json();
    } catch (err) {
        console.error("Failed to load projects:", err);
        return [];
    }
}

function showProjects(projects) {
    const container = document.querySelector(".box-container");
    if (!container || !projects.length) return;

    let projectsHTML = "";
    projects.forEach(project => {
        const categoryLabel = getCategoryLabel(project.category);
        projectsHTML += `
        <div class="grid-item ${project.category}">
            <div class="box tilt">
                <div class="img-wrapper">
                    <img draggable="false" src="../assets/images/projects/${project.image}.png" alt="${project.name}" loading="lazy" />
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
            </div>
        </div>`;
    });
    container.innerHTML = projectsHTML;

    // Initialize Tilt
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".work .tilt"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.15
        });
    }

    // Initialize Isotope after images are loaded
    const $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        const filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}

getProjects().then(data => {
    showProjects(data);
});