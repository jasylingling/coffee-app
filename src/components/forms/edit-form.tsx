'use client';

import { FC, FormEvent, useReducer, useRef } from 'react';
import InputBox from '@/elements/inputs/input-box';
import Button from '@/elements/button/button';
import FavoriteHeart from '@/elements/favorite-heart/favorite-heart';
import StarRating from '@/elements/star-rating/star-rating';
import Fieldset from '@/elements/fieldset/fieldset';
import RadioGroup from '@/elements/inputs/radio-group';
import Link from 'next/link';
import { updateBrew } from '@/lib/actions';
import { Toaster, toast } from 'sonner';
import reducer, { editInitialState } from './reducer';
import { Brews } from '@/lib/definition';
import dayjs from 'dayjs';
import { MdDeleteOutline } from 'react-icons/md';

type EditFormProps = {
  brew: Brews;
};

const EditForm: FC<EditFormProps> = ({ brew }) => {
  const updateBrewWithId = updateBrew.bind(null, brew.id);

  const [state, dispatch] = useReducer(reducer, editInitialState(brew));

  const form = useRef<HTMLFormElement>(null);

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({ type: 'submit', status: 'loading' });

    // save changed brew entry only if there are no errors
    if (Object.values(state.errors).some((error) => error === true || error === undefined)) {
      dispatch({ type: 'submit', status: 'error' });
    } else {
      updateBrewWithId(new FormData(form.current!))
        .then(() => {
          dispatch({ type: 'submit', status: 'success' });
          toast.success('Deine Änderungen wurden übernommen, yay! :)');
        })
        .catch((error) => {
          console.error('Error:', error);
          dispatch({ type: 'submit', status: 'error' });
          toast.error(
            'Oh oh, irgendetwas ist schiefgelaufen. Bitte fülle die erforderlichen Felder aus und/oder versuche es nochmals!',
          );
        });
    }
  }

  return (
    <form
      ref={form}
      className="flex w-full flex-col rounded-lg border border-lightbeige-accent p-5 shadow-lg sm:w-5/6 sm:p-8 md:w-5/6 xl:w-7/12"
      onSubmit={submitHandler}
    >
      <div className="wrapper flex justify-between">
        <p className="text-xs/relaxed font-medium">
          <span className="mr-1 text-sm">🗓️</span> Zuletzt bearbeitet am {dayjs(brew.edited_at).format('DD.MM.YYYY')}
        </p>
        <div className="fav-wrapper self-end rounded-lg border-2 border-brown-primary px-3 py-[0.625rem] text-right text-sm sm:px-6">
          <FavoriteHeart buttonText />
        </div>
      </div>
      <Fieldset legend="Produkt" sectionName="product">
        <InputBox
          requiredInput
          placeholder="Name"
          label="Kaffeebohne"
          inputType="text"
          inputName="coffee_name"
          inputValue={state.values.coffee_name}
          onBlur={(e) => dispatch({ type: 'update', field: 'coffee_name', value: e.target.value })}
          onChange={(e) => dispatch({ type: 'update', field: 'coffee_name', value: e.target.value })}
          inputError={state.errors.coffee_name ? 'Coffee bean name is required' : ''}
        />
        <InputBox
          placeholder="https://awesome-coffee.com"
          label="Website (optional)"
          inputType="url"
          inputName="website"
          inputValue={state.values.website}
          onBlur={(e) => dispatch({ type: 'update', field: 'website', value: e.target.value })}
          onChange={(e) => dispatch({ type: 'update', field: 'website', value: e.target.value })}
          inputError={state.errors.website ? 'Invalid URL (Example: https://awesome-coffee.com)' : ''}
        />
        <div className="rating-input mt-4">
          <p className="mb-1 text-sm font-medium">Rating (optional)</p>
          <div className="rating-wrapper flex">
            <StarRating rating={brew.rating} />
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
          inputValue={state.values.brew_method}
          onBlur={(e) => dispatch({ type: 'update', field: 'brew_method', value: e.target.value })}
          onChange={(e) => dispatch({ type: 'update', field: 'brew_method', value: e.target.value })}
          inputError={state.errors.brew_method ? 'Brewing Method / coffee machine is required' : ''}
        />
        <RadioGroup
          requiredInput
          label="Cup Size"
          inputName="cup_size"
          options={[
            { value: '1', label: '1 Cup' },
            { value: '2', label: '2 Cup' },
          ]}
          selectedValue={state.values.cup_size.toString()}
          onChange={(e) => dispatch({ type: 'update', field: 'cup_size', value: e.target.value })}
          inputError={state.errors.cup_size ? 'Please choose a cup size' : ''}
        />
        <InputBox
          requiredInput
          placeholder="Size"
          label="Grind Size"
          inputType="number"
          inputName="grind_size"
          inputMin={0}
          inputValue={state.values.grind_size}
          onBlur={(e) => dispatch({ type: 'update', field: 'grind_size', value: e.target.value })}
          onChange={(e) => dispatch({ type: 'update', field: 'grind_size', value: e.target.value })}
          inputError={state.errors.grind_size ? 'Grind size is required' : ''}
        />
        <InputBox
          requiredInput
          placeholder="sek"
          label="Grind Amount"
          inputType="number"
          inputName="grind_amount"
          inputMin={0}
          inputStep={0.5}
          inputValue={state.values.grind_amount}
          onBlur={(e) => dispatch({ type: 'update', field: 'grind_amount', value: e.target.value })}
          onChange={(e) => dispatch({ type: 'update', field: 'grind_amount', value: e.target.value })}
          inputError={state.errors.grind_amount ? 'Grind amount is required' : ''}
        />
        <InputBox
          placeholder="sek"
          label="Startzeit / Start Kaffeefluss (optional)"
          inputType="number"
          inputName="start_time"
          inputMin={0}
          inputValue={state.values.start_time}
          onBlur={(e) => dispatch({ type: 'update', field: 'start_time', value: e.target.value })}
          onChange={(e) => dispatch({ type: 'update', field: 'start_time', value: e.target.value })}
        />
        <InputBox
          placeholder="sek"
          label="Extraktionszeit (optional)"
          inputType="number"
          inputName="extraction_time"
          inputMin={0}
          inputValue={state.values.extraction_time}
          onBlur={(e) => dispatch({ type: 'update', field: 'extraction_time', value: e.target.value })}
          onChange={(e) => dispatch({ type: 'update', field: 'extraction_time', value: e.target.value })}
        />
      </Fieldset>
      <InputBox
        placeholder="Beschreibung zu Geschmack der Kaffeebohnen, Extraktionszeit oder Sonstiges..."
        label="Notes"
        inputType="textarea"
        inputName="notes"
        inputValue={state.values.notes}
        onChange={(e) => dispatch({ type: 'update', field: 'notes', value: e.target.value })}
      />
      <div className="button-wrapper justify-between min-[500px]:flex">
        <div className="wrapper min-[500px]:flex ">
          <Button variant="primary" type="submit" disabled={state.submitStatus === 'loading'} minWidth>
            {state.submitStatus === 'loading' ? 'Saving...' : 'Save'}
          </Button>
          <Link href="/brews">
            <Button variant="secondary">Cancel</Button>
          </Link>
        </div>
        <div className="wrapper">
          <Button variant="tertiary">
            <MdDeleteOutline size={19} /> Delete
          </Button>
        </div>
        <Toaster position="bottom-center" richColors expand={true} closeButton />
      </div>
    </form>
  );
};

export default EditForm;
