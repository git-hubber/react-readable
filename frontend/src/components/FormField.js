import React from 'react';

export const InputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div className='form-field'>
    <input {...input} placeholder={label} type={type} id={input.name} className='text-input' />
    {touched &&
          (error && <span className='error'>{error}</span>)}
  </div>
);

export const TextAreaField = ({
  input,
  label,
  meta: { touched, error, warning },
}) => (
  <div className='form-field'>
    <textarea {...input} placeholder={label} id={input.name} className='textarea' />
    {touched &&
          (error && <span className='error'>{error}</span>)}
  </div>
);

export const SelectField = ({
  input,
  label,
  meta: { touched, error, warning },
  children,
}) => (
  <div className='form-field'>
    <select {...input} id={input.name} className='select'>
      {children}
    </select>
    {touched &&
        (error && <span className='error'>{error}</span>)}
  </div>
);
