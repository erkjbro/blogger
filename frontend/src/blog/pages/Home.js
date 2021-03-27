import { useContext, useEffect } from 'react';

import { AuthContext } from '../../shared/context/AuthContext';

import './Home.scss';

const Home = () => {
  const context = useContext(AuthContext);

  useEffect(() => document.title = 'Home | VOB', []);

  return (
    <div className="home">
      <h1>Verbose Octo Blog</h1>
      <code>
        Current user is {!context.isAuth && 'not'} authenticated.
      </code>
      <p>
        Welcome to my blogging app! My name is&nbsp;
      <a
          href="https://erikjbrown.tech"
          rel="noopener noreferrer"
          target="_blank"
        >
          Erik J Brown
      </a>
      .&nbsp;
      This is a sandbox project that I have
      developed in order to test and review
      different web development concepts. The
      source code for this app can be viewed&nbsp;
      <a
          href="https://github.com/erkjbro/verbose-octo-blog"
          rel="noopener noreferrer"
          target="_blank"
        >
          here
      </a>
      &nbsp;on GitHub.
    </p>
      <p>
        This app is built using the MERN stack. This version
        of the web client uses React Context in place of Redux.
        I have also included sass (or scss) for my stylesheets
        because it's a personal preference.
    </p>
      <p>
        If you would like to view the code or run this app
        yourself, please refer to the documentation I have
        provided on GitHub. There I have made deeper explanations
        about the project structure and the steps required to
        run the app yourself.
    </p>
      <p>
        Thank you for your time! Hopefully you enjoy browsing my little app! &#x1F9D0;
    </p>
    </div>
  );
};

export default Home;