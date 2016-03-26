var KwalletFolder = require(__dirname + '/../KwalletFolder.js');
var $q = require('q');

describe('KwalletFolder', function(){ 
    var folder = new KwalletFolder('kdewallet', 'Passwords');
    var data   = {
        'login'   : 'pwd',
        'loginBis': 'pwd'
    };
    var pass   = 'demoPass';
    
    describe('#setMap()', function(){
        it('should set map', function(done){
            folder.setMap('test', data).then(
                function(success) {
                    console.log(success);
                    done();
                },
                function(err) {
                    console.log(err);
                    done(err);
                }
            );
        });
    });
    
    describe('#getMap()', function(){
        it('should retreive map', function(done){
            folder.getMap('test').then(
                function(success) {
                    try {
                        assert.deepStrictEqual(success, data);
                        done();
                    } catch(e) {
                        done(e);
                    }
                },
                function(err) {
                    console.log(err);
                    done(err);
                }
            );
        });
    });
    
    describe('#setPassword()', function(){
        it('should set value', function(done){
            folder.setPassword('testPass', pass).then(
                function(success) {
                    console.log(success);
                    done();
                },
                function(err) {
                    console.log(err);
                    done(err);
                }
            );
        });
    });
    
    describe('#getPassword()', function(){
        it('should get value', function(done){
            folder.getPassword('testPass').then(
                function(success) {
                    try {
                        assert.strictEqual(success, pass);
                        done();
                    } catch(e) {
                        done(e);
                    }
                },
                function(err) {
                    console.log(err);
                    done(err);
                }
            );
        });
    });
});