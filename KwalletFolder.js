"use strict";

var execFile = require('child_process').execFile;
var $q       = require('q');

class KwalletFolder 
{
    /**
     * @var {string} WalletName
     * @var {string} folder
     */
    constructor(walletName, folder)
    {
        this.walletName = walletName;
        this.folder  = folder;
        this.params     = [
              this.walletName,
              '-f',
              this.folder
        ];
    }
    
    /**
     * @param {string} name
     */
    _get(name)
    {
        var defer = $q.defer();
        
        defer.process = execFile('kwallet-query', this.params.concat([ '-r', name ]), function(error, stdout, stderr){
            if (error || stderr || defer.process.exitCode !== 0) {
                defer.reject(error || stderr || stdout);
            } else {
                defer.resolve(stdout.replace(/\n$/, ''));
            }
        });
        
        return defer.promise;
    }
    
    /**
     * @param {string} name
     * @param {string} value 
     */
    _set(name, value)
    {
        var defer = $q.defer();
        
        defer.process = execFile('/usr/bin/kwallet-query', this.params.concat([ '-w', name ]), (error, stdout, stderr) => {
            if (error || stderr || defer.process.exitCode !== 0) {
                defer.reject(error || stderr || stdout);
            } else {
                defer.resolve(stdout);
            }
        });
        
        defer.process.stdin.end(value);    
        
        return defer.promise;
    }
    
    /**
     * Set a kwallet value, we cannot create entry on the fly, you must define
     * a entry before using this method
     * @param {string} name
     * @param {string} value 
     * @return {promise}
     */
    setPassword(name, value)
    {
        return this._set(name, value);
    }
    
    /**
     * @param {string} entry name
     * @return {string}
     * @return {promise}
     */
    getPassword(name)
    {
        return this._get(name);
    }
    
    /**
     * Set a kwallet value, we cannot create entry on the fly, you must define
     * a entry before using this method
     * @param {string} name
     * @param {object} value 
     * @return {promise}
     */
    setMap(name, value)
    {
        return this._set(name, JSON.stringify(value));
    }
    
    /**
     * Retreive an existing map
     * @param {string} name
     * @return {promise}
     */
    getMap(name)
    {
        return this._get(name).then(
            function(success) {
                //@throw
                return JSON.parse(success);
            }
        )
    }
}

module.exports = KwalletFolder;