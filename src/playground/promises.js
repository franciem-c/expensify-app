const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Andrew',
            age: 26
        });
        reject('Something went wrong!');
    }, 1500);
});

console.log('before');

promise.then((data) => {
    console.log('1', data);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('This is my other promise');
        }, 1500);
    });
}).then((str) => {
    console.log('does this run?', str);
}).catch((error) => {
    console.log('error: ', error);
});

// Can pass 2 args to then...second arg is 'catch'
// promise.then((data) => {
//     console.log('1', data);
// }, (error) => {
//     console.log('error: ', error);
// });

console.log('after');