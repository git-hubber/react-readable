import React from 'react';

export const InputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <label htmlFor={input.name}>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} id={input.name} />
      {touched &&
          (error && <span>{error}</span>)}
    </div>
  </div>
);

export const TextAreaField = ({
  input,
  label,
  meta: { touched, error, warning },
}) => (
  <div>
    <label htmlFor={input.name}>{label}</label>
    <div>
      <textarea {...input} placeholder={label} id={input.name} />
      {touched &&
          (error && <span>{error}</span>)}
    </div>
  </div>
);

export const SelectField = ({
  input,
  label,
  meta: { touched, error, warning },
  children,
}) => (
  <div>
    <label htmlFor={input.name}>{label}</label>
    <div>
      <select {...input} id={input.name}>
        {children}
      </select>
      {touched &&
        (error && <span>{error}</span>)}
    </div>
  </div>
);
