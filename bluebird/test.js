
async function task(delay) {
    return new Promise((res, rej) => {
        setTimeout(() => {
        console.log('%d', delay)
        res();
        },delay*1000)
    })
}

var arr = [2,4,1,3];

const each = async (arr) => {
    for(item of arr) {
        await task(item);
    }
}

each(arr);

