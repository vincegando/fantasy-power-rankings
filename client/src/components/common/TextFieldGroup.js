import React from 'react'
import PropTypes from 'prop-types'
import { Form, Message } from 'semantic-ui-react'

// Customized text field
const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <Form.Field>
      <h4 style={{ marginTop: '10px' }}>{label}:</h4>
      <Form.Input
        type={type}
        error={error}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        fluid
        size="big"
        style={{ marginBottom: '10px' }}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <Message error size="tiny" content={error} />}
    </Form.Field>
  )
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup
