import * as React from 'react';

import deepmerge from 'deepmerge';

import hoistNonReactStatics from 'hoist-non-react-statics';

function createWithTheme(ThemeProvider, ThemeContext) {
  return function withTheme(Component) {
    class ThemedComponent extends React.Component {
      _previous = {};

      _merge = (a, b) => {
        const previous = this._previous;

        if (previous && previous.a === a && previous.b === b) {
          return previous.result;
        }

        const result = a && b && a !== b ? deepmerge(a, b) : a || b;

        this._previous = { a, b, result };

        return result;
      };

      render() {
        const { _reactThemeProviderForwardedRef, ...rest } = this.props;
        return (
          <ThemeContext.Consumer>
            {theme => (
              <Component
                {...rest}
                theme={this._merge(theme, rest.theme)}
                ref={_reactThemeProviderForwardedRef}
              />
            )}
          </ThemeContext.Consumer>
        );
      }
    }

    const Result = React.forwardRef((props, ref) => (
      <ThemedComponent {...props} _reactThemeProviderForwardedRef={ref} />
    ));

    Result.displayName = `withTheme(${
      Component.displayName || Component.name
    })`;

    hoistNonReactStatics(Result, Component);
    return Result;
  };
}

export default createWithTheme;
