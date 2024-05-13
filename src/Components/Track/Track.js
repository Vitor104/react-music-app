import React from "react";
import styles from './Track.module.css'

function Track (props) {
  function renderAction () {
    if (props.isRemoval) {
      return <button className={styles.Trackaction} onClick={passTrackToRemove}>-</button>
    } else {
      return <button className={styles.Trackaction} onClick={passTrack}>+</button>
    }    
  }

  function passTrack () {
      props.onAdd(props.track);
  }

  function passTrackToRemove() {
    props.onRemove(props.track);
  }

    return (
      <div className={styles.Track}>
        <div className={styles.Trackinformation}>
          {/* <h3><!-- track name will go here --></h3> */}
          <h3>{props.track && props.track.name}</h3>
          {/* <p><!-- track artist will go here--> | <!-- track album will go here --></p> */}
          <p>
            {props.track && props.track.artist} | {props.track && props.track.album}
          </p>
        </div>

      
        {/* <button class="Track-action"><!-- + or - will go here --></button> */}
        {renderAction()}
      </div>
    );
}

export default Track;