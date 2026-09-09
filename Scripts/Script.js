
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const bottomimg = document.querySelector(".bj-bannerbottomimg");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

    function updateBottomImgDisplay() {
      if (!bottomimg) return;
      if (window.innerWidth <= 990) {
        bottomimg.style.display = "flex";
      } else {
        bottomimg.style.display = "none";
      }
    }
    // Toggle body overflow
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'auto' : 'hidden';


    updateBottomImgDisplay();
    window.addEventListener("resize", updateBottomImgDisplay);
  })

  document.querySelectorAll(".nav-link").forEach(n => n.
      addEventListener('click', () =>{
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
  }));
}


document.querySelectorAll(".scroll").forEach((el) => {
  let isDown = false;
  let startX = 0;
  let startScrollLeft = 0;
  let moved = false;

  el.addEventListener("mousedown", (e) => {
    if (el.scrollWidth <= el.clientWidth) return;
    isDown = true;
    moved = false;
    startX = e.pageX;
    startScrollLeft = el.scrollLeft;
    el.classList.add("dragging");
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const dx = e.pageX - startX;
    if (Math.abs(dx) > 3) moved = true;
    el.scrollLeft = startScrollLeft - dx;
  });

  window.addEventListener("mouseup", () => {
    isDown = false;
    el.classList.remove("dragging");
  });

  // Prevent the drag from also triggering a click on whatever's underneath.
  el.addEventListener("click", (e) => {
    if (moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  el.addEventListener("wheel", (e) => {
    if (el.scrollWidth <= el.clientWidth) return;
    if (e.shiftKey) return; // let the browser's own shift+scroll behavior run
    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
    if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return; // let the page scroll instead
    el.scrollLeft += e.deltaY;
    e.preventDefault();
  }, { passive: false });
});

function openDemo() {
    var welcomePopup = document.getElementById('welcome-popup');
    if (welcomePopup) {
        welcomePopup.style.display = 'none';
    }
    document.getElementById('book-demo').style.display = 'flex';
}

function closeDemo() {
    document.getElementById('book-demo').style.display = 'none';
}
