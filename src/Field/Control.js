import React from 'react';
import { FieldContext, registerFieldComponent } from './Field';

class RegisteredControl extends React.Component {
  componentDidMount() {
    const { id, register } = this.props;
    register('control')(id);
  }

  render() {
    const { id, onBlur, onFocus, ...props } = this.props;
    return (
      <FieldContext.Consumer>
        {({ focus, blur, error, controlId, helpId, register }) => (
          <input
            id={controlId}
            onFocus={() => {
              focus();
              if (onFocus) {
                onFocus();
              }
            }}
            onBlur={() => {
              blur();
              if (onBlur) {
                onBlur();
              }
            }}
            aria-invalid={!!error}
            {...props}
          />
        )}
      </FieldContext.Consumer>
    );
  }
}

export const Control = registerFieldComponent(RegisteredControl);
