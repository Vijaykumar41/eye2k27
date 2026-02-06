// Countdown
const eventDate = new Date("March 10, 2026 10:00:00").getTime();
const timer = document.getElementById("countdown");

setInterval(() => {
  const now = new Date().getTime();
  const diff = eventDate - now;
  if (timer) {
    timer.innerHTML =
      Math.floor(diff / (1000 * 60 * 60 * 24)) + " Days Left";
  }
}, 1000);

// Modal
function openModal(title) {
  document.getElementById("eventTitle").innerText = title;
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Lightbox Functions
function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  img.src = src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// Close with ESC key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

// POWER ON EFFECT
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
  }, 1800);
});


// Scroll fade animation
const elements = document.querySelectorAll('.fade');

window.addEventListener('scroll', () => {
  elements.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add('show');
    }
  });
});


function openModal() {
  document.getElementById("eventModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("eventModal").style.display = "none";
}

window.onclick = function (e) {
  const modal = document.getElementById("eventModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
};



// Get modal element
const modal = document.getElementById("eventModal");

// Open modal
function openModal() {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // prevent background scroll
}

// Close modal
function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside content
window.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});




document.addEventListener("DOMContentLoaded", () => {

  const sessions = [
    {
      img: "images/session1.jpg",
      title: "Theme Expo",
      date: "06th Feb – 09th Feb 2026",
      desc: "Showcasing innovative ideas and prototypes that leverage science, engineering, and technology."
    },
    {
      img: "images/session2.jpg",
      title: "Tech Workshops",
      date: "07th Feb 2026",
      desc: "Hands-on sessions conducted by industry experts and academicians."
    },
    {
      img: "images/session3.jpg",
      title: "Paper Presentations",
      date: "08th Feb 2026",
      desc: "Platform for students to present research and innovative ideas."
    }
  ];

  let current = 0;

  const cardImg = document.querySelector(".highlight-card img");
  const title = document.querySelector(".highlight-content h3");
  const date = document.querySelector(".highlight-content .date");
  const desc = document.querySelector(".highlight-content .desc");
  const dots = document.querySelectorAll(".dot");

  function updateSession() {
    cardImg.src = sessions[current].img;
    title.textContent = sessions[current].title;
    date.textContent = "📅 " + sessions[current].date;
    desc.textContent = sessions[current].desc;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });
  }

  window.nextSession = function () {
    current = (current + 1) % sessions.length;
    updateSession();
  };

  window.prevSession = function () {
    current = (current - 1 + sessions.length) % sessions.length;
    updateSession();
  };

  updateSession(); // load first card
});


