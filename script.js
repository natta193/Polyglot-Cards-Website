// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Fade-in animation on scroll
  const sections = document.querySelectorAll('.section');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.fade-in').forEach(element => {
          element.style.animation = 'fadeInUp 1.5s ease-out forwards';
        });
      }
    });
  }, { threshold: 0.5 });
  
  sections.forEach(section => {
    observer.observe(section);
  });