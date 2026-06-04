/* ============================================
   AHMED HASSAN - FUTURISTIC PORTFOLIO
   Complete JavaScript Interactions & 3D Engine
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    initLoader();
    init3DBackground();
    initNavbarScroll();
    initMobileMenu();
    initTypingAnimation();
    initSkillBars();
    initScrollReveal();
    initProjectCards();
    initCertificateModal();
    initActiveNavHighlight();
    initSmoothScroll();
});

function initLoader() {
    const loader = document.getElementById('loader');
    if (loader) { setTimeout(() => loader.classList.add('hide'), 2000); }
}

function init3DBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0x020408, 0.0008);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.setZ(30);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1800;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 200;
        posArray[i + 1] = (Math.random() - 0.5) * 100;
        posArray[i + 2] = (Math.random() - 0.5) * 80 - 30;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.12, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const torusGeometry = new THREE.TorusGeometry(2.5, 0.08, 64, 200);
    const torusMaterial = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.15 });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);
    const torus2Geometry = new THREE.TorusGeometry(4, 0.05, 64, 300);
    const torus2Material = new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.1 });
    const torus2 = new THREE.Mesh(torus2Geometry, torus2Material);
    scene.add(torus2);
    const sphereGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.08, wireframe: true });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.003;
        particlesMesh.rotation.y = time * 0.05;
        particlesMesh.rotation.x = time * 0.02;
        torus.rotation.x = time * 0.3;
        torus.rotation.y = time * 0.5;
        torus2.rotation.x = time * 0.2;
        torus2.rotation.z = time * 0.4;
        sphere.rotation.x = time * 0.2;
        sphere.rotation.y = time * 0.3;
        camera.position.x = Math.sin(time * 0.1) * 1;
        camera.position.y = Math.cos(time * 0.15) * 0.8;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (!hamburger || !navMenu) return;
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    const links = navMenu.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

function initTypingAnimation() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;
    const roles = ['< HVAC Engineer />', '< CFD Analyst />', '< Fire Protection />', '< 3D Modeler />'];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    function typeEffect() {
        const currentRole = roles[roleIndex];
        if (isDeleting) { typedElement.textContent = currentRole.substring(0, charIndex - 1); charIndex--; }
        else { typedElement.textContent = currentRole.substring(0, charIndex + 1); charIndex++; }
        if (!isDeleting && charIndex === currentRole.length) { isDeleting = true; setTimeout(typeEffect, 2000); return; }
        if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeEffect, 500); return; }
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
    typeEffect();
}

function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    if (!skillFills.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width');
                if (width) fill.style.width = width + '%';
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.3 });
    skillFills.forEach(fill => observer.observe(fill));
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.glass, .project-card, .timeline-node, .cert-card, .skill-group');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.project-overlay') || e.target.closest('.project-media')) {
            }
        });
    });
}

function initCertificateModal() {
    const modal = document.getElementById('cert-modal');
    const certCards = document.querySelectorAll('.cert-card');
    const closeBtn = document.querySelector('.modal-close');
    const certDetails = {
        rank1: { title: '1st Rank in Class', desc: 'Awarded for maintaining the highest academic standing in Mechanical Power Engineering department at Minia University.' },
        autocad: { title: 'AutoCAD Professional Certification', desc: 'Comprehensive training in 2D drafting, 3D modeling, and MEP specialized workflows for engineering design.' },
        solid: { title: 'SolidWorks Associate', desc: 'Certified in parametric modeling, assembly design, and finite element analysis simulation.' },
        fire: { title: 'Fire Fighting Systems Engineering', desc: 'NFPA standards compliance, hydraulic calculation methods, and sprinkler system design certification.' }
    };
    if (!modal) return;
    certCards.forEach(card => {
        card.addEventListener('click', () => {
            const certType = card.getAttribute('data-cert');
            const details = certDetails[certType] || { title: 'Certification', desc: 'Verified engineering credential.' };
            document.getElementById('modal-title').textContent = details.title;
            document.getElementById('modal-desc').textContent = details.desc;
            modal.classList.add('show');
        });
    });
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    window.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('show'); });
}

function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    const hexOrb = document.querySelector('.hex-orb');
    if (hexOrb) {
        hexOrb.style.transform = `rotateX(${mouseY * 10}deg) rotateY(${mouseX * 10}deg)`;
    }
});