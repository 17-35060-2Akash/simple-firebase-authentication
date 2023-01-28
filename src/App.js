import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .cath(error => {
        console.error('error', error);
      })
  }

  const handleGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(() => {
        setUser({});
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch(error => {
        console.error('error', error);
      })
  }

  return (
    <div className="App">

      {user.email ?
        <button onClick={handleGoogleSignOut}>SignOut</button>
        :
        <div>
          <button onClick={handleGoogleSignIn}>Google Sign-In</button>
          <button onClick={handleGithubSignIn}>Github sign in</button>
        </div>
      }
      <br /><br />
      {
        user.uid && <div>
          <img src={user.photoURL} alt="" />
          <h3>User Name: {user.displayName}</h3>
          <p>Emai: {user.email}</p>
        </div>}
    </div>
  );
}

export default App;
