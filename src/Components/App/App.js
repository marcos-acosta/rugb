import { useState } from "react";
import Trainer from "../Trainer/Trainer";
import UsernamePage from "../UsernamePage/UsernamePage";

export default function App() {
  const [username, setUsername] = useState("");
  const [usernamePageShouldDisappear, setUsernamePageShouldDisappear] =
    useState(false);
  const [finishedDisappearing, setFinishedDisappearing] = useState(false);

  function triggerSetUsername(newUsername) {
    setUsername(newUsername);
    setUsernamePageShouldDisappear(true);
    setTimeout(() => setFinishedDisappearing(true), 250);
  }

  return (
    <>
      {username && <Trainer />}
      {!finishedDisappearing && (
        <UsernamePage
          setUsername={triggerSetUsername}
          disappear={usernamePageShouldDisappear}
        />
      )}
    </>
  );
}
