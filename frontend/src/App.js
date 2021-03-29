import { useContext, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './shared/components/Navigation/Navbar';
import Home from './site/pages/Home';
import Loader from './shared/components/UIKit/Loader/Loader';
import { AuthContext } from './shared/context/AuthContext';

// import Blogs from './blog/pages/Blogs';
const Blogs = lazy(() => import('./blog/pages/Blogs'));
const BlogDetails = lazy(() => import('./blog/pages/BlogDetails'));
const EditBlog = lazy(() => import('./blog/pages/EditBlog'));
const Auth = lazy(() => import('./user/pages/Auth'));
const Profile = lazy(() => import('./user/pages/Profile'));

const App = () => {
  const { token } = useContext(AuthContext);

  const routes = (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/blogs" exact component={Blogs} />
        <Route path="/blogs/:blogId" exact component={BlogDetails} />
        {!token ? <Route path="/auth" exact component={Auth} /> : null}
        {!!token ? <Route path="/new-blog" exact component={EditBlog} /> : null}
        {!!token ? <Route path="/:userId/profile" component={Profile} /> : null}
        <Redirect to="/" />
      </Switch>
  );

  const loading = <Loader />;

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
