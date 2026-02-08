/* =====================================================
   EVENT DATA
===================================================== */
const data = {

  "Project Expo": {
    desc: "Showcase innovative electrical and electronics projects with working models and prototypes.",
    rules: [
      "Maximum 4 members per team",
      "Working model or prototype mandatory",
      "One team per college"
    ],
    fee: 800,
    p1: 3000,
    p2: 1500,
    coords: [
      "B Karthik – 8019239711",
      "S Mehaboob Basha – 8897327514"
    ]
  },

  "Paper Presentation": {
    desc: "Present your research ideas related to Electrical and Power Systems.",
    rules: [
      "Maximum 2 authors per paper",
      "IEEE format mandatory",
      "8 minutes presentation + 2 minutes Q&A"
    ],
    fee: 500,
    p1: 2000,
    p2: 1000,
    coords: [
      "P Kavya Sree – 8096990897"
    ]
  },

  "Poster Presentation": {
    desc: "Visually present innovative technical concepts and ideas.",
    rules: [
      "Poster size A1 only",
      "Original content required",
      "One poster per team"
    ],
    fee: 400,
    p1: 1500,
    p2: 800,
    coords: [
      "K Varshitha – 7396759396"
    ]
  },

  "Workshop": {
    desc: "Hands-on technical workshop conducted by industry experts.",
    rules: [
      "Individual participation",
      "Laptop compulsory",
      "Limited seats available"
    ],
    fee: 600,
    p1: 0,
    p2: 0,
    coords: [
      "A Sai Teja – 9876543210"
    ]
  },

  "Circuit Hunt": {
    desc: "Solve electrical circuits and puzzles under time pressure.",
    rules: [
      "Team of 2 members",
      "Multiple elimination rounds",
      "Basic circuit knowledge required"
    ],
    fee: 300,
    p1: 1500,
    p2: 800,
    coords: [
      "N Rohith – 9123456780"
    ]
  },

  "Technical Quiz": {
    desc: "Test your Electrical & Electronics Engineering knowledge.",
    rules: [
      "Team of 2 members",
      "MCQ + Rapid fire rounds",
      "Decision of judges is final"
    ],
    fee: 300,
    p1: 1200,
    p2: 600,
    coords: [
      "M Keerthana – 9988776655"
    ]
  },

  "Hackathon": {
    desc: "24-hour innovation challenge to solve real-world problems.",
    rules: [
      "Team of 3 to 5 members",
      "Problem statement given on spot",
      "Bring your own laptops"
    ],
    fee: 1000,
    p1: 5000,
    p2: 2500,
    coords: [
      "S Sai Kumar – 9876501234"
    ]
  },

  "Treasure Hunt": {
    desc: "Logic-based treasure hunt filled with fun and challenges.",
    rules: [
      "Team of 3 members",
      "Mobile phones allowed",
      "Follow instructions carefully"
    ],
    fee: 200,
    p1: 1000,
    p2: 500,
    coords: [
      "R Harsha – 9000011111"
    ]
  },

  "Photography": {
    desc: "Capture creative moments during the fest.",
    rules: [
      "One photo per participant",
      "Original photo only",
      "Basic editing allowed"
    ],
    fee: 200,
    p1: 1000,
    p2: 500,
    coords: [
      "V Anjali – 9887766554"
    ]
  },

  "Fun Games": {
    desc: "Exciting fun and team-based games.",
    rules: [
      "On-spot registration",
      "Rules explained at venue"
    ],
    fee: 100,
    p1: 500,
    p2: 300,
    coords: [
      "Student Coordinators"
    ]
  }
};

let selectedEvent = "";

/* =====================================================
   EVENT DETAILS MODAL
===================================================== */
function openModal(name) {
  selectedEvent = name;
  const e = data[name];

  document.getElementById("eventTitle").innerText = name;
  document.getElementById("eventDesc").innerText = e.desc;
  document.getElementById("eventFee").innerText = e.fee;
  document.getElementById("p1").innerText = e.p1;
  document.getElementById("p2").innerText = e.p2;

  const rulesList = document.getElementById("eventRules");
  rulesList.innerHTML = "";
  e.rules.forEach(rule => {
    const li = document.createElement("li");
    li.textContent = rule;
    rulesList.appendChild(li);
  });

  const coordList = document.getElementById("eventCoordinators");
  coordList.innerHTML = "";
  e.coords.forEach(coord => {
    const li = document.createElement("li");
    li.textContent = coord;
    coordList.appendChild(li);
  });

  document.getElementById("eventModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("eventModal").style.display = "none";
}

/* =====================================================
   REGISTRATION MODAL
===================================================== */
function openRegister() {
  document.getElementById("regEvent").innerText = selectedEvent;
  closeModal();
  document.getElementById("registerModal").style.display = "flex";
}

function closeRegister() {
  document.getElementById("registerModal").style.display = "none";
}

/* =====================================================
   PAYMENT + BACKEND + WHATSAPP
===================================================== */
function startPayment() {

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const college = document.getElementById("college").value.trim();

  if (!name || !email || !college) {
    alert("Please fill all details");
    return;
  }

  const amount = data[selectedEvent].fee * 100;

  const razorpay = new Razorpay({
    key: "rzp_test_xxxxxxxxxx", // 🔴 Replace with LIVE key
    amount: amount,
    currency: "INR",
    name: "EYE2K26",
    description: selectedEvent + " Registration",

    handler: function (response) {

      /* ===== SAVE TO BACKEND ===== */
      fetch("https://YOUR-BACKEND-URL.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: name,
          email: email,
          college: college,
          eventName: selectedEvent,
          amount: data[selectedEvent].fee,
          paymentId: response.razorpay_payment_id
        })
      });

      /* ===== WHATSAPP CONFIRMATION ===== */
      const message =
`🎉 *EYE2K26 Registration Confirmed* 🎉

👤 Name: ${name}
📌 Event: ${selectedEvent}
🏫 College: ${college}
💳 Payment ID: ${response.razorpay_payment_id}

📍 Venue: EEE Department, JNTUA CEA
📅 Date: 05–06 March 2026

Thank you for registering!`;

      window.open(
        "https://wa.me/918688753307?text=" + encodeURIComponent(message),
        "_blank"
      );

      alert("Payment Successful!");
      closeRegister();
    },

    theme: { color: "#00eaff" }
  });

  razorpay.open();
}

/* =====================================================
   HAMBURGER MENU
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
});
