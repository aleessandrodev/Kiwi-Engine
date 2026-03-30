export function rectCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

export function sPhysics(a, b, c){
    a-=b;
    if(b < c){
        b++;
        if(b > c) b = c;
    }
    return{a, b}
}

export function lerp(start, end , c){
    return start + (end - start) * c;
}

export function random(min, max){
    return Math.random() * (max - min) + min;
}


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
