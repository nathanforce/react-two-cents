import React from 'react';
import { FieldContext, registerFieldComponent } from './Field';

class RegisteredError extends React.Component {
  componentDidMount() {
    const { id, register } = this.props;
    register('error')(true);
  }

  componentWillUnmount() {
    const { register } = this.props;
    register('error')(false);
  }

  render() {
    return this.props.children;
  }
}

export const Error = registerFieldComponent(RegisteredError);
