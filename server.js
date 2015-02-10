// Generated by CoffeeScript 1.9.0
(function() {
  var app, config, creator, express, metatrader, quotes, server, symbols, _loop;

  metatrader = require('./index.js');

  config = require('./config.js');

  symbols = ['AUDCADb', 'AUDCHFb', 'AUDJPYb', 'AUDNZDb', 'AUDUSDb', 'CADCHFb', 'CADJPYb', 'CHFJPYb', 'EURAUDb', 'EURCADb', 'EURCHFb', 'EURGBPb', 'EURJPYb', 'EURNZDb', 'EURUSDb', 'GBPAUDb', 'GBPCADb', 'GBPCHFb', 'GBPJPYb', 'GBPNZDb', 'GBPUSDb', 'NZDCADb', 'NZDJPYb', 'NZDUSDb', 'USDCADb', 'USDCHFb', 'USDJPYb', 'USDNOKb', 'USDSEKb', 'XAGUSDb', 'XAUUSDb', 'AUS200', 'FRA40', 'GER30', 'UK100', 'HKO43', 'ITA40', 'JPN225', 'SPA35', 'SUI30', 'USA100', 'USA30', 'USA500', 'RUS50b', 'US2000b', 'EU50b', 'INDIA50b', 'KOSP200b', 'W20b', 'VOLXb', 'CHNCompb', 'HUNCompb', 'MEXCompb', 'BRACompb', 'FRA40', 'GER30', 'UK100', 'USDRUB', 'EURRUB', 'USOIL', 'UKOIL', 'COPPER', 'NGAS'];

  creator = new metatrader.NetCreator();

  quotes = [];

  _loop = function() {
    var client, command, executor, timenow;
    executor = creator.createExecutor(config);
    client = creator.createClient(executor);
    timenow = (new Date()).getTime() / 1000;
    command = new metatrader.CandlesCommand('EURUSDb', 60, timenow - 1, timenow);
    client.send(command, (function(_this) {
      return function(data) {
        quotes = data;
        return console.log('Result', data);
      };
    })(this));
    return console.log('loop');
  };

  express = require('express');

  app = express();

  app.get('/quotes', function(req, res) {
    return res.send(JSON.stringify(quotes));
  });

  server = app.listen(4000, function() {
    var host, port;
    host = server.address().address;
    port = server.address().port;
    return console.log('MetaTrader Proxy app listening at http://%s:%s', host, port);
  });

  _loop();

}).call(this);
