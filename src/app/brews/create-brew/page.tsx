'use client';

import Header from '@/components/header/header';
import { ChangeEvent, FC, FormEvent, useRef, useState } from 'react';
import InputBox from '@/elements/inputs/input-box';
import Button from '@/elements/button/button';
import FavoriteHeart from '@/elements/favorite-heart/favorite-heart';
import StarRating from '@/elements/star-rating/star-rating';
import Fieldset from '@/elements/fieldset/fieldset';
import RadioGroup from '@/elements/inputs/radio-group';
import { LiaSpinnerSolid } from 'react-icons/lia';
import { validateUrl } from '@/utils/form/validation';

const CreateBrewPage: FC = () => {
  const [submitStatus, setSubmitStatus] = useState('');

  const [selectedRadio, setSelectedRadio] = useState('');

  const [inputValues, setInputValues] = useState({
    coffee_name: '',
    website: '',
    brew_method: '',
    grind_amount: '',
    grind_size: '',
    start_time: '',
    extraction_time: '',
    notes: '',
  });

  const [inputErrors, setInputErrors] = useState({
    coffee_name: '',
    website: '',
    brew_method: '',
    grind_amount: '',
    grind_size: '',
    selected_radio: '',
  });

  const form = useRef<HTMLFormElement>(null);

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitStatus('loading');

    // check for empty required fields
    if (!inputValues.coffee_name) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        coffee_name: 'Coffee bean name is required',
      }));
    }

    if (!inputValues.brew_method) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        brew_method: 'Brewing Method / coffee machine is required',
      }));
    }

    if (!inputValues.grind_amount) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        grind_amount: 'Grind amount is required',
      }));
    }

    if (!inputValues.grind_size) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        grind_size: 'Grind size is required',
      }));
    }

    if (!selectedRadio) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        selected_radio: 'Please choose a grind size',
      }));
    } else if (selectedRadio) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        selected_radio: '',
      }));
    }
  }

  function blurHandler(field: string) {
    if (field === 'coffee_name' && !inputValues.coffee_name.trim()) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        coffee_name: 'Coffee bean name is required',
      }));
    } else if (field === 'website' && inputValues.website !== '' && !validateUrl(inputValues.website.trim())) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        website: 'Invalid URL (Example: https://awesome-coffee.com)',
      }));
    } else if (field === 'brew_method' && !inputValues.brew_method.trim()) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        brew_method: 'Brewing Method / coffee machine is required',
      }));
    } else if (field === 'grind_amount' && !inputValues.grind_amount.trim()) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        grind_amount: 'Grind amount is required',
      }));
    } else if (field === 'grind_size' && !selectedRadio) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        grind_size: 'Grind size is required',
      }));
    } else {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        [field]: '',
      }));
    }
  }

  function changeHandler(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setInputValues((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  function radioHandler(e: ChangeEvent<HTMLInputElement>) {
    setSelectedRadio(e.target.value);
  }

  return (
    <>
      <Header>New Brew</Header>
      <form
        ref={form}
        className="flex w-full flex-col rounded-lg border border-lightbeige-accent p-5 shadow-lg sm:w-5/6 sm:p-8 md:w-5/6 xl:w-7/12"
        onSubmit={submitHandler}
      >
        <div className="fav-wrapper self-end rounded-lg border-2 border-brown-primary px-3 py-[0.625rem] text-right text-sm sm:px-6">
          <FavoriteHeart buttonText />
        </div>
        <Fieldset legend="Produkt" sectionName="product">
          <InputBox
            requiredInput
            placeholder="Name"
            label="Kaffeebohne"
            inputType="text"
            inputName="coffee_name"
            inputValue={inputValues.coffee_name}
            onBlur={() => blurHandler('coffee_name')}
            onChange={changeHandler}
            inputError={inputErrors.coffee_name}
          />
          <InputBox
            placeholder="https://awesome-coffee.com"
            label="Website (optional)"
            inputType="url"
            inputName="website"
            inputValue={inputValues.website}
            onBlur={() => blurHandler('website')}
            onChange={changeHandler}
            inputError={inputErrors.website}
          />
          <div className="rating-input mt-4">
            <p className="mb-1 text-sm font-medium">Rating</p>
            <div className="rating-wrapper flex">
              <StarRating />
            </div>
          </div>
        </Fieldset>
        <Fieldset legend="Setting" sectionName="setting">
          <InputBox
            requiredInput
            placeholder="Modellname"
            label="Brewing Method / Kaffeemaschine"
            inputType="text"
            inputName="brew_method"
            inputValue={inputValues.brew_method}
            onBlur={() => blurHandler('brew_method')}
            onChange={changeHandler}
            inputError={inputErrors.brew_method}
          />
          <InputBox
            requiredInput
            placeholder="sek"
            label="Grind Amount"
            inputType="number"
            inputName="grind_amount"
            inputMin={0}
            inputStep={0.5}
            inputValue={inputValues.grind_amount}
            onBlur={() => blurHandler('grind_amount')}
            onChange={changeHandler}
            inputError={inputErrors.grind_amount}
          />
          <RadioGroup
            requiredInput
            label="Grind Size"
            inputName="grind-size"
            options={[
              { value: 'cup-1', label: '1 Cup' },
              { value: 'cup-2', label: '2 Cup' },
            ]}
            selectedValue={selectedRadio}
            onChange={radioHandler}
            inputError={inputErrors.selected_radio}
          />
          <InputBox
            placeholder="sek"
            label="Startzeit / Start Kaffeefluss (optional)"
            inputType="number"
            inputName="start_time"
            inputMin={0}
            inputValue={inputValues.start_time}
            onBlur={() => blurHandler('start_time')}
            onChange={changeHandler}
          />
          <InputBox
            placeholder="sek"
            label="Extraktionszeit (optional)"
            inputType="number"
            inputName="extraction_time"
            inputMin={0}
            inputValue={inputValues.extraction_time}
            onBlur={() => blurHandler('extraction_time')}
            onChange={changeHandler}
          />
        </Fieldset>
        <InputBox
          placeholder="Beschreibung zu Geschmack der Kaffeebohnen, Extraktionszeit oder Sonstiges..."
          label="Notes"
          inputType="textarea"
          inputName="notes"
          inputValue={inputValues.notes}
          onChange={changeHandler}
        />
        {submitStatus === 'loading' && (
          <p className="mt-6 font-bold capitalize tracking-widest text-red-danger">
            <LiaSpinnerSolid size={30} />
            loading...
          </p>
        )}
        <div className="button-wrapper min-[500px]:flex">
          <Button variant="primary">Save</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </form>
    </>
  );
};

export default CreateBrewPage;
