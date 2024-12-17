function greeting(){
    console.log("Hello world");
}

const timeout = setTimeout(greeting,10000);

function stopTimeout(){
    clearTimeout(timeout);
}
stopTimeout()

const interval = setInterval(greeting,3000)

function stopInterval(){
    clearInterval(interval)
}

stopInterval()