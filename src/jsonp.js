// http://stackoverflow.com/questions/22780430/javascript-xmlhttprequest-using-jsonp
// http://stackoverflow.com/questions/6132796/how-to-make-a-jsonp-request-from-javascript-without-jquery

function fetchJsonp(uri) {
    const callbackName = 'jsonp_callback';
    const script = document.createElement('script');

    const promise = new Promise((resolve, reject) => {
        window[callbackName] = function(result) {
            delete window[callbackName];
            document.body.removeChild(script);

            resolve(result);
        }

        script.src = uri + '&callback=' + callbackName;
        script.onerror = reject;
        document.body.appendChild(script);
    }); 

    return promise;
}

export default fetchJsonp;