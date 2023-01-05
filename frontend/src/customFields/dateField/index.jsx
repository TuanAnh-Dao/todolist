import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

DateField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

DateField.defaultProps = {
  type: 'date',
  label: '',
  placeholder: '',
  disabled: false,
}

function DateField(props) {
  const {
    field, form,
    type, 
    label, 
    placeholder, 
    disabled,
  } = props;
  const { name } = field;
  const {errors, touched} = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup style={{"width": "90%"}}>
      {label && <Label for={name}>{label}</Label>}

      <Input
        id={name}
        {...field}

        type={type}
        disabled={disabled}
        placeholder={placeholder}
        invalid={showError}
      />
      {showError && <FormFeedback style={{position: "absolute"}}>{errors[name]}</FormFeedback>}
    </FormGroup>
  );
}

export default DateField;
