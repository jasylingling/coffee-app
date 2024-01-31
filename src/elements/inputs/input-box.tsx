import { ChangeEvent, FC, FocusEvent, HTMLInputTypeAttribute, useId } from 'react';

type InputBoxProps = {
  requiredInput?: boolean;
  placeholder?: string;
  label: string;
  inputType: HTMLInputTypeAttribute;
  inputName: string;
  inputMin?: number;
  inputStep?: number;
  inputValue: string | number;
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  inputError?: string;
};

const InputBox: FC<InputBoxProps> = ({
  requiredInput,
  placeholder,
  label,
  inputType,
  inputName,
  inputMin,
  inputStep,
  inputValue,
  onBlur,
  onChange,
  inputError,
}) => {
  const uniqueId = useId();
  const styleInput = 'rounded-lg py-2 px-3 border flex text-sm tracking-wide w-full my-1';

  return (
    <>
      <label
        htmlFor={uniqueId}
        className={`mt-4 inline-block first:mt-0 ${
          inputType === 'textarea' ? 'text-medium font-semibold' : 'text-sm font-medium'
        }`}
      >
        {label}
        {requiredInput && (
          <span className="text-red-danger" title="Required field">
            *
          </span>
        )}
      </label>
      {inputType === 'textarea' ? (
        <textarea
          placeholder={placeholder}
          name={inputName}
          id={uniqueId}
          cols={30}
          rows={10}
          value={inputValue}
          onBlur={onBlur}
          onChange={onChange}
          className={`mb-6 ${styleInput}`}
        />
      ) : (
        <input
          placeholder={placeholder}
          type={inputType}
          name={inputName}
          min={inputMin}
          step={inputStep}
          id={uniqueId}
          value={inputValue}
          onBlur={onBlur}
          onChange={onChange}
          className={styleInput}
        />
      )}
      <span className="error block text-xs text-red-danger">{inputError}</span>
    </>
  );
};

export default InputBox;
