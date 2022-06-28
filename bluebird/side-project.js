
let args = process.argv;

function main () {
    var choice = args[2];
    if (!choice) {
        console.error('Please add your choice in command line argument');
        process.exit(1);
    }
    executeChoice(choice);
}

function executeChoice(choice) {
    switch (choice) {
        case 'series':
            seriesCall();
            break;

        case 'parallel':
            parallelCall();
            break;

        case 'waterfall':
            waterfallCall();
            break;

        case 'each':
            eachCall();
            break;

        default:
            console.error('Invalid choice');
            process.exit(1);
            break;
    }
}

async function seriesCall() {
    let returnString = ''; 
    await task(1, 2000).then((msg) => returnString +=msg)
    await task(2, 4000).then((msg) => returnString +=msg)
    await task(3, 2000).then((msg) => returnString +=msg)
    console.log(returnString);
    console.log('Finished');
}



const parallelCall = async () => { 
    let returnString = ''; 
    return Promise.all([
    task(1, Math.floor(Math.random() * 1000)),
    task(2, Math.floor(Math.random() * 1000)), 
    task(3, Math.floor(Math.random() * 1000))])
    .then((resolveMessage) => {
        returnString += resolveMessage.join('');
        console.log(returnString);
        console.log("Finished");
    })         
}


const waterfallCall = async () => {
    total = 0;
    let w1 = await waterfallPromise( total,5).then(t => total=t);
    let w2 = await waterfallPromise( total,2).then(t => total=t);
    let w3 = await waterfallPromise( total,3).then(t => total=t);
    console.log(total);
    console.log('Finished');
}

const waterfallPromise = async (total, value) => {
    return new Promise((res, rej) => {
        totalvalue = total +value;
        console.log(`${total} + ${value} = ${totalvalue}`);
        res(totalvalue);
    });
}

const eachCall = async () => {
    var arr = [{
        order: 1,
        delay: 1000
    },{
        order: 2,
        delay: 5000
    },{
        order: 3,   
        delay: 650
    }];
    
    let promises = []; 
    for(item of arr) {
        promises.push(task(item.order,item.delay))
    }
    Promise.allSettled(promises).then(() => console.log("Finished"))
}
    

async function task(order, delay) {
    return new Promise((res, rej) => {
        setTimeout(() => {
        console.log('Order %d and delay %d', order, delay);
        res(order);
        },delay)
    })
}


main();



// const each = async (arr, callback) => {
//     var arr = [{
//         order: 1,
//         delay: 1000
//     },{
//         order: 2,
//         delay: 5000
//     },{
//         order: 3,   
//         delay: 2000
//     }];
//     for(item of arr) {
//         await callback(item.order, item.delay);        
//     }
//     console.log('finished'); 
// }
    