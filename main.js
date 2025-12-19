document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("#year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Animazione "ad entrata" per le sezioni
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.section-animate').forEach(section => {
    observer.observe(section);
  });

  // FORM CONTATTI:
  // il submit viene gestito da send-contact.php (niente JS qui)

  // SLIDER RECENSIONI DA DATABASE
  let currentReview = 0;
  let reviewsCache = [];

  async function loadReviewsFromServer() {
    try {
      const res = await fetch('get-reviews.php');
      if (!res.ok) throw new Error('Errore risposta');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        reviewsCache = data;
      } else {
        // fallback: qualche recensione fittizia se DB vuoto
        reviewsCache = [
          { reviewer: "Luca", review: "Furgone comodissimo e servizio impeccabile. Consigliato!" },
          { reviewer: "Giulia", review: "Prenotazione facile e van pulito. Perfetto per la nostra gita!" },
          { reviewer: "Marco", review: "Ottima assistenza e prezzi onesti. Tornerò sicuramente." }
        ];
      }
      showReviews();
    } catch (e) {
      // Se errore, usa fallback locale
      reviewsCache = [
        { reviewer: "Luca", review: "Furgone comodissimo e servizio impeccabile. Consigliato!" },
        { reviewer: "Giulia", review: "Prenotazione facile e van pulito. Perfetto per la nostra gita!" },
        { reviewer: "Marco", review: "Ottima assistenza e prezzi onesti. Tornerò sicuramente." }
      ];
      showReviews();
    }
  }

  function showReviews() {
    const reviewsList = document.getElementById("reviews-list");
    if (!reviewsList || reviewsCache.length === 0) return;

    reviewsList.innerHTML = "";
    reviewsCache.forEach((r) => {
      const div = document.createElement("div");
      div.className = "review-item";
      div.innerHTML = `<div>"${r.review}"</div><div class="review-author">- ${r.reviewer}</div>`;
      reviewsList.appendChild(div);
    });
    reviewsList.style.transform = `translateX(-${currentReview * 100}%)`;
  }

  function nextReview() {
    if (reviewsCache.length === 0) return;
    currentReview = (currentReview + 1) % reviewsCache.length;
    showReviews();
  }

  if (document.getElementById("reviews-list")) {
    loadReviewsFromServer();
    setInterval(nextReview, 3500);
  }

  // Bottone "torna su"
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTop.style.display = "flex";
      } else {
        backToTop.style.display = "none";
      }
    });
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
