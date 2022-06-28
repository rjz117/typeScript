
const bluebird = require("bluebird");

let req = [];

for(i =1; i<=50;i++) {
    req.push(i);
}


bluebird.map(req, item => myFun(item), {concurrency : 10})

const myFun = (item) => {
    return new bluebird((res,rej) => {
        setTimeout(() => {
            console.log(item);
            res();
        },1000)
    })
}

// bluebird.map([1, 2, 3, 4, 5], function(val) {
//     return new bluebird.delay(100).then(function() {
//         console.log(val);
//         console.log('done');
//     });
// }, {concurrency: 2});

