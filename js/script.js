document.addEventListener("DOMContentLoaded", () => {


  const sizeRadios = document.querySelectorAll('input[name="size"]');
  const subscriptions = document.querySelectorAll('.subscription');

  sizeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      subscriptions.forEach(sub => sub.classList.remove('active'));
      const parent = radio.closest('.subscription');
      if (parent) parent.classList.add('active');
    });
  });


  const items = document.querySelectorAll(".list-ctn");

  items.forEach(item => {
    const header = item.querySelector(".header");
    const icon = item.querySelector(".icon");

    if (!header || !icon) return;

    header.addEventListener("click", () => {
      items.forEach(i => {
        i.classList.remove("active");
        const ic = i.querySelector(".icon");
        if (ic) ic.textContent = "+";
      });

      item.classList.add("active");
      icon.textContent = "−";
    });
  });


  const images = [
    "./assets/pro-4.png",
    "./assets/pro-5.png",
    "./assets/pro-6.png",
    "./assets/pro-7.png",
     "./assets/pro-4.png",
    "./assets/pro-5.png",
    "./assets/pro-6.png",
    "./assets/pro-7.png"
  ];

  let index = 0;

  const currentImage = document.getElementById("currentImage");
  const thumbs = document.querySelectorAll(".thumbnails img");
  const dotsContainer = document.getElementById("dots");

  if (currentImage && dotsContainer && thumbs.length > 0) {

    images.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.addEventListener("click", () => showImage(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll("span");

    function showImage(i) {
      index = i;
      currentImage.src = images[index];

      thumbs.forEach(t => t.classList.remove("active"));
      dots.forEach(d => d.classList.remove("active"));

      thumbs[index].classList.add("active");
      dots[index].classList.add("active");
    }

    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    if (prevBtn)
      prevBtn.onclick = () =>
        showImage((index - 1 + images.length) % images.length);

    if (nextBtn)
      nextBtn.onclick = () =>
        showImage((index + 1) % images.length);

    thumbs.forEach((thumb, i) => {
      thumb.onclick = () => showImage(i);
    });

    showImage(0);
  }

  const counters = document.querySelectorAll(".counter");

  const startCounter = (counter) => {
    const target = +counter.dataset.target;
    let current = 0;
    const increment = Math.ceil(target / 60);

    const update = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + "%";
      } else {
        counter.textContent = current + "%";
        requestAnimationFrame(update);
      }
    };

    update();
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          obs.unobserve(entry.target); 
        }
      });
    },
    { threshold: 0.6 } 
  );

  counters.forEach(counter => observer.observe(counter));

   const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
    hamburger.classList.toggle("open");
  });


  const addToCartBtn = document.getElementById("addToCart");

  sizeRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      subscriptions.forEach(sub => sub.classList.remove("active"));
      radio.closest(".subscription")?.classList.add("active");
      updateAddToCart();
    });
  });


  document.querySelectorAll(".purchase-option").forEach(option => {
    option.addEventListener("click", () => {
      const parent = option.closest(".subscription");
      parent.querySelectorAll(".purchase-option")
        .forEach(o => o.classList.remove("active"));

      option.classList.add("active");
      updateAddToCart();
    });
  });

  document.querySelectorAll(
    'input[name="fragrance"],input[name="fragrance1"], input[name="fragrance2"]'
  ).forEach(radio => {
    radio.addEventListener("change", updateAddToCart);
  });

  function updateAddToCart() {
    const activeSub = document.querySelector(".subscription.active");
    if (!activeSub) return;

    const type = activeSub.querySelector('input[name="size"]')?.value;


    const fragrance = activeSub.querySelector(
      'input[name="fragrance"]:checked'
    )?.value;

    const fragrance1 = activeSub.querySelector(
      'input[name="fragrance1"]:checked'
    )?.value;

    const fragrance2 = activeSub.querySelector(
      'input[name="fragrance2"]:checked'
    )?.value;

    const purchase = activeSub.querySelector(".purchase-option.active")
      ?.dataset.purchase;

    if (!type || !purchase) return;

    let link = `/cart?type=${type}&purchase=${purchase}`;

     if (fragrance) link += `&fragrance=${fragrance}`;
    if (fragrance1) link += `&fragrance1=${fragrance1}`;
    if (fragrance2) link += `&fragrance2=${fragrance2}`;

    addToCartBtn.dataset.link = link;
    console.log("Add to cart:", link);
  }


  addToCartBtn.addEventListener("click", () => {
    alert(addToCartBtn.dataset.link);
  });

  updateAddToCart();

});
