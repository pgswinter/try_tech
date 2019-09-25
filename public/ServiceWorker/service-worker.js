if ('serviceWorker' in navigator) {
    try {
        const seRegistration = await navigator.serviceWorker.register("sw.js");
        console.log("sw was registered");
    } catch (error) {
        console.log("sw reg failed");
    }
} else {
    console.log("sw not supported");
}