
(function (exports) {
  "use strict";

  function index(req, res) {
    res.render('index', { 
        'title': 'Fireform',
        'bodyid': 'home'
	});
  }

  function docs(req, res) {
    res.render('docs', { 
        'title': 'Fireform | Docs',
        'bodyid': 'docs'
	});
  }

  function login(req, res) {
    res.render('login', { 
        'title': 'Fireform | Login',
        'bodyid': 'login',
        'bodyclass': 'form'
	});
  }

  function signup(req, res) {
    res.render('signup', { 
        'title': 'Fireform | Sign Up',
        'bodyid': 'signup',
        'bodyclass': 'form'
	});
  }

  function home(req, res) {
    res.render('home', { 
        'title': 'Fireform | Home',
        'bodyid': 'app-home',
        'bodyclass': 'app'
  });
  }

  function add(req, res) {
    res.render('add', { 
        'title': 'Fireform | Add New Form',
        'bodyid': 'add',
        'bodyclass': 'app'
  });
  }

  function list(req, res) {
    res.render('list', { 
        'title': 'Fireform | Form List',
        'bodyid': 'list',
        'bodyclass': 'app'
  });
  }

  function form(req, res) {
    res.render('form', { 
        'title': 'Fireform | Form',
        'bodyid': 'form',
        'bodyclass': 'app'
  });
  }

  function account(req, res) {
    res.render('account', { 
        'title': 'Fireform | Account',
        'bodyid': 'account',
        'bodyclass': 'app'
  });
  }

  exports.init = function (app) {
    app.get('/',index);
    app.get('/docs',docs);
    app.get('/login',login);
    app.get('/signup',signup);

    app.get('/console',home);
    app.get('/console/add',add);
    app.get('/console/list',list);
    app.get('/console/form',form);
    app.get('/console/account',account);

    //app.get('/login', users.login);
    //app.get('/signup', users.signup);
    //app.get('/logout', users.logout)
    //app.post('/users', users.create)


  };



}(exports));
/*
 * GET home page.
 */

/*exports.index = function(req, res){
  res.render('index', { title: 'Fireform' });
};

exports.login = function(req, res){
  res.render('login', { title: 'Fireform | Login' });
};*/