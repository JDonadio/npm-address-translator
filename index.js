'use strict';

var Translator = module.exports;

var bitcore = require('bitcore-lib');
var bitcoreCash = require('bitcore-lib-cash');
var Bitcore = {
  'btc': {
    lib: bitcore,
    translateTo: 'bch'
  },
  'bch': {
    lib: bitcoreCash,
    translateTo: 'btc'
  }
};

Translator.getAddressCoin = function(address) {
  try {
    new Bitcore['btc'].lib.Address(address);
    return 'btc';
  } catch (e) {
    try {
      new Bitcore['bch'].lib.Address(address);
      return 'bch';
    } catch (e) {
      return null;
    }
  }
};

Translator.translateAddress = function(address) {
  var origCoin = Translator.getAddressCoin(address);
  if (!origCoin) return;

  var origAddress = new Bitcore[origCoin].lib.Address(address);
  var origObj = origAddress.toObject();

  var resultCoin = Bitcore[origCoin].translateTo;
  var resultAddress = Bitcore[resultCoin].lib.Address.fromObject(origObj);
  return {
    origCoin: origCoin.toUpperCase(),
    origAddress: address,
    resultCoin: resultCoin.toUpperCase(),
    resultAddress: resultAddress.toString()
  };
};
