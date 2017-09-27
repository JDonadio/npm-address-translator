exports.Translator = function() {
  var bitcore = require('bitcore-lib');
  var bitcoreCash = require('bitcore-lib-cash');
  var Bitcore = {};

  Bitcore = {
    'btc': {
      lib: bitcore,
      translateTo: 'bch'
    },
    'bch': {
      lib: bitcoreCash,
      translateTo: 'btc'
    }
  };

  function getAddressCoin(address) {
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

  function translateAddress(address) {
    var origCoin = getAddressCoin(address);
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
};
