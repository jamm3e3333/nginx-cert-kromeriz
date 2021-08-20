const express = require('express');
const app = express();
const cors = require('cors');
const user = process.env.USER;
const pass = process.env.PASS;

const port = 3010;
const tempObj = {
    date: undefined,
    temp: undefined
}

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400)
                    .send({err: "Bad format"}); 
    }
    next();
});

app.use(express.json());

app.get('/data', cors(), (req, res) => {
    res.status(200)
        .send(tempObj);
})

app.post('/data', (req, res) => {
    try{
        const auth = Buffer.from(req.headers.authorization.split('Basic ')[1], 'base64').toString().split(':');
        const userReq = auth[0];
        const passReq = auth[1];
    
        if(user !== userReq || pass !== passReq) {
            return res.status(401)
                        .send({err: 'Anauthorized'});
        }

        const { temp, date } = req.body.data;
        if(!temp || !date) {
            return res.status(404)
                        .send({message: 'Empty data was sent.'});
        }

        tempObj.temp = temp;
        tempObj.date = date;

        res.status(200)
            .send();
    }
    catch(e){
        res.status(400)
            .send();
    }

});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
