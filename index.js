import { experiences } from "./options-object-list.js";
const stepsTrackerDisplay = document.querySelector(".steps-track");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const boxContent = document.querySelector(".experiences-box");
let startExpIndx = 0;

//dddd
const handleTrackerCountDisplay = (value) => {
  stepsTrackerDisplay.textContent = `${value + 1}/${experiences.length}`;
};

handleTrackerCountDisplay(startExpIndx);
const handleSetExperienceContent = (step) => {
  const { company_name, role, year, description, website } = experiences[step];
  boxContent.innerHTML = `
            <div class="box-content-top">
              <div class="">
                <h3 class="company-name">${company_name}</h3>
                <a href="${website}"  target="_blank">Website</a>
              </div>
              <p class="experience-period">${year}</p>
            </div>
            <p class="experience-title">${role}</p>
            <div class="box-content-boddy">
            ${description}
            </div>
  `;
};

handleSetExperienceContent(startExpIndx);

nextBtn.addEventListener("click", (e) => {
  if (startExpIndx === experiences.length - 1) return;
  startExpIndx += 1;
  handleTrackerCountDisplay(startExpIndx);
  handleSetExperienceContent(startExpIndx);
});

prevBtn.addEventListener("click", (e) => {
  if (startExpIndx < 1) return;
  startExpIndx -= 1;
  handleTrackerCountDisplay(startExpIndx);
  handleSetExperienceContent(startExpIndx);
});
