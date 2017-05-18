import Album from './album';

function GetAlbumsFromSpotify(artistName) {
    let result;
    
    if(artistName) {
        result = FetchSpotify(artistName)
            .then(response => response.json())
            .then(json => FormatSpotify(json.albums.items));
    } else {
        result = Promise.resolve([]);
    }

    return result;
}

function FetchSpotify(artistName) {
    const endpoint = 'https://api.spotify.com/v1/search';
    const q = encodeURI(`"${artistName}"`);
    const request = `${endpoint}?q=artist:${q}&type=album&limit=50`;

    return fetch(request);
}

function FormatSpotify(jsonAlbums) {
    let albums = [];
    
    if(jsonAlbums) {
        albums = jsonAlbums.map(item => 
            Album(item.images[0].url, 
                        item.artists[0].name, 
                        item.name, 
                        item.external_urls.spotify)  
            );
    }

    return albums;
}

export default GetAlbumsFromSpotify;