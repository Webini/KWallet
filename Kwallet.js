"use strict";

var KwalletFolder = require('./KwalletFolder.js');

class Kwallet
{    
    constructor(name)
    {
        /**
         * @var {string} wallet name
         */
        this.name = name;
        this.map  = {};
    };
    
    folder(name)
    {
        if (this.map[name] === undefined) {
            this.map[name] = new KwalletFolder(this.name, name);
        }
        
        return this.map[name];
    }
}

module.exports = {
    use: function(name) {
        return new Kwallet(name); 
    }
};