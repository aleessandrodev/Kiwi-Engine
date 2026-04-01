
//========================COLLISIONS===========================

export function rectCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

//========================PHYSICS===========================

export function appleGravity(gravity, accel, max){
    gravity-=accel;
    if(accel < max){
        accel++;
        if(accel > max) accel = max;
    }
    return{gravity, accel}
}


//WIP
/*export function gravity(speedHorizzontal, speedVertical, accHorizontal, accVertical, gravity, X, Y){
    accVertical = gravity;

    speedHorizzontal += X;
    speedVertical += Y;

    X += speedHorizzontal;
    Y += speedVertical;

    accVertical = 0;
    accHorizontal = 0;

    return{speedHorizzontal, speedVertical, accHorizontal, accVertical, gravity, X, Y};
}

export function force(accHorizontal, accVertical, forceHorizontal, forceVertical){
    accHorizontal += forceHorizontal;
    accVertical += forceVertical;
    return{accHorizontal, accVertical};
}*/

//========================INPUT===========================

export const Input = (() => {
    const keys = {};           
    const keysDown = {};       
    const keysUp = {};        


    window.addEventListener("keydown", (e) => {
        if (!keys[e.key]) {
            keysDown[e.key] = true;
        }
        keys[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
        keys[e.key] = false;
        keysUp[e.key] = true;
    });

    return {
        isKeyPressed: (key) => !!keys[key],

        isKeyJustPressed: (key) => !!keysDown[key],

        isKeyReleased: (key) => !!keysUp[key],

        update: () => {
            for (let k in keysDown) keysDown[k] = false;
            for (let k in keysUp) keysUp[k] = false;
        }
    };
})();

//========================TIMER===========================

const timers = new Map();

export function every(key, interval, currentTime) {
    if (!timers.has(key)) {
        timers.set(key, currentTime);
        return false;
    }

    const lastTime = timers.get(key);

    if (currentTime - lastTime >= interval) {
        timers.set(key, currentTime);
        return true;
    }

    return false;
}

const delays = new Map();

export function delay(key, interval, time) {
    if (!delays.has(key)) {
        delays.set(key, time);
        return true;
    }

    const lastTime = delays.get(key);

    if (time - lastTime >= interval) {
        delays.set(key, time);
        return true;
    }

    return false;
}

export function resetDelay(key) {
    delays.delete(key);
}


//========================OTHER===========================

export function lerp(start, end , c){
    return start + (end - start) * c;
}

export function random(min, max){
    return Math.random() * (max - min) + min;
}