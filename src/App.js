import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "./theme";
import { DataProvider } from "./Providers/DataProvider";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

// components
import AppBarAndDrawer from "./AppBarAndDrawer/AppBarAndDrawer";

// routes
import { SignIn } from "./SignIn";
import { Home } from "./Home/Home";

// hooks
import useToken from "./useToken";

import Settings from "./Settings/Settings";

export default function App() {
  const { token, setToken, unsetToken } = useToken();
  const store = configureStore({
    reducer: {},
  });

  const [currentTheme, setCurrentTheme] = useTheme();
  let i = 0;

  if (!token) {
    return <SignIn setToken={setToken} />;
  }

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={currentTheme}>
          <Provider store={store}>
            <DataProvider>
              <Router>
                <div>
                  <AppBarAndDrawer
                    currentTheme={currentTheme}
                    setCurrentTheme={setCurrentTheme}
                    unsetToken={unsetToken}
                  />
                  {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                  <Switch>
                    <Route path="/">
                      <Home />
                    </Route>
                  </Switch>
                </div>
              </Router>
            </DataProvider>
          </Provider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </>
  );
}
