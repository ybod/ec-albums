import fetchJsonp from './jsonp';
import Album from './album';

function GetAlbumsFromItunes(artistName) {
    let result;
    
    if(artistName) {
        result = FetchITunes(artistName)
            .then(json => FormatITunes(json.results));
    } else {
        result = Promise.resolve([]);
    }

    return result;
}

function FetchITunes(artistName) {
    const endpoint = 'https://itunes.apple.com/search';
    const term = encodeURI(artistName);
    const request = `${endpoint}?term=${term}&entity=album&media=music&attribute=artistTerm`;

    return fetchJsonp(request);
}

function FormatITunes(jsonAlbums) {
    let albums = [];
  
    if(jsonAlbums) {  
        albums = jsonAlbums.map(item => 
            Album(item.artworkUrl100, 
                        item.artistName, 
                        item.collectionName, 
                        item.collectionViewUrl)  
            );
    }

    return albums;
}

export default GetAlbumsFromItunes;