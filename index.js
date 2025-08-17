const
  id = (elementId) => document.getElementById(elementId),
  elBillInput = id(`app__bill-input`),
  elCustomPercent = id(`app__custom-percent`),
  elNumberPeopleInput = id(`app__number-people-input`),
  elNumberPeopleLabelContainer = id(`app-d-number-people-labels`),
  elNumberPeopleLabel = id(`app__text-label--error`),
  elOptionsContainer = id(`app-d-tip-percent-values`),
  elResetButton = id(`app__reset-button`),
  elTipPerson = id(`tip-amount-person`),
  elTotalPerson = id(`total-person`),

  elsNumberInputs = document.querySelectorAll(`input[type=number]`),
  elsPercentOptions = Array.from(document.getElementsByClassName(`app__percent`)),

  getFormValues = () => {
    return {
      valBillInput: Number(elBillInput.value),
      valCustomPercent: Number(elCustomPercent.value),
      valNumberPersonInput: Number(elNumberPeopleInput.value),
      elPercentOption: elsPercentOptions.find(option => option.checked)
    }
  },

  calculateTip = (formValues) => {
    const
      {valBillInput, valCustomPercent, valNumberPersonInput, elPercentOption} = formValues,
      getValidNumberPerson = people => people >= 1 ? people : 1,
      mapPercentValues = {
        'five': 5,
        'ten': 10,
        'fifteen': 15,
        'twenty-five': 25,
        'fifty': 50
      },
      valPercent = mapPercentValues[elPercentOption?.value] ?? valCustomPercent,
      valTip = valBillInput * valPercent / Number(100),
      valNumberPerson = Math.trunc(getValidNumberPerson(valNumberPersonInput)),
      valTipPerson = valTip / valNumberPerson,
      valTotalPerson = (valBillInput + valTip) / valNumberPerson;

    return {valTipPerson, valTotalPerson}
  },

  updateUI = (results) => {
    const {valTipPerson, valTotalPerson} = results;

    elTipPerson.innerText = `$${valTipPerson.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    elTotalPerson.innerText = `$${valTotalPerson.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  },

  handleDOM = () => {
    updateUI(calculateTip(getFormValues()));
  },

  updateCustomPercentUI = () => {
    if (document.activeElement === elCustomPercent) {
      elsPercentOptions.forEach(option => option.checked = false);
      elCustomPercent.classList.add(`app__button-label-v-custom--active`);
    } else if (elsPercentOptions.some(option => option.checked === true)) {
        elCustomPercent.classList.remove(`app__button-label-v-custom--active`);
      }
  },

  validateNumberPeople = (valNumberPeople) => {
    if (valNumberPeople <= 0) {
      return {
        isValid: false,
        message: `Invalid value. Division will be done by 1.`
      }
    } else if (!Number.isInteger(valNumberPeople)) {
        return {
          isValid: false,
          message: `Invalid value. Division will be done by ${Math.trunc(valNumberPeople)}.`
        }
      } else {
          return {
            isValid: true,
            message: ``
          }
        }
  },

  applyValidationNumberPeopleUI = (valValidationNumberPeople) => {
    const {isValid, message} = valValidationNumberPeople;

    if (!isValid) {
      elNumberPeopleLabelContainer.classList.add(`app-d-number-people-labels--error`);
      elNumberPeopleInput.classList.add(`app__text-input--error`);
      elNumberPeopleLabel.innerText = message;
    } else {
      elNumberPeopleLabelContainer.classList.remove(`app-d-number-people-labels--error`);
      elNumberPeopleInput.classList.remove(`app__text-input--error`);
      elNumberPeopleLabel.innerText = message;
    }
  },

  resetValuesUI = () => {
    elBillInput.value = ``;

    elCustomPercent.value = ``;
    elCustomPercent.classList.remove(`app__button-label-v-custom--active`);

    elNumberPeopleInput.classList.remove(`app__text-input--error`);
    elNumberPeopleInput.value = ``;
    elNumberPeopleLabel.innerText = ``;
    elNumberPeopleLabelContainer.classList.remove(`app-d-number-people-labels--error`);

    elTipPerson.innerText = `$0.00`;
    elTotalPerson.innerText = `$0.00`;

    elsPercentOptions.forEach(option => option.checked = false);
  };

elBillInput.addEventListener(`input`, () => {handleDOM()});
elOptionsContainer.addEventListener(`input`, () => {handleDOM();
  updateCustomPercentUI();
});
elNumberPeopleInput.addEventListener(`input`, (event) => {handleDOM();
  applyValidationNumberPeopleUI(validateNumberPeople(Number(event.target.value)));  
});
elResetButton.addEventListener(`click`, () => {resetValuesUI()});
elsNumberInputs.forEach(option => option.addEventListener(`focus`, option.select));