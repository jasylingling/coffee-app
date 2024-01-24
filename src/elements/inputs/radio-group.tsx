import { ChangeEvent, FC, useId } from 'react';

type RadioGroupProps = {
  requiredInput?: boolean;
  label: string;
  inputName: string;
  options: {
    value: string;
    label: string;
  }[];
  selectedValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputError: string;
};

const RadioGroup: FC<RadioGroupProps> = ({
  requiredInput,
  label,
  inputName,
  options,
  selectedValue,
  onChange,
  inputError,
}) => {
  return (
    <>
      <p className="mt-4 block text-sm font-medium first:mt-0">
        {label}
        {requiredInput && (
          <span className="text-red-danger" title="Required field">
            *
          </span>
        )}
      </p>
      {options.map((option) => (
        <div className="radio-wrapper" key={option.value}>
          <input
            type="radio"
            name={inputName}
            id={`${inputName}-${option.value}`}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
          />
          <label htmlFor={`${inputName}-${option.value}`} className="mr-8 p-1 text-sm">
            {option.label}
          </label>
        </div>
      ))}
      <span className="error mt-[0.125rem] block text-xs text-red-danger">{inputError}</span>
    </>
  );
};

export default RadioGroup;
