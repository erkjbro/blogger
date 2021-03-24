import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './blog/pages/Home';
import { AuthContext } from './shared/context/AuthContext';

const App = () => {
  const context = useContext(AuthContext);

  if (!!context.token) {
    console.log("Protected routes rendered!");
  }

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
