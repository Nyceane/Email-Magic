var express = require('express');
var app = express();

var SparkPost = require('sparkpost');
var client = new SparkPost('72f9df8d79ed85090c880523a1971cc5215f46af');


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


app.post('/junk', function(request, response) {
	var trans = {
	  //campaign: req.param("campaign"),
	  metadata: {sample_campaign: true,type: 'these are custom fields'},
	  //substitutionData: {'campaignid': req.param("campaign")},
	  description: req.param("campaign"),
	  replyTo: 'mail@emailing.bffchat.com',
	  //customHeaders: {'X-Custom-Header': 'Sample Custom Header'},
	  trackOpens: true,
	  trackClicks: true,
	  html: '<p>Email warning! campaign being put into spam folder</p>',
	  text: 'Email warning! campaign being put into spam folder',
	  subject: 'campaign being put into spam folder',
	  //useSandbox: true,
	  //useDraftTemplate: true,
	  recipients: {'list_id': 'a-list'},
	  from: {"name":"Email Magic","email":'mail@emailing.bffchat.com'},
  	  //template: 'apps-world-hack',

	};

	client.transmissions.send(trans, function(err, res) {
	  if (err) {
	    console.log(err);
	    	    response.json(err);

	  } else {
	    console.log(res.body);
	    	    response.json(res.body);

	    console.log('Congrats you can use our SDK!');
	  }
	});
});

app.get('/send/:campaign', function(req, response) {
//	res.send(req.param("sender") + ", " + req.param("receiver"));

	var trans = {
	  campaign: req.param("campaign"),
	  metadata: {sample_campaign: true,type: 'these are custom fields'},
	  substitutionData: {'campaignid': req.param("campaign")},
	  description: req.param("campaign"),
	  replyTo: 'mail@emailing.bffchat.com',
	  //customHeaders: {'X-Custom-Header': 'Sample Custom Header'},
	  trackOpens: true,
	  trackClicks: true,
	  //useSandbox: true,
	  //useDraftTemplate: true,
	  recipients: {'list_id': 'customer-list'},
	  from: {"name":"Email Magic","email":'mail@emailing.bffchat.com'},
  	  template: 'apps-world-hack',

	};

	client.transmissions.send(trans, function(err, res) {
	  if (err) {
	    console.log(err);
	    response.json(err);
	  } else {
	    console.log(res.body);
	    response.json(res.body);
	    console.log('Congrats you can use our SDK!');
	  }
	});
});


app.get('/abtest/:campaign', function(req, response) {
//	res.send(req.param("sender") + ", " + req.param("receiver"));

	var trans = {
	  campaign: req.param("campaign"),
	  metadata: {sample_campaign: true,type: 'these are custom fields'},
	  substitutionData: {'campaignid': req.param("campaign")},
	  description: req.param("campaign"),
	  replyTo: 'mail@emailing.bffchat.com',
	  //customHeaders: {'X-Custom-Header': 'Sample Custom Header'},
	  trackOpens: true,
	  trackClicks: true,
	  //useSandbox: true,
	  //useDraftTemplate: true,
	  recipients: {'list_id': 'a-list'},
	  from: {"name":"Email Magic","email":'mail@emailing.bffchat.com'},
  	  template: 'apps-world-hack',

	};

	client.transmissions.send(trans, function(err, res) {
	  if (err) {
	    console.log(err);
	  } else {
	    console.log(res.body);
	    console.log('Congrats you can use our SDK!');
	  }
	});

	var trans2 = {
	  campaign: req.param("campaign"),
	  metadata: {sample_campaign: true,type: 'these are custom fields'},
	  substitutionData: {'campaignid': req.param("campaign")},
	  description: req.param("campaign"),
	  replyTo: 'mail@emailing.bffchat.com',
	  //customHeaders: {'X-Custom-Header': 'Sample Custom Header'},
	  trackOpens: true,
	  trackClicks: true,
	  //useSandbox: true,
	  //useDraftTemplate: true,
	  recipients: {'list_id': 'b-list'},
	  from: {"name":"Email Magic","email":'mail@emailing.bffchat.com'},
  	  template: 'b-test',

	};

	client.transmissions.send(trans2, function(err, res) {
	  if (err) {
	    console.log(err);
	  } else {
	    console.log(res.body);
		response.json(res.body);
	    console.log('Congrats you can use our SDK!');
	  }
	});
});


app.get('/metrics/:campaign', function(req, response) {
	var options = {
	  uri: 'metrics/deliverability?campaigns=' + req.param("campaign") +'&from=2014-07-11T08:00&metrics=count_delivered,count_rendered,count_unique_confirmed_opened,count_clicked',
	};

	client.get(options, function(err, data) {
	  if(err) {
	    console.log(err);
		response.json(err);
	    return;
	  }

	  	console.log(data.body);
		response.json(data.body);
	});
});

app.get('/get/:key', function(req, response) {
	client.transmissions.find(req.param("key"), function(err, res) {
	  if (err) {
	    console.log(err);
		response.json(err);
	  } else {
	    console.log(res.body);
		response.json(res.body);
	    console.log('Congrats you can use our SDK!');
	  }
	});
});


app.get('/createlist', function(req, response) {
//	res.send(req.param("sender") + ", " + req.param("receiver"));

var options = {
    id: 'customer-list'
    , name: 'Customer Recipient List'
    , recipients: [
      {
        address: {
          email: 'appworldhack+alpha@gmail.com'
        }
      }
      , {
        address: {
          email: 'appworldhack+bravo@gmail.com'
        }
      }
      , {
        address: {
          email: 'appworldhack+charlie@gmail.com'
        }
      }
      , {
        address: {
          email: 'appworldhack+delta@gmail.com'
        }
      }
      , {
        address: {
          email: 'appworldhack+echo@gmail.com'
        }
      }
      , {
        address: {
          email: 'appworldhack@gmail.com'
        }
      }
      , {
        address: {
          email: 'nyceane@gmail.com'
        }
      }
    ]
  };

client.recipientLists.create(options, function(err, res) {
  if (err) {
    console.log(err);
	response.json(err);
  } else {
    console.log(res.body);
    response.json(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
});



app.get('/createalist', function(req, response) {
//	res.send(req.param("sender") + ", " + req.param("receiver"));

var options = {
    id: 'a-list'
    , name: 'A Recipient List'
    , recipients: [
      {
        address: {
          email: 'jeancarl@gmail.com'
        }
      }
    ]
  };

client.recipientLists.create(options, function(err, res) {
  if (err) {
    console.log(err);
	response.json(err);
  } else {
    console.log(res.body);
    response.json(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
});



app.get('/createblist', function(req, response) {
//	res.send(req.param("sender") + ", " + req.param("receiver"));

var options = {
    id: 'b-list'
    , name: 'B Recipient List'
    , recipients: [
      {
        address: {
          email: 'nyceane@gmail.com'
        }
      }
    ]
  };

client.recipientLists.create(options, function(err, res) {
  if (err) {
    console.log(err);
	response.json(err);
  } else {
    console.log(res.body);
    response.json(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
});

