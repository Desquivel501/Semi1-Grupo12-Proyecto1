import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { 
  Box
} from "@mui/material";
import './styles.css'
import song_list from "../../assets/song_list";


const options = {
  quietUpdate: false,
  remove: false,
  toggleMode: false,
  showDownload: false,
  showReload: false,
  showThemeSwitch: false,
  mode: "full",
};

export default function Player() {
  return (
    <ReactJkMusicPlayer className="player"
        style={{zIndex:1300}}
        {...options}
        audioLists={song_list}
        showMediaSession
        autoPlay={false}
        locale={{ playListsText: "Test" }}
    />
  );
}
