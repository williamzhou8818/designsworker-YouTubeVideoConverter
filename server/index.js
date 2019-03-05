const fs = require('fs');
const shell = require('shelljs');
const express = require('express');
const path = require('path');
const cors = require('cors');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const app = express();

app.use(cors());

app.listen(3800, () => {
    console.log('Server Works !!! At port 3800');
});

app.get('/downloadmp4', (req, res) => {
    var URL = req.query.URL;
    //res.json({url:URL});
    res.header('Content-Disposition', 'attachment; filename="video.mp4" ');

    ytdl(URL, {
        format: 'mp4'
    }).pipe(res);

})

app.get('/convertmp3', (req, res) => {
    var URL = req.query.URL;
    // res.header('Content-Disposition', 'attachment; filename="audio.mp3" ');
    // res.header('Content-type', 'audio/mpeg');

    // var file = './audio.mp3';
    // if(fs.existsSync(file)) {
    //         console.log('audio file not exitsed');
    //         res.redirect('/downloadmp3');

    // } else {
        var stream = ytdl(URL);
        var  mp3 = './audio.mp3';

        function convert(input, output, callback) {
            ffmpeg(input)
                    .output(output)
                    .on('end', function() {                    
                        console.log('conversion ended');
                        callback(null);

                    }).on('error', function(err){
                        //console.log('error: ', e.code, e.msg);
                        callback(err);
                    }).run();
            
            
    //   res.header('Content-Disposition', 'attachment; filename="audio.mp3" ');
    //   res.header('Content-type', 'audio/mpeg');
    //     var  mp3 = './audio.mp3';
    //     var filesstream = fs.createReadStream(mp3);
    //          filesstream.pipe(res);

            //res.status(200);
           res.status(200).sendFile(path.join(__dirname + '/download.html'));        

            }

            convert(stream, mp3, function(err){
                if(!err) {
                 console.log('conversion complete');
                }

                
            });


        // ffmpeg(stream)
        //             .output(mp3)
        //             .on('end', function() {    
        //                 console.log('conversion ended');
        //             //    res.redirect('/readdownload');
                         
        //             }).on('error', function(err){
        //                 //console.log('error: ', e.code, e.msg);
        //             }).run();

    // }
    // res.status(200).json({message: 'audio by convered'});

})

app.get('/downloadmp3', (req, res) => {

    res.header('Content-Disposition', 'attachment; filename="audio.mp3" ');
    res.header('Content-type', 'audio/mpeg');
    var  mp3 = './audio.mp3';
    var filesstream = fs.createReadStream(mp3);
    //res.download(mp3);
    filesstream.pipe(res);
})

// app.get('/readdownload', (req, res) => {
//     res.sendFile(path.join(__dirname + '/download.html'));
// });