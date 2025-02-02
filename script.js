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
document.getElementById('emailForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  const email = document.getElementById('email').value;
  const webAppUrl = 'https://script.google.com/macros/s/your-web-app-url/exec'; // Replace with your Web App URL

  fetch(webAppUrl, {
    method: 'POST',
    body: JSON.stringify({ email: email }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('message').textContent = 'Thank you for subscribing!';
      document.getElementById('emailForm').reset(); // Clear the form
    })
    .catch((error) => {
      document.getElementById('message').textContent = 'Something went wrong. Please try again.';
      console.error('Error:', error);
    });
});