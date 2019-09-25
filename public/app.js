if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js', { scope: './' })
        .then(result => {
            console.log("Service Worker Registered: ", result);
        })
        .catch(err => {
            console.log("Service Worker failed to register", err);
        });
}

let get = function (url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === 200) {
                    let result = xhr.responseText
                    result = JSON.parse(result);
                    resolve(result);
                } else {
                    reject(xhr);
                }
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    });
}

get('https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo')
    .then(function(response) {
        console.log('Success', response);
        document.getElementsByClassName('targetImage')[0].src = response.url;
    })
    .catch(function(err) {
        console.log('Error', err);
    })