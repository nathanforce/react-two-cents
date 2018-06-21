import React from 'react';
import { FieldContext } from './Field';

export const Label = props => {
  return (
    <FieldContext.Consumer>
      {({ controlId }) => <label htmlFor={controlId} {...props} />}
    </FieldContext.Consumer>
  );
};
