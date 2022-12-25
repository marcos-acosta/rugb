import React from "react";
import TitleCard from "../TitleCard/TitleCard";
import styles from "./NoMobileScreen.module.css";

export default function NoMobileScreen() {
  return (
    <div className={styles.outerContainer}>
      <TitleCard />
      <div className={styles.textbox}>
        <p>
          Unfortunately, rugb isn't designed for mobile. Until there's an app,
          desktop is still the way to go.
        </p>
        <p>¯\_(ツ)_/¯</p>
      </div>
    </div>
  );
}
