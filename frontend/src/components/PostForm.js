import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { InputField, TextAreaField, SelectField } from './FormField';

const validate = values => {
  const errors = {};

  if (!values.category) {
    errors.category = '* Required';
  }

  if (!values.author) {
    errors.author = '* Required';
  } else if (values.author.length < 5) {
    errors.author = '* Must be 5 characters or more';
  }

  if (!values.title) {
    errors.title = '* Required';
  } else if (values.title.length < 5) {
    errors.title = '* Must be 5 characters or more';
  }

  if (!values.body) {
    errors.body = '* Required';
  } else if (values.body.length < 10) {
    errors.body = '* Must be 10 characters or more';
  }

  return errors;
};

const PostForm = ({ categories, handleSubmit, handleCancel, submitting, pristine, reset, editMode }) => (
  <form
    onSubmit={handleSubmit}
  >
    {!editMode && (
      <div>
        <div>
          <Field
            name="category"
            label="Category"
            component={SelectField}
          >
            <option
              value=''
            >Select a Category
            </option>
            {categories && categories.map(category =>
              (
                <option
                  key={category.name}
                  value={category.name}
                >{category.name}
                </option>
              ))}
          </Field>
        </div>
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
        name="title"
        label="Title"
        component={InputField}
        type="text"
      />
    </div>
    <div>
      <Field
        name="body"
        label="Post content"
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

const mapStateToProps = ({ categories }) => ({
  categories,
});

export default connect(mapStateToProps)(reduxForm({
  form: 'postForm',
  validate,
})(PostForm));
