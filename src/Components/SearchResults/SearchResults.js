import React from "react";
import Tracklist from '../Tracklist/TrackList'
import styles from './SearchResults.module.css'

function SearchResults (props) {

    return (
        <div className={styles.SearchResults}>
        <Tracklist userSearchResults={props.userSearchResults} isRemoval={false} onAdd={props.onAdd} />
      </div>
        );
}

export default SearchResults;