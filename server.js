//importando os packages instalados
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const indexRoute = require('./routes/indexRoute');
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
const frotasRoute = require('./routes/frotasRoute');
const cadastroFrotaRoute = require('./routes/cadastroFrotaRoute');
const cookieParser = require('cookie-parser');
const app = express();


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('layout', './layout');
app.set('views', './views');

app.use(express.static("public"));
app.use(expressLayouts);

app.use('/', indexRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/cadastro', cadastroFrotaRoute);
app.use('/frotas', frotasRoute)

app.listen(5000, function() {
    console.log("servidor web em funcionamento!")
})