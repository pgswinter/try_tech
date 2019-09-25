const a = () => console.log('1');
const b = () => console.log('2');
const x = () => console.log('x');
const y = () => console.log('y');

// ********  ****
const c = async () => {
    console.log('3');
    setTimeout(b);
    setImmediate(a);
    process.nextTick(y);
    x();
}

c();

        // c() -> console.log ====> 3 ===> was removed to stack
        // c() -> Promise
        // c() -> setTimeout ===> was removed to stack
        // c() -> Promise -> res(a()) ====> 1
        // c() -> Promise -> then -> () => x() ===> x ===> was removed to stack
        // c() -> setTimeout ===> join to stack again ===> wait 10s -> b -> 2
        // const c = () => {
        //     console.log('3');
        //     new Promise((res, rej) => {
        //         res(a())
        //     }).then(() => x())
        //     setTimeout(
        //         b,
        //         10000);
        // }

        // ******** new Promise ALWAYS EXECUTE BEFORE setTimeout() ****

        // c() -> console.log ====> 3 ===> was removed to stack
        // c() -> setTimeout ===> was removed to stack
        // c() -> Promise
        // c() -> Promise -> res(a()) ====> 1
        // c() -> Promise -> then -> () => x() ===> x ===> was removed to stack
        // c() -> setTimeout ===> join to stack again ===> wait 10s -> b -> 2
        // const c = () => {
        //     console.log('3');
        //     setTimeout(
        //         b,
        //         10000);
        //     new Promise((res, rej) => {
        //         res(a())
        //     }).then(() => x())
        // }
        // c();

        // *** -----------------------------------------------------------------------------------------

        // const c = () => {
        //     console.log('3');
        //     // setTimeout was not waiting by nodejs. 
        //     // It run setTimeout, after that force to a(). 
        //     // Finally run method inside setTimeout()
        //     setTimeout(
        //         b, // exporting 3 1. Waiting 10s exporting 2
        //         // b(), // 3 2 1 immediatly. setTimeout is useless
        //         // () => b, // exporting 3 1. Cause b is typeof function which will not render anything
        //         // () => b(), // exporting 3 1. Waiting 10s exporting 2
        //         10000);
        //     a();
        // }
        // c();

        // *** -----------------------------------------------------------------------------------------

        // const c = () => {
        //     console.log('3');
        //     new Promise((resolve, reject) => {
        //         // setTimeout(() => resolve(a()),
        //         //     10000
        //         // ); // exporting 3. Waiting 10s, continue rendering 1. End is 2

        //         // setTimeout(resolve(console.log(typeof a)),
        //         //     10000
        //         // ); // exporting immediately: 3 function 2. setTime is useless. a is typeof function

        //         // setTimeout(resolve(a()),
        //         //     10000
        //         // ); // exporting immediately 3 1 2. Cause first arg of setTimeout is not function

        //         // resolve(a) // exporting 3 2. Cause a is typeof function
        //         // resolve(a()) // exporting is 3 1 2
        //         // reject(a()) // Uncaught (in promise) undefined
        //         // a() // exporting is: 3 1. Can not run continue b() cause resolve() does not execute
        //     }).then(
        //         // () => {
        //         resolve => {
        //             try {
        //                 // b; // exporting is 3 1
        //                 // console.log(typeof b); // exporting is 3 1 function
        //                 // resolve(b); // exporting 3 1 function TypeError: resolve is not a function
        //                 b();
        //             } catch (error) {
        //                 throw new error; // exporting red error
        //                 // console.log(error) // exporting console.log(error)
        //             }
        //         })
            // -----------------------------------------------------------------------------------------
            // b();
            // a(); // exporting is 3 2 1. waiting 10s -> 1 2
        // }
        // c()