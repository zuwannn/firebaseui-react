// react core
import React, { Component } from 'react'

// style
import './App.css';

// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

//initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyDoCRKjrmwWcoX3qbTAqBT3OEdM2n_CJfY",
  authDomain: "fir-ui-react-10f1a.firebaseapp.com",
  projectId: "fir-ui-react-10f1a",
  storageBucket: "fir-ui-react-10f1a.appspot.com",
  messagingSenderId: "169909352405",
  appId: "1:169909352405:web:9b8d70d3687e39c04b6f5c"
};

// instantiate a firebase app
firebase.initializeApp(firebaseConfig);


class App extends Component {

  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google , Facebook , Etc as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div className="container">
          <h1>FirebaseUI-React</h1>
          <h1> with Firebase Authentication</h1>

          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div className="container">
        <h1>FirebaseUI-React</h1>
        <h1> with Firebase Authentication</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
          <img alt="photoURL" id="photo" className="pic" src={firebase.auth().currentUser.photoURL} />
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
      </div>
    );
  }
}
export default App;
