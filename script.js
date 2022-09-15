const btnNext = document.querySelector(".btn-next");
const btnCheck = document.querySelector(".btn-check");
const inputBillAmountEl = document.querySelector(".bill-amount");
const inputCashGivenEl = document.querySelector(".cash-given");
const sections = document.querySelectorAll(".section");
const tableContentsEl = document.querySelectorAll(".table-conc");

const numerators = [2000, 500, 100, 20, 10, 5, 1];
const notesToGive = [0, 0, 0, 0, 0, 0, 0];
let billAmount = 0;
let cashGiven = 0;
function hideSections() {
  sections.forEach((section) => {
    if (!section.classList.contains("section--bill-amount")) {
      section.classList.add("hidden");
    }
  });
}
hideSections();
btnNext.addEventListener("click", function () {
  const value = Number(inputBillAmountEl.value);
  if (value && value > 0) {
    billAmount = value;
    sections.forEach((section) => {
      if (section.classList.contains("section--cash-given")) {
        section.classList.remove("hidden");
      }
    });
  } else {
    if (value < 0) showMessage("Insufficent funds");
    else if (Number.isNaN(value)) showMessage("Please enter a valid number");
  }
});

function calculateChange(value) {
  sections.forEach((section) => {
    if (section.classList.contains("section--return-change")) {
      section.classList.remove("hidden");
    }
  });
  numerators.forEach((note, i) => {
    const que = Math.floor(value / note);
    const rem = value % note;

    value = rem;
    // console.log(`${note} ${que}`);
    if (que > 0) {
      tableContentsEl.forEach((tablecontentEl) => {
        if (tablecontentEl.classList.contains(`note--${note}`)) {
          tablecontentEl.textContent = que;
        }
      });
    } else {
      tableContentsEl.forEach((tablecontentEl) => {
        if (tablecontentEl.classList.contains(`note--${note}`)) {
          tablecontentEl.textContent = ``;
        }
      });
    }
  });
}
btnCheck.addEventListener("click", function () {
  const value = Number(inputCashGivenEl.value);
  if (value && value > billAmount) {
    cashGiven = value;
    calculateChange(cashGiven - billAmount);
  } else {
    if (value < billAmount) showMessage("Insufficent funds");
    else if (Number.isNaN(value)) showMessage("Please enter a valid amount");
  }
});
function showMessage(Message) {
  alert(Message);
}
