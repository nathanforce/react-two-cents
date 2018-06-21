import React, { createContext } from 'react';

export const FieldContext = createContext({
  touched: false,
  focused: false,
  error: false,
  controlId: null,
  register: () => () => {},
});

export function registerFieldComponent(Component) {
  return function FieldComponent(props) {
    return (
      <FieldContext.Consumer>
        {({ register }) => <Component register={register} {...props} />}
      </FieldContext.Consumer>
    );
  };
}

export class Field extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);

    this.state = {
      touched: false,
      focused: false,
      error: null,
      controlId: null,
      register: this.register,
      focus: this.focus,
      blur: this.blur,
      setError: this.setError,
    };
  }

  register(type) {
    return id => {
      if (type === 'error') {
        this.setState(({ error }) => ({ error: !error }));
      } else {
        this.setState({
          [`${type}Id`]: id,
        });
      }
    };
  }

  focus() {
    this.setState({ focused: true, touched: true });
  }

  blur() {
    this.setState({ focused: false });
  }

  render() {
    return (
      <FieldContext.Provider value={this.state}>
        <FieldContext.Consumer>
          {context => this.props.children(context)}
        </FieldContext.Consumer>
      </FieldContext.Provider>
    );
  }
}
