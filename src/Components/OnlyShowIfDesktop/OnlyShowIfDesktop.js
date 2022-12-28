import React from "react";
import { useMediaQuery } from "react-responsive";
import TitleCard from "../TitleCard/TitleCard";
import styles from "./OnlyShowIfDesktop.module.css";

export default function OnlyShowIfDesktop(props) {
  const isMobile = useMediaQuery({
    query: "(max-width: 1000px)",
  });
  return isMobile ? (
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
  ) : (
    props.children
  );
}
