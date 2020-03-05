const login = require ("facebook-chat-api");
const chalk = require ("chalk");
const fs = require ("fs");
const express = require ("express");
const childProcess = require('child_process');
const rl = require("readline");

// The google Version (C v5.1)
// the google variables

const spreadsheetId = "1EpJagcGE-nzWJ8yhf2K28XpRbPB-PdyoNgJRXzu8_VY";

const readline = require('readline');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';

fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), getMeSheets);
});

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
		properLogin();
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
				properLogin();
      });
      callback(oAuth2Client);
    });
  });
}



// End the google initialization

// sample google function (to be replaced)
// replaced with creating a permanent 'sheets' object

var sheets;
var superauth;

function getMeSheets(auth) {

	sheets = google.sheets({version: 'v4', auth});
	superauth = auth;
	sysLog("SHEETS object assigned");

	/*
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        console.log(`${row[0]}, ${row[4]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
	*/
}

// SITE PANEL PWD

var pwd = "asdf"

// SERVER & PAGE

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname));

var cumsg;
var cutim;
var cutho;

if(process.env.PORT != undefined){
	server.listen(process.env.PORT);
	sysLog("Listening on port " + process.env.PORT);
}
else{
	server.listen(8080);
	sysLog("Listening on port 8080");
}

io.on('connection', function(socket){

	socket.on('ok_button_pressed', function(data) {
		password = data.password;
		sysLog("Recieved password ", password);
		if (password != pwd) {
			return;
		}
		io.emit("toggle_panel");

	});

	socket.on('try_save_today', function() {
		sysLog("Recieved 'save today' message");
		prepare_to_save(true);
	});

	socket.on('try_save_yesterday', function() {
		sysLog("Recieved 'save yesterday' message");
		prepare_to_save(false);
	})

	socket.on('actually_save', function(data) {
		sysLog("Confirmed that we want to save messages");
		actually_actually_save(data.address, data.amount);
	})

  socket.on('regen_appstate', function(data){
    sysLog("Regenerating appstate initiated");
    actually_regen_appstate(data.login, data.pass);
/*
    child.on('message', message => {
      socket.emit(message);
    })
*/
  })

  socket.on('relogin', function(data){
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), getMeSheets);
    });
  })

});


var dir = __dirname;

app.get('/', function(req, res) {
    res.sendFile(dir + '/index.html');
});

function uCT(newtext){
	    io.emit('change_text_ct', {
        pagetext: newtext
    });
}

function uTI(newtext){
	    io.emit('change_text_ti', {
        pagetext: newtext
    });
}

function uUT(newtext){
	    io.emit('change_text_ut', {
        pagetext: newtext
    });
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

function prepare_to_save(today){

	var firstMonth = new Date(2018, 2, 1);

	var thisday = new Date();
	var todate;

	if (today == true) {
		todate = thisday;
	} else {
		todate = new Date(thisday);
		todate.setDate(thisday.getDate() - 1);
	}

	var dd = String(todate.getDate()).padStart(2,'0');
	var mm = String(todate.getMonth()+1).padStart(2,'0');
	var yyyy = todate.getFullYear();

	date = mm + '.' + dd + '.' + yyyy;

	var current_month_diff = monthDiff(firstMonth, new Date(todate.getFullYear(),todate.getMonth(), 1));

	var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI'];
	var currentletter = alphabet[current_month_diff+2];
	var currentnumber = todate.getDate()+2;

	var address = currentletter + currentnumber;

	io.emit('trying_save', {
		today: today,
		curcell: address,
		curmsg: cumsg,
		curtim: cutim
	})

}

//var child;

// ACTUALLY ACTUALLY SAVE THE MESSAGES

function actually_regen_appstate(login, pass){
  sysLog("Appstate regeneration has been invoked. Please stand back.");
  childProcess.fork("regen-appstate-auto.js", [login, pass]);
}

function actually_actually_save(address, amount){

	inner_sheets = sheets;

	var request = {

		spreadsheetId: '1EpJagcGE-nzWJ8yhf2K28XpRbPB-PdyoNgJRXzu8_VY',

		range: address,

		valueInputOption: 'RAW',

		resource: {
			"values":[[amount]]
		},

		auth: superauth,

	};

	inner_sheets.spreadsheets.values.update(request, function(err, response) {
		if (err) {
			sysErr(err);
			return;
		}
		console.log(JSON.stringify(response, null, 2));
	});

}

// END OF SERVER & PAGE

var lastcount = 0;

function sysLog(text) {
	console.log(chalk.red("SYS")+chalk.bold(" >> ")+chalk.gray(text)+chalk.gray("... ")+chalk.green.bold("OK"));
}

function sysErr(text) {
	console.log(chalk.red("SYS")+chalk.bold(" >> ")+chalk.gray(text)+chalk.gray("... ")+chalk.red.bold("ERROR"));
}

function untilThousand (amt) {
	return 1000-(amt - ((Math.floor(amt/1000))*1000));
}

function dateLog(date, amt){
	console.log(chalk.green("BOT")+chalk.bold(" >> ")+chalk.black.bgGreen(date)+chalk.bold(" > ")+chalk.black.bgGreen(amt)+chalk.bold(" < ")+chalk.black.bgGreen(untilThousand(amt)));

	cumsg = amt;
	cutho = untilThousand(amt);
	cutim = date;

	uTI(date);
	uCT(amt);
	uUT(untilThousand(amt));
}

function isNextMsgMilestone (amt) {
	if(untilThousand(amt) == 2) {
		sysLog("Milestone detected");
		return true;
	}
	else {
		return false;
	}
}

function getTime() {
	var myYear = new Date().getFullYear();
	var myDay = new Date().getDate();
	var myMonth = new Date().getMonth() + 1;
		if(myMonth.toString().length == 1) {
			myMonth = "0" + myMonth;
		}
	var myDate = myYear + "." + myMonth + "." + myDay;
	var myTime = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
	var myDateTime = myDate + " " + myTime;
	return myDateTime;
}

function properLogin () {
	login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, {
			forceLogin: true,
			userAgent: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1"
	}, (err, api) => {

			if(err) {
				switch (err.error) {
					case 'login-approval':
						console.log('Enter code > ');
						rl.on('line', (line) => {
							err.continue(line);
							rl.close();
						});
						return null;
					default:
						return console.error(err);
					}
				}

		sysLog("Logged in with APPSTATE");
		api.listenMqtt(function (err, msg) {
			if (err) return console.error(err);
			if (msg.type == "message" || msg.type == "message_reply") {
				if (msg.threadID == "100005341296717") {
					lastcount++;	
				}
			}
		});
		function chkMsg() {
			api.getThreadInfo("100005341296717", (err, ret) => {
				if(err) {
				  socket = io();
				  socket.emit("err", [err]);
				  return sysErr("Getting messages");
				};

				var currentcount = ret["messageCount"];

				if(lastcount < currentcount) {
					lastcount = currentcount;

					if(isNextMsgMilestone(currentcount)){
						api.sendMessage("[BOT] >> Nastepna wiadomość to > " + (currentcount+2) + "!", "100005341296717");
					}

					dateLog(getTime(), currentcount);
					sysLog("TEST version ran successfully. Shutting down.")
          				process.exit(0);
					return true;
				}

				else {
					return false;
				}

		})};

		setInterval(function() {
			chkMsg();
		}, 40000);

	});
}


sysLog("Starting C v5.3.2 --TEST VERSION--");

//properLogin();

io.on('connection', function() {

	uCT(cumsg);
	uTI(cutim);
	uUT(cutho);

});
