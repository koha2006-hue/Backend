import configviewEngine from './config/viewEngine';
import initwebRouters from './route/web';

const express = require('express');
const app = express();
require ('dotenv').config();
const port = process.env.PORT

configviewEngine(app);
initwebRouters(app);


app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
}
)