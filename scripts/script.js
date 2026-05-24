const env = document.getElementById("env");
const btn = document.getElementById("btn");
const flash = document.querySelector(".open-flash");
const main = document.getElementById("main");
const scene = document.querySelector(".scene");
const bottomText = document.querySelector(".bottom-text");




/* =========================
   PARTICLES
========================= */

const particles = document.getElementById("particles");

function createParticle() {

    if (!particles) return;

    const p = document.createElement("div");
    p.classList.add("particle");

    p.style.left = Math.random() * 100 + "vw";
    p.style.bottom = "-10px";
    p.style.animationDuration = (4 + Math.random() * 5) + "s";
    p.style.opacity = Math.random();

    particles.appendChild(p);

    setTimeout(() => {
        p.remove();
    }, 9000);
}

setInterval(createParticle, 180);

/* =========================
   MUSIC
========================= */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let musicStartedFromEnvelope = false;

/* =========================
   OPEN ENVELOPE
========================= */

let opened = false;

function openEnvelope() {

    if (opened) return;
    opened = true;

    /* 🎵 تشغيل الموسيقى أول مرة */
    if (music && music.paused) {

        music.play();
        music.volume = 0.4;

        musicStartedFromEnvelope = true;

        if (musicBtn) {
            musicBtn.classList.add("playing");
            musicBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        }
    }

    const tl = gsap.timeline();

    tl.to(env, {
        scale: 1.08,
        rotateX: 15,
        rotateY: -12,
        duration: .45,
        ease: "power2.out"
    });

    tl.to(flash, {
        opacity: 1,
        duration: .15
    });

    tl.to(flash, {
        opacity: 0,
        duration: .45
    });

    tl.to(env, {
        scale: 1.35,
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: "power4.inOut"
    });

    /* 👇 اختفاء النص السفلي مع الأنيميشن */
    tl.to(bottomText, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.out"
    }, "<");

    tl.to(scene, {
        opacity: 0,
        scale: 0.98,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {

            scene.style.pointerEvents = "none";

            if (main) {

                main.classList.add("show");

                gsap.from(".glass-card", {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                });

                gsap.from(".main h1", {
                    y: -20,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        }
    });
}

/* =========================
   EVENTS
========================= */

if (env) env.addEventListener("click", openEnvelope);
if (btn) btn.addEventListener("click", openEnvelope);

/* =========================
   MUSIC BUTTON CONTROL
========================= */

if (musicBtn && music) {

    musicBtn.addEventListener("click", () => {

        if (music.paused) {

            music.play();
            music.volume = 0.4;

            musicBtn.classList.add("playing");
            musicBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;

        } else {

            music.pause();

            musicBtn.classList.remove("playing");
            musicBtn.innerHTML = `<i class="fa-solid fa-music"></i>`;
        }
    });
}



const heroVideo = document.querySelector(".hero-video");
const cardVideo = document.querySelector(".card-video");

// تبطي السرعة
heroVideo.playbackRate = 0.10;
cardVideo.playbackRate = 0.10;
