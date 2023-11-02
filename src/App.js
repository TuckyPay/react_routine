import './App.css';
import InputItems from './Input_items';
import Add_item from './Add_item';
import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from '@firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user, loading, error] = useAuthState(auth);
  const signIn = () => {
    signInWithPopup(auth, provider).catch((err) => alert(err.message));
  };

  return (
    <div className='body'>
      <h2>ルーティン矯正アプリ</h2>

      <div className='contents_box'>
        {user ? 
          (
            <>
            <InputItems />
            <button className='authBtn' onClick={() => signOut(auth)}>サインアウト</button>
            </>
          )
          :
          <button onClick={signIn}>サインイン</button>
        }
      </div>

        {user ?
          (
            <>
              <Add_item />
            </>
          )
          :
          <>
          </>
        }

      
    </div>
  );
}

export default App;
