import { projectsData } from "./projects.js";

const store = {
  state: {
    currentTab: null, // this is because i want to display a different content inside tabsContentDisplay and active only when clicked
    currentActiveAccordion: null,
  },
  listeners: [],

  getState() {
    return this.state;
  },

  updateState(property, value) {
    this.state[property] = value;
    this.listeners.forEach((listener) => listener());
  },

  subscribe(listener) {
    this.listeners.push(listener);
  },
};

// get the side bars
const projectSideBar = document.querySelector(".projects-list");
const allProjectsTitle = document.querySelectorAll(".project-item");
// accordions
const accordionWrapper = document.querySelector(".accordion-wrapper");

//section where the tabs will be displayed
const tabsContentDisplay = document.querySelector(".tabs-content-display");
// mobile nav
const sideBarBtn = document.querySelector(".click-open");
const sideBar = document.querySelector(".side-bar");

sideBarBtn.addEventListener("click", (e) => {
  const sideBarIsOpen = sideBar.classList.contains("opened-side-bar");
  const closeIcon = sideBarBtn.firstChild;
  if (sideBarIsOpen) {
    sideBar.classList.remove("opened-side-bar");
    closeIcon.className = "ph ph-arrow-square-right";
  } else {
    sideBar.classList.add("opened-side-bar");
    closeIcon.className = "ph ph-arrow-square-left";
  }
});

function updateActiveTabUI() {
  const { currentTab } = store.getState();
  allProjectsTitle.forEach((projectTitle, index) => {
    if (index === currentTab) {
      projectTitle.classList.add("active-tab");
    } else {
      projectTitle.classList.remove("active-tab");
    }
  });
  if (currentTab != null && projectsData[currentTab]) {
    tabsContentDisplay.innerHTML = projectsData[currentTab].description;
  }
}

function updateAccordionUI() {
  const { currentActiveAccordion } = store.getState();
  const allAccordionBody = document.querySelectorAll(".accordion-body");
  allAccordionBody.forEach((item, index) => {
    const header = item.previousElementSibling;
    if (index === currentActiveAccordion) {
      header.classList.add("active-accordion-index");
      item.style.maxHeight = item.scrollHeight + "px";
    } else {
      header.classList.remove("active-accordion-index");
      item.style.maxHeight = 0 + "px";
    }
  });
}

projectSideBar.addEventListener("click", (e) => {
  const targetClick = e.target.closest(".project-item");
  if (!targetClick) return;
  const position = +targetClick.dataset.pos;
  store.updateState("currentTab", position);
});

// accordion
accordionWrapper.addEventListener("click", (e) => {
  const accordionItem = e.target.closest(".accordion-head");
  if (!accordionItem) return;
  const position = +accordionItem.dataset.accordionActive;
  store.updateState("currentActiveAccordion", position);
});

store.subscribe(updateActiveTabUI);
store.subscribe(updateAccordionUI);
