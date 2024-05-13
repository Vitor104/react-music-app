import React, {useState} from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify/Spotify';


function App () {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('Example playlist name');
  const [playlistTracks, setPlaylistTracks] = useState([])

  function addTrack (track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log('Track already exists');
    } else {
      setPlaylistTracks(newTrack);
    }
  }

  function removeTrack(track) {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    const name = playlistName;
    Spotify.savePlaylist(name, trackURIs).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    })
  }

  function search(term) {
    Spotify.search(term).then((result) => setSearchResults(result));
  }


  return (
      <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        <SearchBar 
        onSearch={search}
        />

        
        <div className={styles.Appplaylist}>
          <SearchResults 
          userSearchResults={searchResults} 
          onAdd={addTrack}
          />

          <Playlist 
          userPlaylist={playlistName} 
          userTracks={playlistTracks} 
          onRemove={removeTrack} 
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
      );
}

export default App;
