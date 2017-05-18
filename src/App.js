import React, { Component } from 'react';
import GetAlbumsFromSpotify from './spotify';
import GetAlbumsFromItunes from './itunes';
import './App.css';

function AddAlbums(currentAlbums, newAlbums) {
  let result = [];

  if(Array.isArray(currentAlbums) && Array.isArray(newAlbums)) {
    result = currentAlbums.concat(newAlbums);
  }

  return result;
}

function AlbumElement(props) {
  return (
    <div className="Album-element">
      <a href={props.album.albumLink} target="_blank">
        <figure className="Album-element-logo">
         <img src={props.album.albumLogo} alt="Album Logo"/>
        </figure> 
        <div className="Album-element-name">{props.album.artistName}</div>
        <div className="Album-element-name">{props.album.albumName}</div>
        </a>
    </div>
  );
}

function SearchForm(props) {
  return (
    <form className="Artist-search-form"  onSubmit={props.onSubmit}>
      <label htmlFor="search-artist-name" className="Artist-search-form-element">Find All Albums by Artist</label>
      <input type="text" name="artist-name" id="search-artist-name" className="Artist-search-form-element"/>
      <input type="submit" value="Search" className="Artist-search-form-element"/>
    </form>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      albums: [],
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const searchForm = evt.target;
    const artistName = searchForm.elements['artist-name'].value;
    if(artistName) {
      this.setState({albums: []})

      const trimmedName = artistName.trim();
      GetAlbumsFromSpotify(trimmedName).then(spotifyAlbums => this.setState({albums: AddAlbums(this.state.albums, spotifyAlbums)}));
      GetAlbumsFromItunes(trimmedName).then(itunesAlbums => this.setState({albums: AddAlbums(this.state.albums, itunesAlbums)}));
    }  
  }
   
  render() {
    const albums = this.state.albums;
    const albumElements = albums.map(album => {
      return(
        <AlbumElement album={album} />
      );
    });
    
    return (
      <div className="App">
        <div className="App-header">
          <div className="Text-header">EC English Front-end Developer Candidate Test</div>
        </div>
        <div className="App-search">
          <SearchForm onSubmit={(evt) => this.handleSubmit(evt)}/>
        </div>
        <div className="App-albums">
          {albumElements}
        </div>
      </div>
    );
  }
}

export default App;

