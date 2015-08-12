This is a project meant to help develop ```NodeJs``` libraries for interacting with various public API's by building an automated workflow combining several services.

To begin development of this project, run:
```
npm install
```
then create a file called ```accesskeys.json``` in the root directory that contains the accesskeys and tokens for the various public API's used in this app. For example:
```
{
	"smartsheet":{
		"accesstoken": "a98a3o2jif923jjosdf82"
	},
	"trello":{
		"accesskey": "j38ls0ajh129hd8sh3s8eha9d",
		"secret": "asjd7i3j2haf91j9saha9u329e98sahd9dfh2u39dsafh223us9sdjha39jake8ds",
		"token": "mcnam2m1aza9djb9ax8ahqo1h9acbn19ac9an1b0ajkcnk19cbzbnm1v100askd9ah"
	}
}
```

Finally, to run the application run:
```
node app.js
```

The repositories for the API libraries used in this application can be found at:
* [Trello API](https://github.com/andnp/trelloapi)
* [Smartsheets API](https://github.com/andnp/smartsheetsapi)
