const counters = document.querySelectorAll(".value");

const animateCounter = (el) => {
  const target = Number(el.dataset.target || 0);
  const duration = 900;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
    el.textContent = String(value);
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const io = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    animateCounter(entry.target);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.5 });

counters.forEach((counter) => io.observe(counter));
