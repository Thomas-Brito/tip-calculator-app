const
  numberPeopleLabelContainer = document.getElementById(`app-d-number-people-labels`),
  numberPeopleLabel = document.getElementById(`app__text-label--error`),
  tipPerson = document.getElementById(`tip-amount-person`),
  totalPerson = document.getElementById(`total-person`),
  bill = document.getElementById(`app__bill-input`),
  numberPeople = document.getElementById(`app__number-people-input`),
  options = document.getElementById(`app-d-tip-percent-values`),
  resetButton = document.getElementById(`app__reset-button`),
  customPercent = document.getElementById(`app__custom-percent`),
  numberInputs = document.querySelectorAll(`input[type=number]`),
  percentOptions = Array.from(document.getElementsByClassName(`app__percent`));

let
  percentCurrentOption,
  billValue,
  customPercentValue,
  numberPeopleValue,
  percent,
  tipTotal,
  tipPerPerson,
  totalPerPerson;

const tipCalculator = () => {

  billValue = Number(bill.value);
  customPercentValue = Number(customPercent.value);
  numberPeopleValue = Number(numberPeople.value);
  percentCurrentOption = percentOptions.filter(option => option.checked === true);

  switch (percentCurrentOption[0]?.value) {
    case `five`: percent = Number(5);
    break;
    case `ten`: percent = Number(10);
    break;
    case `fifteen`: percent = Number(15);
    break;
    case `twenty-five`: percent = Number(25);
    break;
    case `fifty`: percent = Number(50);
    break;
    default: percent = customPercentValue;
    break;
  }

  tipTotal = (billValue * percent / Number(100));
  tipPerPerson = tipTotal / (numberPeopleValue >= 1 ? numberPeopleValue : Number(1));
  totalPerPerson = (billValue + tipTotal) / (numberPeopleValue >= 1 ? numberPeopleValue : Number(1));
  
  tipPerson.innerText = `$${tipPerPerson.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  totalPerson.innerText = `$${totalPerPerson.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const adjustingChecked = () => {

  if (document.activeElement === customPercent) {
    percentOptions.forEach(option => option.checked = false);
    customPercent.classList.add(`app__button-label-v-custom--active`);
  } else if (percentOptions.some(option => option.checked === true)) {
      customPercent.classList.remove(`app__button-label-v-custom--active`);
    }
}

const validateNumberPeople = () => {

  if (document.activeElement === numberPeople) {
    if (numberPeopleValue <= 0) {
      numberPeopleLabelContainer.classList.add(`app-d-number-people-labels--error`);
      numberPeople.classList.add(`app__text-input--error`);
      numberPeopleLabel.innerText = `Enter a number greater than zero`;
    } else {
        numberPeopleLabelContainer.classList.remove(`app-d-number-people-labels--error`);
        numberPeople.classList.remove(`app__text-input--error`);
        numberPeopleLabel.innerText = ``;
      }
  }
}

bill.addEventListener(`input`, () => {tipCalculator()});
options.addEventListener(`input`, () => {tipCalculator(); adjustingChecked()});
numberPeople.addEventListener(`input`, () => {tipCalculator(); validateNumberPeople()});

resetButton.addEventListener(`click`, () => {
  bill.value = 0;
  percentOptions.forEach(option => option.checked = false);
  numberPeople.value = Number(1);
  tipPerson.innerText = `$0.00`;
  totalPerson.innerText = `$0.00`;
  customPercent.value = ``;
  customPercent.classList.remove(`app__button-label-v-custom--active`);
  numberPeopleLabelContainer.classList.remove(`app-d-number-people-labels--error`);
  numberPeople.classList.remove(`app__text-input--error`);
  numberPeopleLabel.innerText = ``;
});

numberInputs.forEach(option => option.addEventListener(`focus`, option.select));