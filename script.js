// Portfolio interactions. Everything works without a build step, so it is ready for GitHub Pages.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  // Close the mobile menu after selecting a section.
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  // Reveal elements as they enter the viewport.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

  // A small, friendly typing animation for the hero section.
  const words = ['Python.', 'Machine Learning.', 'Web Development.', 'curiosity.'];
  const target = document.getElementById('typed-text');
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const word = words[wordIndex];
    target.textContent = word.slice(0, charIndex);
    if (!deleting && charIndex < word.length) { charIndex++; setTimeout(type, 95); }
    else if (deleting && charIndex > 0) { charIndex--; setTimeout(type, 45); }
    else if (!deleting) { deleting = true; setTimeout(type, 1400); }
    else { deleting = false; wordIndex = (wordIndex + 1) % words.length; setTimeout(type, 260); }
  }
  type();
});
