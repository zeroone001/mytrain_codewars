/**
 * Created by smzdm on 16/6/30.
 */
require('./main.css');
var sub = require('./sub');
var app = document.createElement('div');
app.innerHTML = '<h1>hello</h1>';
app.appendChild(sub());
document.body.appendChild(app);
