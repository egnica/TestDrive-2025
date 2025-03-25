import React from "react";
import styles from "../page.module.css";
import Image from "next/image";
import { useState } from "react";
const Feature = ({ feature }) => {
  const [btnClicked, setBtnClicked] = useState(false);
  const [featureSelected, setFeatureSelected] = useState("");

  const videoBtnClick = (e, name) => {
    e.stopPropagation();
    console.log("Button clicked!");
    setFeatureSelected(name);
    setBtnClicked(!btnClicked);
  };

  const videoButton = (video, name) =>
    video !== "" && (
      <div onClick={(e) => videoBtnClick(e, name)} className={styles.videoBtn}>
        Watch Video
      </div>
    );

  const checkMark = (points) => {
    return (
      points != 0 && (
        <Image
          src="https://mybarlow.barlowresearch.com/mybarlow/testdrive2024/images/check.png"
          width={25}
          height={25}
          alt="check mark"
        />
      )
    );
  };
  return (
    <div>
      {Object.entries(feature).map(([key, value], index) => {
        return (
          <>
            <div className={styles.innerRow} key={index}>
              <p>{value.name}</p>
              <div style={{ textAlign: "center", margin: "auto" }}>
                {videoButton(value.video, value.name)}
              </div>
              <div style={{ textAlign: "center", margin: "auto" }}>
                {checkMark(value.points)}
              </div>

              <p style={{ textAlign: "center", paddingRight: "15px" }}>
                {value.points}
              </p>
            </div>
            {btnClicked && featureSelected == value.name && (
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <video width="50%" controls autoPlay>
                  <source src={value.video} type="video/mp4" />
                </video>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default Feature;
