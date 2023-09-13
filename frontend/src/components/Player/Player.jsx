import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import './styles.css'
import song_list from "../../assets/song_list";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";


const options = {
  quietUpdate: true,
  remove: false,
  toggleMode: false,
  showDownload: false,
  showReload: false,
  showThemeSwitch: false,
  mode: "full",
  spaceBar: true,
};

export default function Player() {

  let location = useLocation();

  const ref = useRef();

  const [state, setState] = useState({
    first: true,
    lastUpdate: 0,
    list: song_list,
    playerOptions: {...options, autoPlay: false, audioLists: []}
  });

  useEffect(() => {

    const changeQueue = () => {

      if(state.first){
        console.log("first")  
        const date = Date.now();
        const queue = {
          song_list: song_list,
          lastUpdate: date
        }
        window.sessionStorage.setItem("queue", JSON.stringify(queue));

        setState ({
          first: false,
          lastUpdate: date,
          playerOptions: {...options, autoPlay: false, audioLists: song_list}
        })

      } else {
        const queue = JSON.parse(window.sessionStorage.getItem("queue"));
        if(queue.lastUpdate != state.lastUpdate){

          setState ({
            first: false,
            lastUpdate: queue.lastUpdate,
            playerOptions: {
                ...options, 
                autoPlay: true,
                onAutoPlayInitLoadPlayList: true,
                clearPriorAudioLists: true,
                quietUpdate: false,
                audioLists: queue.song_list,
            }

          })
        }
      }
    };

    const interval =  setInterval(() => {
      changeQueue()
      
    }, 500);
    return () => clearInterval(interval);
  },[state]);


  function onAudioPlay(audioInfo) {
    console.log('audio playing', audioInfo)
  }


  return (
    <div ref={ref}>
      {
        location.pathname != "/Login" && location.pathname != "/Signup" &&
        <ReactJkMusicPlayer className="player"
          style={{zIndex:1300}}
          {...state.playerOptions}
          // showMediaSession
          quietUpdate={false}
          locale={{ playListsText: "Test" }}
          onAudioPlay={onAudioPlay}
        />
      }
    </div>
  );
}
