import { Switch, Route, Redirect } from 'react-router-dom';

const Home = () => <h1>Verbose Octo Blog</h1>;

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
