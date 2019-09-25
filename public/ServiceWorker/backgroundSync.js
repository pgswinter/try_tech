document.querySelector("button").addEventListener("click", async () => {
    const swRegistration = await navigator.serviceWorker.register("sw.js");
    swRegistration.sync.register("helloSync").then(function() {
        console.log("helloSync success [main.js]");
    });
})