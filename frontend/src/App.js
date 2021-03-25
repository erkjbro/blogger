import { useContext, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './shared/components/Navigation/Navbar';
import Home from './blog/pages/Home';
import Blogs from './blog/pages/Blogs';
import { AuthContext } from './shared/context/AuthContext';

const Auth = lazy(() => import('./user/pages/Auth'));
const Profile = lazy(() => import('./user/pages/Profile'));

const App = () => {
  const context = useContext(AuthContext);

  let routes;
  if (!!context.token) {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/blogs" exact component={Blogs} />
        <Route path="/:userId/profile" component={Profile} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/blogs" exact component={Blogs} />
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
  }

  const loading = (
    <div>
      <h2>Loading...</h2>
    </div>
  );

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Suspense fallback={loading}>
          {routes}
        </Suspense>
      </main>
    </>
  );
};

export default App;
