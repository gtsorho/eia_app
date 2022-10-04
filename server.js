const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

// const hbs = require('hbs')
const Multer  = require('multer')
const fs = require('fs')
const { google } = require('googleapis')


const app = express()


app.use('/', serveStatic(path.join(__dirname,'/dist')))

app.get(/.*/, function(req, res){
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// app.set('view engine', 'hbs')

const GOOGLE_API_FOLDER_ID = '1heJ6lZwlxcXIf6FiNNlcI9ExtaCQuFKa'
const CLIENT_ID = '898099369957-r6tcq3hhg7par4q8ejjbg2tr2dkl8d7s.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_ID = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04KTRdLOiFnDaCgYIARAAGAQSNwF-L9IrdK8KU5jLEomsFMVrYJXHcyX0IhwvMIFdkY0wyzzc3MJl4HU45Box7t0p0K37CbRIPko'


const oauth2Client =  new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_ID
)

oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
})

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})


async function uploadFile(file){
    try{
        const filePath = path.join(__dirname, 'gtfile.jpeg')

        const response = await drive.files.create({
            requestBody:{
                name:file.originalname,
                parents: ['1heJ6lZwlxcXIf6FiNNlcI9ExtaCQuFKa']
            },
            media:{
                mimeType:file.mimetype,
                body: fs.createReadStream(file.path)
            }
        })
        return response.data
    }catch(err){
        console.log(err.message)
    }
}

const deleteFile = (filePath) => {
    fs.unlink(filePath, () => {
      console.log("file deleted");
    });
  };

const multer = Multer({
    storage: Multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, `${__dirname}/audio-files`);
      },
      filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
      },
    }),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });


app.post("/upload", multer.single("file"), async (req, res, next) => {
    try {
      if (!req.file) {
        res.status(400).send("No file uploaded.");
        return;
      }
      const response = await uploadFile(req.file);
      deleteFile(req.file.path);
      console.log(response)
      res.status(200).json({response});

    } catch (err) {
      console.log(err)
    }
})
  

const port = process.env.PORT || 8080
app.listen(port)
console.log('listening on port:' + port)
