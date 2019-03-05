var convertMp4 = document.querySelector('#mp4');
var convertMp3 = document.querySelector('#mp3');
var downloadMp3 = document.querySelector('#mp3download');


var URLinput = document.querySelector('.form-control');
convertMp4.addEventListener('click', () => {
    console.log(`URLMp4: ${URLinput.value}`);
    sendURL(URLinput.value);
});
convertMp3.addEventListener('click', () => {
    console.log(`URLMp3: ${URLinput.value}`);
    sendURLMp3(URLinput.value);
});
downloadMp3.addEventListener('click', () => {
    console.log(`URLMp3: ${URLinput.value}`);
    sendURLDownloadMp3(URLinput.value);
});

function sendURL(URL) {
    // We will put code here later
    
//   fetch(`http://localhost:3800/download?URL=${URL}`)
//   .then(response => response.json())
//   .then(json => console.log(json))

  window.location.href = `http://localhost:3800/downloadmp4?URL=${URL}`;
    
}

function sendURLMp3(URL) {
window.location.href =  `http://localhost:3800/convertmp3?URL=${URL}`;
    fetch(`http://localhost:3800/convertmp3?URL=${URL}`)
    .then(response)
    .then(data => console.log(data));

 
}

function sendURLDownloadMp3(URL) {
  window.location.href =  `http://localhost:3800/downloadmp3`;
  
}