import { useState } from "react";
import Trainer from "../Trainer/Trainer";
import UsernamePage from "../UsernamePage/UsernamePage";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [value, loading, error] = useCollection(
    query(collection(db, "scores"), orderBy("score", "desc"))
  );
  const [username, setUsername] = useState("");
  const [usernamePageShouldDisappear, setUsernamePageShouldDisappear] =
    useState(false);
  const [finishedDisappearing, setFinishedDisappearing] = useState(false);

  function triggerSetUsername(newUsername) {
    setUsername(newUsername);
    setUsernamePageShouldDisappear(true);
    setTimeout(() => setFinishedDisappearing(true), 250);
  }

  async function addScore(username, score) {
    const id = generateUniqueID();
    await setDoc(doc(db, "scores", id), {
      screenName: username,
      score: parseInt(score),
    });
    return id;
  }

  return (
    <>
      {username && (
        <Trainer
          submitScore={(score) => addScore(username, score)}
          scoreboard={{
            error: error,
            loading: loading,
            scores: value && value.docs.slice(0, 10),
          }}
        />
      )}
      {!finishedDisappearing && (
        <UsernamePage
          setUsername={triggerSetUsername}
          disappear={usernamePageShouldDisappear}
        />
      )}
    </>
  );
}
