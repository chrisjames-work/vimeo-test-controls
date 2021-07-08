import { useState } from "react";
import "./App.css";
import Player from "./components/player";
import video1 from "./data/cc-video";
import video2 from "./data/video";

const playlist = [
  {
    id: 76979871,
    video: video1,
  },
  {
    id: 563568179,
    video: video2,
  },
];

function App() {
  const [video, setVideo] = useState(0);

  const setNextVideo = () => {
    if (video < playlist.length - 1) {
      setVideo(video + 1);
    }
  };

  return (
    <div className="App">
      <Player {...playlist[video].video} setNextVideo={setNextVideo} />
    </div>
  );
}

export default App;
