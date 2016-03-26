var Kwallet = require(__dirname + '/../Kwallet.js');

describe('Kwallet', function(){ 
    describe('#folder()', function(){
        it('should not fail', function(){
            var wallet = Kwallet.use('test').folder('abc');
        });
    });
});