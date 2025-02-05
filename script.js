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

  // Show the spinner (loading icon)
  document.getElementById('loading').style.display = 'block';
  // Clear any previous response message
  document.getElementById('response').innerText = '';
  
  var email = document.getElementById('email').value;
  var params = "email=" + encodeURIComponent(email);
  
  fetch('https://script.google.com/macros/s/AKfycbz4g4GCnjgfYOAVdjn3lSPhMI-0oO_AUMuHnp2VEIMKhFFtbIUyEgak9Sfaf-kyc2qPFw/exec', {  // Replace with your actual URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  })
  .then(response => response.json())
  .then(result => {
    // Hide the spinner once the request is done
    document.getElementById('loading').style.display = 'none';

    if (result.result === "success") {
      document.getElementById('response').innerText = "Email submitted successfully!";
    } else {
      document.getElementById('response').innerText = "Submission failed: " + result.error;
    }
  })
  .catch(error => {
    // Hide the spinner on error
    document.getElementById('loading').style.display = 'none';
    document.getElementById('response').innerText = "Error: " + error;
    console.error("Fetch error:", error);
  });
});

// BACKGROUND
// Helper: Convert a hex color string to an RGB object.
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(function(h) { return h + h; }).join('');
  }
  var bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

// Helper: Linearly interpolate between two hex colors based on a factor (0 to 1).
function interpolateColor(hex1, hex2, factor) {
  var c1 = hexToRgb(hex1);
  var c2 = hexToRgb(hex2);
  return {
    r: Math.round(c1.r + factor * (c2.r - c1.r)),
    g: Math.round(c1.g + factor * (c2.g - c1.g)),
    b: Math.round(c1.b + factor * (c2.b - c1.b))
  };
}

// Update the background color based on scroll position.
function updateBackgroundColor() {
  // Calculate normalized scroll progress (0 at top, 1 at bottom)
  var scrollTop = window.scrollY || document.documentElement.scrollTop;
  var docHeight = document.documentElement.scrollHeight - window.innerHeight;
  var p = docHeight ? (scrollTop / docHeight) : 0;

  // Define the colors for each page.
  const color1 = "#F5F2EC";
  const color2 = "#B8E0E5";
  const color3 = "#E7F4D7";
  const color4 = "#E9D8FD";


  let bgColor;

  // Determine which range p falls into.
  if (p < 0.10) {
    // Solid Page 1.
    bgColor = color1;
  } else if (p < 0.30) {
    // Transition from Page 1 to Page 2.
    let factor = (p - 0.10) / 0.20; // factor goes from 0 to 1 between 0.10 and 0.30
    let c = interpolateColor(color1, color2, factor);
    bgColor = `rgb(${c.r}, ${c.g}, ${c.b})`;
  } else if (p < 0.40) {
    // Solid Page 2.
    bgColor = color2;
  } else if (p < 0.60) {
    // Transition from Page 2 to Page 3.
    let factor = (p - 0.40) / 0.20; // factor goes from 0 to 1 between 0.40 and 0.60
    let c = interpolateColor(color2, color3, factor);
    bgColor = `rgb(${c.r}, ${c.g}, ${c.b})`;
  } else if (p < 0.70) {
    // Solid Page 3.
    bgColor = color3;
  } else if (p < 0.90) {
    // Transition from Page 3 to Page 4.
    let factor = (p - 0.70) / 0.20; // factor goes from 0 to 1 between 0.70 and 0.90
    let c = interpolateColor(color3, color4, factor);
    bgColor = `rgb(${c.r}, ${c.g}, ${c.b})`;
  } else {
    // Solid Page 4.
    bgColor = color4;
  }

  // Apply the background color.
  document.body.style.background = bgColor;
}

// Function to get nav height and position triangles
function initializeTriangles() {
  const homeSection = document.getElementById('home');
  const journeySection = document.getElementById('journey'); // Add journey section
  if (!homeSection || !journeySection) return;

  // Create triangles for home section if they don't exist
  if (!document.querySelector('.triangle-top-left')) {
    const topTriangle = document.createElement('div');
    topTriangle.className = 'triangle-top-left';
    homeSection.appendChild(topTriangle);
  }
  if (!document.querySelector('.triangle-bottom-right')) {
    const bottomTriangle = document.createElement('div');
    bottomTriangle.className = 'triangle-bottom-right';
    homeSection.appendChild(bottomTriangle);
  }

  // Create triangles for journey section if they don't exist
  if (!document.querySelector('.triangle-top-right')) {
    const topTriangle = document.createElement('div');
    topTriangle.className = 'triangle-top-right';
    journeySection.appendChild(topTriangle);
  }
  if (!document.querySelector('.triangle-bottom-left')) {
    const bottomTriangle = document.createElement('div');
    bottomTriangle.className = 'triangle-bottom-left';
    journeySection.appendChild(bottomTriangle);
  }

  // Get nav height and update top triangle positions
  const nav = document.querySelector('nav');
  const navHeight = nav.offsetHeight;
  const triangleTopLeft = document.querySelector('.triangle-top-left');
  const triangleTopRight = document.querySelector('.triangle-top-right');
  if (triangleTopLeft) triangleTopLeft.style.top = `${navHeight}px`;
  if (triangleTopRight) triangleTopRight.style.top = `${navHeight}px`;

  updateTriangles(); // Initial position update
}

function updateTriangles() {
  const homeSection = document.getElementById('home');
  const journeySection = document.getElementById('journey'); // Add journey section
  const triangleTopLeft = document.querySelector('.triangle-top-left');
  const triangleBottomRight = document.querySelector('.triangle-bottom-right');
  const triangleTopRight = document.querySelector('.triangle-top-right');
  const triangleBottomLeft = document.querySelector('.triangle-bottom-left');
  
  if (!triangleTopLeft || !triangleBottomRight || !triangleTopRight || !triangleBottomLeft) return;
  
  const scrollPosition = window.scrollY;
  const viewportHeight = window.innerHeight;

  // Home section triangles (top-left and bottom-right)
  if (homeSection.getBoundingClientRect().top <= 0 && homeSection.getBoundingClientRect().bottom >= 0) {
    const scrollProgressHome = Math.min(1, Math.max(0, scrollPosition / viewportHeight));
    const leftTranslation = -scrollProgressHome * 300; // Slide in from left
    const rightTranslation = scrollProgressHome * 300; // Slide in from right
    const opacityHome = 1 - scrollProgressHome;
    
    triangleTopLeft.style.transform = `translateX(${leftTranslation}px)`;
    triangleBottomRight.style.transform = `translateX(${rightTranslation}px)`;
    triangleTopLeft.style.opacity = opacityHome;
    triangleBottomRight.style.opacity = opacityHome;
  } else {
    // Hide home section triangles when not in view
    triangleTopLeft.style.opacity = 0;
    triangleBottomRight.style.opacity = 0;
  }

  // Journey section triangles (top-right and bottom-left)
  if (journeySection.getBoundingClientRect().top <= 0 && journeySection.getBoundingClientRect().bottom >= 0) {
    const scrollProgressJourney = Math.min(1, Math.max(0, (scrollPosition - journeySection.offsetTop) / viewportHeight)); // TODO FIX THIS LINE
    const rightTranslationJourney = scrollProgressJourney * 300; // Slide in from right (like bottom-right)
    const leftTranslationJourney = -scrollProgressJourney * 300; // Slide in from left (like top-left)
    const opacityJourney = 1 - scrollProgressJourney;
    
    triangleTopRight.style.transform = `translateX(${rightTranslationJourney}px)`; // Like bottom-right
    triangleBottomLeft.style.transform = `translateX(${leftTranslationJourney}px)`; // Like top-left
    triangleTopRight.style.opacity = opacityJourney;
    triangleBottomLeft.style.opacity = opacityJourney;
  } else {
    // Hide journey section triangles when not in view
    triangleTopRight.style.opacity = 0;
    triangleBottomLeft.style.opacity = 0;
  }
}

// Add the event listeners
document.addEventListener('DOMContentLoaded', initializeTriangles);
window.addEventListener('scroll', updateTriangles);
window.addEventListener('resize', () => {
  initializeTriangles(); // Recalculate on resize
  updateTriangles();
});

// Attach event listeners to update the background on scroll and on page load.
window.addEventListener('scroll', updateBackgroundColor);
window.addEventListener('load', updateBackgroundColor);
