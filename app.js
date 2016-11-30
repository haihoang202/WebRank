//Import stuffs, prepare views, etc
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var url = require('url-parse');
var bodyParser = require('body-parser');

var app = express();

app.set('views', __dirname + '/views/');
app.set('view engine', 'jade');

var port = process.env.PORT || 8000;
app.set('port',port);

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public'));

var countries_set=[];
//Entry point
app.get('/', function(req, res) {
	var countries_url = "http://www.alexa.com/topsites/countries";
	request(countries_url, function(error, response, html){
		if(error){
			throw new Error(error);
		}
		else{
			var $ = cheerio.load(html);
			var countries=[];
			$('li','ul.countries').each(function(i,elem){
				var $this = $(this);
				var country_ = $this.find('a').text().trim();
				// console.log(country_);
				var abbrev_ = $this.find('a').attr('href').replace("/topsites/countries/","");
				// console.log(abbrev_);
				var temp = country_+" ("+abbrev_+")";
				// console.log(temp);
				countries.push(temp);
			});
			// console.log(countries);
			countries_set=countries;
			res.render('index',{countries:JSON.stringify(countries)});
		}
	});
});

var hashmap = {};

app.post('/crawl', function(req, res){
	var sites = [];
	var country = req.body.country;
	console.log(country);
	var regExp = /\(([^)]+)\)/;
	var matches = regExp.exec(country);
	country = matches[1];
	var default_url = 'http://www.alexa.com/topsites/countries';
	var i = 0;
	var q1 = require('async').queue(function(url, callback){
		request(url, function(error, response, html){
			// console.log(response);
			if(error) {
				throw new Error(error);
			}
			else{
				//Load web content
				var $ = cheerio.load(html);
				//Get anchor
				$('li.site-listing').each(function(i, elem) {
					// console.log($(this).attr('href'));
					var $this = $(this);
					$this.find('.trucate').remove();
					var templink = $this.find('.desc-paragraph a').text().trim();
					var tempalexa = $this.find('.desc-paragraph a').attr('href');
					var tempdesc = $this.find('.description').text().trim();
					var temprank = $this.find('.count').text().trim();
					var site = {url: templink, desc: tempdesc, rank: temprank, alexa: tempalexa};
					sites.push(site);
				});
			}
			callback();
		});
	},10);
	console.log("In Progress");

	q1.drain = function() {
		sites.sort(function(a,b){
			if(parseInt(a.rank)<parseInt(b.rank)){
				return -1;
			}
			else if (parseInt(a.rank)>parseInt(b.rank)) {
				return 1;
			}
			else {
				return 0;
			}
		});
		res.render('dash',{sites:JSON.stringify(sites), countries:JSON.stringify(countries_set)});
		console.log('Done crawling');
		console.log(sites.length);

	};
	for(var i = 0; i < 20; i++){
		q1.push(default_url + ';' + i + '/'+country);
	}
});

app.listen(app.get('port'), function() {
	console.log("Starting web service on port " + port);
});
