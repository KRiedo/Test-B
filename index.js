import * as THREE from './three.js-master/three.js-master/build/three.module.js';

let cam, scene, rend, dice;
let w = window.innerWidth;
let h = window.innerHeight;

let init = () => {
    scene = new THREE.Scene();

    const fov = 75;
    const aspect = w / h;
    cam = new THREE.PerspectiveCamera(fov, aspect);
    cam.position.set(1, 1, 11);

    rend = new THREE.WebGLRenderer({ alpha: true });
    rend.setSize(w, h);
    rend.setClearColor(0x000000, 0);
    document.getElementById('dice-container').appendChild(rend.domElement);
};

let render = () => {
    rend.render(scene, cam);
};

let light = () => {
    const mainlight = new THREE.PointLight('#ffffff', 800, 50);
    mainlight.position.set(5, 5, 8);
    scene.add(mainlight);
};

const createDiceWithNumbers = () => {
    const geo = new THREE.BoxGeometry(2, 2, 2);
    const materials = [];
    for (let i = 1; i <= 6; i++) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 256;

        context.fillStyle = '#6F4E37';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#fc0303';
        context.font = 'bold 150px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(i, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        materials.push(new THREE.MeshLambertMaterial({ map: texture }));
    }

    dice = new THREE.Mesh(geo, materials);
    dice.position.y = 5;
    scene.add(dice);
};

const rollDice = () => {
    const playButton = document.getElementById('Play-Button');
    playButton.style.display = 'none';

    const resultPopup = document.getElementById('result-popup');
    const resultMessage = document.getElementById('result-message');
    
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    console.log(`Rolled: ${randomNumber}`);
    let bounceCount = 5;
    let gravity = 0.01;
    let bounceHeight = 0.5;
    let bounceSpeed = 0.05;
    let yVelocity = bounceHeight;

    const animateBounce = () => {
        if (bounceCount > 0) {
            dice.position.y += yVelocity;
            yVelocity -= gravity;

            if (dice.position.y <= 0) {
                bounceCount--;
                yVelocity = bounceHeight * bounceSpeed;
                bounceSpeed *= 0.7;
            }

            dice.rotation.x += 0.1;
            dice.rotation.y += 0.1;

            requestAnimationFrame(animateBounce);
        } else {
            dice.visible = true;  // Show dice after bounce animation
            spinDice(randomNumber);
        }
        render();
    };

    animateBounce();

    // Show result pop-up
    setTimeout(() => {
        resultMessage.innerText = `Rolled: ${randomNumber}`;
        resultPopup.classList.remove('d-none');
    }, 2000);

    setTimeout(() => {
        resultPopup.classList.add('d-none');
        playButton.style.display = 'block';
    }, 4500);  // Hide popup and show button after 2.5s
};

const spinDice = (number) => {
    let rotationSpeed = 0.5;
    let stopThreshold = 0.02;

    const rotationQuaternions = {
        1: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI, 0)),              
        2: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, 0, 0)),              
        3: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0)),          
        4: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, Math.PI, 0)),    
        5: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 2, 0)),          
        6: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -Math.PI / 2, 0))          
    };

    let currentQuaternion = dice.rotation.clone();

    const animateSpin = () => {
        if (rotationSpeed > stopThreshold) {
            dice.rotation.x += rotationSpeed;
            dice.rotation.y += rotationSpeed;

            rotationSpeed *= 0.85;
            dice.quaternion.slerp(rotationQuaternions[number], 0.1);

            requestAnimationFrame(animateSpin);
        } else {
            dice.quaternion.copy(rotationQuaternions[number]);
            showResult(number);
        }
        render();
    };

    animateSpin();
};

const showResult = (number) => {
    console.log(`Final Result: ${number}`);
};

document.getElementById('Play-Button').addEventListener('click', rollDice);

window.onresize = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    rend.setSize(w, h);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
};

window.onload = () => {
    init();
    light();
    createDiceWithNumbers();
    render();
};