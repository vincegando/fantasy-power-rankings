import React from 'react'
import PropTypes from 'prop-types'
import { Form, Message, TextArea } from 'semantic-ui-react'

// Customized text area field
const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange
}) => {
  return (
    <Form>
      <TextArea
        error={error}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <Message error size="tiny" content={error} />}
    </Form>
  )
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TextAreaFieldGroup
