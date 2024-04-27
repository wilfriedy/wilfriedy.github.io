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
const projectSideBar = document.querySelector(".project-side-tab");
const allProjectsTitle = document.querySelectorAll(".project-title");
// accordions
const accordionItem = document.querySelector(".accordion-item");
const accordionItemContainer = document.querySelector(
  ".accordion-item-container"
);

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
  const allAccordionItems = document.querySelectorAll(".accordion-item");
  allAccordionItems.forEach((item, index) => {
    item.classList.toggle("active-accordion", index === currentActiveAccordion);
  });
}

store.subscribe(updateActiveTabUI);
store.subscribe(updateAccordionUI);

projectSideBar.addEventListener("click", (e) => {
  const targetClick = e.target.closest(".project-title");
  if (!targetClick) return;
  const position = +targetClick.dataset.pos;
  store.updateState("currentTab", position);
});
