import { validateUrl } from '@/utils/form/validation';
import { Brews } from '@/lib/definition';

type InputValues = {
  coffee_name: string;
  website: string;
  brew_method: string;
  cup_size: string;
  grind_amount: string;
  grind_size: string;
  start_time: string;
  extraction_time: string;
  notes: string;
};

type InputErrors = {
  coffee_name?: boolean;
  website?: boolean;
  brew_method?: boolean;
  cup_size?: boolean;
  grind_amount?: boolean;
  grind_size?: boolean;
};

type FormSubmitStatus = 'loading' | 'success' | 'error' | '';

type FormState = {
  values: InputValues;
  errors: InputErrors;
  submitStatus?: FormSubmitStatus;
};

type FormAction =
  | { type: 'submit'; status: FormSubmitStatus }
  | { type: 'update'; field: keyof InputValues; value: string }
  | { type: 'reset_form' };

export const initialState: FormState = {
  values: {
    coffee_name: '',
    website: '',
    brew_method: '',
    cup_size: '',
    grind_amount: '',
    grind_size: '',
    start_time: '',
    extraction_time: '',
    notes: '',
  },
  errors: {
    coffee_name: undefined,
    website: false,
    brew_method: undefined,
    cup_size: undefined,
    grind_amount: undefined,
    grind_size: undefined,
  },
  submitStatus: '',
};

export const editInitialState = (brew: Brews): FormState => {
  return {
    values: {
      coffee_name: brew.coffee_name,
      website: brew.website,
      brew_method: brew.brew_method,
      cup_size: brew.cup_size.toString(),
      grind_amount: brew.grind_amount.toString(),
      grind_size: brew.grind_size.toString(),
      start_time: brew.start_time.toString(),
      extraction_time: brew.extraction_time.toString(),
      notes: brew.notes,
    },
    errors: {
      coffee_name: undefined,
      website: false,
      brew_method: undefined,
      cup_size: undefined,
      grind_amount: undefined,
      grind_size: undefined,
    },
    submitStatus: '',
  };
};

export default function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'submit': {
      return {
        ...state,
        submitStatus: action.status,
        errors: {
          coffee_name: state.values.coffee_name.trim() === '',
          website: state.values.website.trim() !== '' && !validateUrl(state.values.website),
          brew_method: state.values.brew_method.trim() === '',
          cup_size: state.values.cup_size.trim() === '',
          grind_amount: state.values.grind_amount.trim() === '',
          grind_size: state.values.grind_size.trim() === '',
        },
      };
    }
    case 'update': {
      return {
        values: {
          ...state.values,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]:
            action.field === 'website' ? action.value.trim() !== '' && !validateUrl(action.value) : !action.value.trim(),
        },
      };
    }
    case 'reset_form': {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
