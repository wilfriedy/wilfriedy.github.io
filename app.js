const store = {
  state: {
    currentTab: null, // this is because i want to display a different content inside tabsContentDisplay and active only when clicked
    currentActiveAccordion: 0,
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
const allProjectsTitle = document.querySelectorAll(".project-title");
// accordions
const accordionWrapper = document.querySelector(".accordion-wrapper");
// const accordionItemContainer = document.querySelector(
//   ".accordion-item-container"
// );

//section where the tabs will be displayed
const tabsContentDisplay = document.querySelector(".tabs-content-display");
const contentDisplay = [{ title: "Project name", description: "description" }]; // this is just a mock version of the actual data

function updateActiveTabUI() {
  const { currentTab } = store.getState();
  allProjectsTitle.forEach((projectTitle, index) => {
    if (index === currentTab) {
      projectTitle.classList.add("active-tab");
    } else {
      projectTitle.classList.remove("active-tab");
    }
  });
  if (currentTab != null && contentDisplay[currentTab]) {
    tabsContentDisplay.innerHTML = contentDisplay[currentTab];
  }
}

function updateAccordionUI() {
  const { currentActiveAccordion } = store.getState();
  const allAccordionBody = document.querySelectorAll(".accordion-body");
  allAccordionBody.forEach((item, index) => {
    if (index === currentActiveAccordion) {
      item.style.maxHeight = item.scrollHeight + "px";
    } else {
      item.style.maxHeight = 0 + "px";
    }
  });
}

projectSideBar.addEventListener("click", (e) => {
  const targetClick = e.target.closest(".project-title");
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
