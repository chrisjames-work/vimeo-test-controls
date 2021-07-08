import React, { useEffect, useRef } from "react";
import Player from "@vimeo/player";

import "./index.css";

const PlayerComponent = ({
  description,
  duration,
  height,
  link,
  name,
  setNextVideo,
  tags,
  width,
}) => {
  // const iframe = useRef();
  const player = useRef();
  const isPaused = useRef(true);
  const hasTrack = useRef(true);
  const volume = useRef(0.5);

  useEffect(() => {
    if (!player.current) {
      player.current = new Player("playerWrapper", {
        controls: false,
        height,
        responsive: true,
        url: link,
        volume: volume.current,
        width,
      });

      player.current.on("play", function () {
        console.log("Played the video");
      });

      player.current.on("ended", function (data) {
        console.log(data);
        setNextVideo();
      });
    } else {
      player.current.loadVideo(563568179).then(() => {
        player.current.play();
      });
    }

    player.current.getVideoTitle().then(function (title) {
      console.log("title:", title);
    });

    return {
      // off
    };
  }, [height, link, setNextVideo, width]);

  const handlePlayToggle = () => {
    if (isPaused.current) {
      player.current.play().then(() => {
        isPaused.current = false;
      });
    } else {
      player.current.pause().then(() => {
        isPaused.current = true;
      });
    }
  };

  const handleMuteToggle = () => {
    if (volume.current > 0) {
      player.current.setVolume(0).then((v) => {
        volume.current = v;
      });
    } else {
      player.current.setVolume(0.5).then((v) => {
        volume.current = v;
      });
    }
  };

  const handleCCToggle = () => {
    if (hasTrack.current) {
      console.log("disable");
      player.current.disableTextTrack().then(() => {
        hasTrack.current = false;
      });
    } else {
      player.current.enableTextTrack("en").then(({ language, kind, label }) => {
        hasTrack.current = true;
      });
    }
  };

  // Questions/thoughts
  // Volume controls?
  // Positioning the Captions on the video screen? (when full-screen view)
  // Test volume/mute on phones
  // > NOTE: Most mobile devices don't enable you to set the volume independently of the system. Even so, the method doesn't return an error in this situation.
  // Unmount on video end? (hide the rec screen). Look for next queued video.

  return (
    <div class="wrapper">
      <div class="playerWrapper" id="playerWrapper"></div>
      <div class="controlsWrapper">
        <ul class="controlsList">
          <li>
            <button
              class="controlsButton"
              type="button"
              onClick={handleMuteToggle}
            >
              Mute
            </button>
          </li>
          <li>
            <button
              class="controlsButton"
              type="button"
              onClick={handleCCToggle}
            >
              <abbr title="Closed Captions">CC</abbr>
            </button>
          </li>
          <li>
            <button class="controlsButton" type="button" onClick={() => false}>
              Now
            </button>
          </li>
          <li>
            <button class="controlsButton" type="button" onClick={() => false}>
              Rooms
            </button>
          </li>
        </ul>
      </div>
      <div>{name}</div>
      <button onClick={handlePlayToggle} type="button" class="playButton">
        Play/Pause
      </button>
      {/* <iframe
        src="https://player.vimeo.com/video/280815263"
        frameBorder="0"
        title="video"
        // webkitallowfullscreen
        // mozallowfullscreen
        // allowfullscreen
        // customcontrols
        ref={iframe}
      ></iframe> */}
    </div>
  );
};

export default PlayerComponent;
