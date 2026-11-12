
const navigation = document.querySelector(".navigation");
const filterToggle = document.querySelector(".navigation__toggle");

if (navigation && filterToggle) {
  filterToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-filters-open");

    filterToggle.setAttribute("aria-expanded", isOpen);
  });
}
