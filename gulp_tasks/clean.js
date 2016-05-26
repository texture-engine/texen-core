var del = require('del');

module.exports = function () {
    return function (done) {
        del('test/output').then(function (){
            done();
        });
    };
};
