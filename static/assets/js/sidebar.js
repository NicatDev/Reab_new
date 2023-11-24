const navSlide = () => {
  const burger = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".main-nav-js");
  const navLinks = document.querySelectorAll(
    ".main-nav-js .menu-list .menu-item"
  );
  const menuClose = document.querySelector(".menu-close-btn");
  if (burger) {
    burger.addEventListener("click", () => {
      nav.classList.add("show-menu");
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.4s ease forwards ${
            index / 10 + 0.5
          }s `;
        }
      });
    });
    menuClose.addEventListener("click", () => {
      nav.classList.remove("show-menu");
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.4s ease forwards ${
            index / 10 + 0.5
          }s `;
        }
      });
    });
  }
};
navSlide();
$(".main-nav-js .bi").on("click", function (event) {
  var $fl = $(this);
  $(this).parent().siblings().find(".sub-menu").slideUp();
  $(this).parent().siblings().find(".bi").addClass("fal fa-plus");
  if ($fl.hasClass("fal fa-plus")) {
    $fl.removeClass("fal fa-plus").addClass("fal fa-minus");
  } else {
    $fl.removeClass("fal fa-minus").addClass("fal fa-plus");
  }
  $fl.next(".sub-menu").slideToggle();
});
