import React from 'react';
import { FieldContext, registerFieldComponent } from './Field';

class RegisteredControl extends React.Component {
  componentDidMount() {
    const { id, register } = this.props;
    register('control')(id);
  }

  render() {
    const { children, id, onBlur, onFocus, register, ...props } = this.props;

    return (
      <FieldContext.Consumer>
        {({ focus, blur, error, controlId, register }) => {
          const inputProps = {
            id: controlId,
            onFocus: (e) => {
              focus();
              if (onFocus) {
                onFocus(e);
              }
            },
            onBlur: (e) => {
              blur();
              if (onBlur) {
                onBlur(e);
              }
            },
            'aria-invalid': !!error,
          };

          return children ? (
            children(inputProps)
          ) : (
            <input {...inputProps} {...props} />
          );
        }}
      </FieldContext.Consumer>
    );
  }
}

RegisteredControl.displayName = 'RegisteredControl';

export const Control = registerFieldComponent(RegisteredControl);
Control.displayName = 'Control';
