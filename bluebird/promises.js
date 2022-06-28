// Promise.allSettled([
//     Promise.resolve(33),
//     Promise.reject(22),
//     Promise.resolve(44),
//     new Promise(resolve => setTimeout(() => resolve(66), 0)),
//     99,
//     Promise.reject('an error')
//   ])
//   .then(values => console.log(values))
//   .catch(err => console.log("err"));


let divisionFunction = async (number) => {
    let result = null;
    return new Promise ((res, rej) => {
        result = 5/number;
    if(5/number == 'Infinity') { 
        result = "cant devide";
        console.log('cant');
        rej(result);
    }
    else {
        return result;
    }
    })
}

let i = [1,2,0,3,4]
let BreakException = {};

try {
  [1, 2, 3].forEach(function(el) {
    console.log(el);
    if (el === 2) throw BreakException;
  });
} catch (e) {
  if (e !== BreakException) throw e;
}