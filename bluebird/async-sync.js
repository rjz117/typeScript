

const main = (stingOne, stringTwo, calculationFun) => {
    return new Promise((resolve, reject) => {
        let result = calculationFun(stingOne, stringTwo);
        console.log(result);
        if(result = true) {
            resolve(result)
        }
        else {
            reject(result);
        }
    })
}

const calculationFun = (stingOne, stringTwo) => {
    let strOne = stingOne.toUpperCase();
    let strTwo = stringTwo.toUpperCase();
    let result = null;
    if(strOne.length != strTwo.length) { 
        result = false;
        return result;
    }
    else {
        for(let i =0; i <= strOne.length; i++) {
            if(strOne[i] != strTwo[i]){
            result = false;
            return result;
            }
        }
        result = true;
    }
    return result;
}

const arrayOfStrings = ['dipraj','mirajsinh','chit','jado','ds','Ravirajsinh'];

arrayOfStrings.forEach((Element,i )=> {
    let result = main(Element, 'Ravirajsinh',calculationFun)
    if(result == true) {
        console.log(i);
        return false;
    }
})

// calculationFun('ravirajsinh', 'mitrrajsinh')
