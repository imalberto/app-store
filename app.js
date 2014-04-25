
/*jslint nomen:true, node:true*/


var express = require('express'),
    exphbs = require('express3-handlebars'),
    app,
    appPort,
    hostname;


app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

appPort = process.env.PORT || 5000;

app.configure('development', function () {
    appPort = 8666; // overwrite
    // hostname = '192.168.3.51' + ':' + appPort;
    hostname = 'localhost' + ':' + appPort;
    app.set('app port', appPort);
    app.set('app port', 8666);
    app.set('app hostname', hostname);
});

app.configure('production', function () {
    app.set('app port', appPort);
    app.set('app hostname', '<hostname>');
    app.enable('view cache');
});

express['static'].mime.define({
    'text/xml': ['plist'],
    'application/octet-stream': ['ipa']
});

app.use(express.basicAuth('<user>', '<pwd>'));

app.use('/images', express['static'](__dirname + '/images'));
app.use('/app', express['static'](__dirname + '/app'));
app.use(app.router);

function handler(req, res) {
    res.render('download', {
        hostname: app.set('app hostname'),
        appName: 'NoteApp'
    });
}

app.get('/index.html', handler);
app.get('/download/*', handler);

// app.get('/*', function (req, res) {
//     res.send('404');
// });
//

app.listen(appPort, function () {
    console.log('Ready to serve');
});

