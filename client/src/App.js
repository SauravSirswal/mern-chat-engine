import Messenger from "./components/Messenger";
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from "./context/AccountProvider";

function App() {

  const clientId = "979306776965-vprm4m6leunr1b191mf1fbo28f5u834n.apps.googleusercontent.com"

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
      <Messenger/>
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
