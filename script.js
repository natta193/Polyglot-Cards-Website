// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Fade in "Mind Your Words" only when scrolling to the home section
const homeSection = document.getElementById('home');
const slogan = document.querySelector('.home .slogan');

const homeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        slogan.style.opacity = '1';
        slogan.style.transform = 'translateY(0)';
        homeObserver.unobserve(homeSection); // Stop observing after animation
      }
    });
  },
  { threshold: 0.5 } // Trigger when 50% of the section is visible
);

homeObserver.observe(homeSection);

// Handle email form submission
document.getElementById('emailForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  var email = document.getElementById('email').value;
  var params = "email=" + encodeURIComponent(email);
  
  fetch('https://script.google.com/macros/s/AKfycbwpQufe2HEqyFfrajXavqAWWIeKXB4Z0pcUHUWG-HMpjAzMYBfhpWZCH3VDf1xPMDyVwA/exec', {  // Replace with your actual URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  })
  .then(response => response.json())
  .then(result => {
    if (result.result === "success") {
      document.getElementById('response').innerText = "Email submitted successfully!";
    } else {
      document.getElementById('response').innerText = "Submission failed: " + result.error;
    }
  })
  .catch(error => {
    document.getElementById('response').innerText = "Error: " + error;
    console.error("Fetch error:", error);
  });
});

