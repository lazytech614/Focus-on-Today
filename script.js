const checkBoxList = document.querySelectorAll(".checkbox");
const inputFieldList = document.querySelectorAll("input");
const warningContainer = document.querySelector(".warning-container");
const progressLevel = document.querySelector(".progress-level");
const progressValue = document.querySelector(".progress-level span");
const motivation = document.querySelector("#motivation");
const clearBtn = document.querySelector("#clear-btn");

const numberOfInput = inputFieldList.length;

const allMotivation = [
  "Raise the bar by completing your goals!",
  "The journey of a thousand miles begins with one step.",
  "Believe you can and you're halfway there.",
  "Whoa! You just completed all the goals, time for chill :)",
];

let allFieldsFilled = false;

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

let completedGoalsCount = Object.values(allGoals).filter((goal) => {
  return goal.completed;
}).length;

progressLevel.style.width = `${(completedGoalsCount / numberOfInput) * 100}%`;
progressValue.innerText = `${completedGoalsCount}/${numberOfInput} completed`;
motivation.innerText = allMotivation[completedGoalsCount];

checkBoxList.forEach((checkBox) => {
  checkBox.addEventListener("click", () => {
    const allFieldsFilled = [...inputFieldList].every((input) => {
      return input.value;
    });
    const inputID = checkBox.nextElementSibling.id;
    console.log(inputID);
    if (allFieldsFilled) {
      checkBox.parentElement.classList.toggle("completed");
      allGoals[inputID].completed = !allGoals[inputID].completed;
      completedGoalsCount = Object.values(allGoals).filter((goal) => {
        return goal.completed;
      }).length;
      progressLevel.style.width = `${
        (completedGoalsCount / numberOfInput) * 100
      }%`;
      progressValue.innerText = `${completedGoalsCount}/${numberOfInput} completed`;
      motivation.innerText = allMotivation[completedGoalsCount];
    } else {
      warningContainer.classList.add("show-error");
    }
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});

inputFieldList.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    warningContainer.classList.remove("show-error");
  });
  input.addEventListener("input", (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    } else {
      if (allGoals[input.id]) {
        allGoals[input.id].name = input.value;
      } else {
        allGoals[input.id] = {
          name: input.value,
          completed: false,
        };
      }
    }
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});
