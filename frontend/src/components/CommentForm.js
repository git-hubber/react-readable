import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { InputField, TextAreaField } from './FormField';

const validate = values => {
  const errors = {};

  if (!values.author) {
    errors.author = '* Required';
  } else if (values.author.length < 5) {
    errors.author = '* Must be 5 characters or more';
  }

  if (!values.body) {
    errors.body = '* Required';
  } else if (values.body.length < 10) {
    errors.body = '* Must be 10 characters or more';
  }

  return errors;
};

const CommentForm = ({ handleSubmit, handleCancel, submitting, pristine, reset, editMode }) => (
  <form
    onSubmit={handleSubmit}
  >
    {!editMode && (
      <div>
        <div>
          <Field
            name="author"
            label="Author"
            component={InputField}
            type="text"
            disabled={editMode}
          />
        </div>
      </div>
    )}
    <div>
      <Field
        name="body"
        label="Comment content"
        component={TextAreaField}
      />
    </div>

    <div className='main-buttons'>
      <button
        className='button button-danger'
        type="button"
        disabled={submitting}
        onClick={handleCancel}
      >
        Cancel
      </button>

      <button
        className='button'
        type="submit"
        disabled={submitting}
      >
          Submit
      </button>
    </div>
    <div className='secondary-buttons'>
      <button
        className='button'
        type="button"
        disabled={pristine || submitting}
        onClick={reset}
      >
          Start over
      </button>
    </div>
  </form>
);

export default reduxForm({
  form: 'commentForm',
  validate,
})(CommentForm);
