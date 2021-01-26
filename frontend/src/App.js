import { useEffect, useState } from 'react';

const App = () => {
  const [blogs, setBlogs] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    (async () => {
      try {
        // Loading True
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blogs`);
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        // Loading False
        setBlogs(responseData);
      } catch (err) {
        console.error(err);
      }
    })();

    (async () => {
      try {
        // Loading True
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`);
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        // Loading False
        setUsers(responseData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div>
      <h1>Verbose Octo Blog</h1>
      <hr />

      <h2>BLOGS</h2>

      <p>Node API blogs message: <code>{blogs ? blogs.message : 'null'}</code></p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {blogs && blogs.data.map((b) => (
          <li key={b.id} style={{ border: '2px solid white', margin: '1rem', padding: '1rem 4rem' }}>
            <h3>{b.title}</h3>
            <p>{b.content}</p>
          </li>
        ))}
      </ul>

      <hr />

      <h2>USERS</h2>

      <p>Node API users message: <code>{users ? users.message : 'null'}</code></p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users && users.data.map((u) => (
          <li key={u.id} style={{ textAlign: 'left', width: '300px', margin: 'auto' }}>
            <p><span>User's Name: {u.name}</span></p>
            <p><span>User's Email: {u.email}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
