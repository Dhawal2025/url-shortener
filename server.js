const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ShortUrl = require('./ models/shortUrl');

const dbURI = 'mongodb+srv://dhawal:ZRg0BV1Ekj4Rynj7@nodetuts.oducf.mongodb.net/node-tuts?retryWrites=true&w=majority';

mongoose.connect(dbURI,{
    useNewUrlParser:true, useUnifiedTopology:true
})
.then((result)=>{app.listen(process.env.PORT);})
    .catch((err)=>{console.log(err)});
app.set('view engine','ejs');
app.use(express.urlencoded({ extended:false}));
app.get('/', async (req,res)=>{
    const shortUrls = await ShortUrl.find();
    res.render('index',{shortUrls:shortUrls});
});

app.post('/shortUrls', async (req,res)=>{
    await ShortUrl.create({ full:req.body.fullUrl})
    res.redirect('/');
})

app.get('/:shortUrl',async (req,res)=>{
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl});
    if( shortUrl == null){
        res.sendStatus(404)
    }
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full);
})
// app.listen(process.env.PORT || 3000) ;