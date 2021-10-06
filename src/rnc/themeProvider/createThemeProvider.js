import * as React from 'react';

function createThemeProvider(defaultTheme, ThemeContext) {
  return class ThemeProvider extends React.Component {
    static defaultProps = {
      theme: defaultTheme,
    };

    render() {
      return <ThemeContext.Provider value={this.props.theme} />;
    }
  };
}

export default createThemeProvider;
