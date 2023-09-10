import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import './styles.css'
import song_list from "../../assets/song_list";
import { useState, useEffect, useRef } from "react";


const options = {
  quietUpdate: true,
  remove: false,
  toggleMode: false,
  showDownload: false,
  showReload: false,
  showThemeSwitch: false,
  mode: "full",
  onAutoPlayInitLoadPlayList : true,
  spaceBar: true,
};

export default function Player() {

  const ref = useRef();

  const [state, setState] = useState({
    first: true,
    lastUpdate: 0,
    list: song_list,
    playerOptions: options
  });

  const [audioInstance, setAudioInstance] = useState(null)

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
          playerOptions: {...options, audioLists: song_list}
        })

      } else {
        const queue = JSON.parse(window.sessionStorage.getItem("queue"));
        if(queue.lastUpdate != state.lastUpdate){
          console.log("change")
          console.log(queue)
          setState ({
            first: false,
            lastUpdate: queue.lastUpdate,
            playerOptions: {
                ...options, 
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



  return (
    <div ref={ref}>
      <ReactJkMusicPlayer className="player"
        
        style={{zIndex:1300}}
        {...state.playerOptions}
        // audioLists={state.list}
        showMediaSession
        // autoPlay={false}
        quietUpdate={false}
        locale={{ playListsText: "Test" }}
        // getAudioInstance={(instance) => {
        //   setAudioInstance(instance);
        // }}
      />
    </div>

    
  );
}
