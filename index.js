const
  id = (id) => document.getElementById(id),
  bill = id(`app__bill-input`),
  options = id(`app-d-tip-percent-values`),
  numberPeople = id(`app__number-people-input`),
  resetButton = id(`app__reset-button`),
  numberInputs = document.querySelectorAll(`input[type=number]`),
  tipPerson = id(`tip-amount-person`),
  totalPerson = id(`total-person`),
  customPercent = id(`app__custom-percent`),
  numberPeopleLabelContainer = id(`app-d-number-people-labels`),
  numberPeopleLabel = id(`app__text-label--error`),
  percentOptions = Array.from(document.getElementsByClassName(`app__percent`)); 

const tipCalculator = () => {

  const
    getValidPeopleCount = people => people >= 1 ? people : 1,
    percentMap = {
      'five': 5,
      'ten': 10,
      'fifteen': 15,
      'twenty-five': 25,
      'fifty': 50
    }

  let
    percentCurrentOption = percentOptions.find(option => option.checked),
    customPercentValue = Number(customPercent.value),
    percent = percentMap[percentCurrentOption?.value] ?? customPercentValue,
    billValue = Number(bill.value),
    tipTotal = (billValue * percent / Number(100)),
    numberPeopleValue = Number(numberPeople.value),
    tipPerPerson = tipTotal / getValidPeopleCount(numberPeopleValue),
    totalPerPerson = (billValue + tipTotal) / getValidPeopleCount(numberPeopleValue);

  return {tipPerPerson, totalPerPerson}
}

const updateUI = (results) => {

  let {tipPerPerson, totalPerPerson} = results;

  tipPerson.innerText = `$${tipPerPerson.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  totalPerson.innerText = `$${totalPerPerson.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const updateCustomPercentUI = () => {

  if (document.activeElement === customPercent) {
    percentOptions.forEach(option => option.checked = false);
    customPercent.classList.add(`app__button-label-v-custom--active`);
  } else if (percentOptions.some(option => option.checked === true)) {
      customPercent.classList.remove(`app__button-label-v-custom--active`);
    }
}

const validateNumberPeople = (peopleCount) => {

  if (document.activeElement === numberPeople) {
    if (peopleCount <= 0) {
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

const resetValues = () => {
  bill.value = ``;
  percentOptions.forEach(option => option.checked = false);
  numberPeople.value = Number(1);
  tipPerson.innerText = `$0.00`;
  totalPerson.innerText = `$0.00`;
  customPercent.value = ``;
  customPercent.classList.remove(`app__button-label-v-custom--active`);
  numberPeopleLabelContainer.classList.remove(`app-d-number-people-labels--error`);
  numberPeople.classList.remove(`app__text-input--error`);
  numberPeopleLabel.innerText = ``;
}

bill.addEventListener(`input`, () => {updateUI(tipCalculator())});
options.addEventListener(`input`, () => {updateUI(tipCalculator()); updateCustomPercentUI()});
numberPeople.addEventListener(`input`, () => {updateUI(tipCalculator()); validateNumberPeople(Number(numberPeople.value))});
resetButton.addEventListener(`click`, () => {resetValues()});
numberInputs.forEach(option => option.addEventListener(`focus`, option.select));