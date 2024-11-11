document.addEventListener("DOMContentLoaded", function() {
    const svg = document.getElementById('board');

    let count = 100;
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            let x = (row % 2 === 0) ? col * 120 : (9 - col) * 120;
            let y = row * 56;

            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", x);
            rect.setAttribute("y", y);
            rect.setAttribute("width", "120");
            rect.setAttribute("height", "56");
            rect.setAttribute("stroke", "black");

            console.log(`Creating rect ${count} at x: ${x}, y: ${y}`);

            if ([1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53, 57, 61, 65, 69, 73, 77, 81, 85, 89, 93, 97].includes(count)) {
                rect.setAttribute("fill", "aqua");
            } else if ([2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 74, 78, 82, 86, 90, 94, 98].includes(count)) {
                rect.setAttribute("fill", "turquoise");
            } else if ([3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55, 59, 63, 67, 71, 75, 79, 83, 87, 91, 95, 99].includes(count)) {
                rect.setAttribute("fill", "yellow");
            } else if ([4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100].includes(count)) {
                rect.setAttribute("fill", "pink");
            } else {
                rect.setAttribute("fill", "none");
            }

            svg.appendChild(rect);

            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", x + 60);
            text.setAttribute("y", y + 30);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "middle");
            text.setAttribute("font-family", "Poppins");
            text.setAttribute("font-size", "22");
            text.setAttribute("font-weight", "900");
            text.textContent = count;
            svg.appendChild(text);

            function addSnakeOrLadder(imgUrl, x, y, width, height, rotation = 0) {
                const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
                img.setAttributeNS(null, "href", imgUrl);
                img.setAttribute("x", x);
                img.setAttribute("y", y);
                img.setAttribute("width", width);
                img.setAttribute("height", height);

                if (rotation !== 0) {
                    const centerX = x + width / 2;
                    const centerY = y + height / 2;
                    img.setAttribute("transform", `rotate(${rotation}, ${centerX}, ${centerY})`);
                }

                svg.appendChild(img);
            }

            // Ular
            addSnakeOrLadder("Images/Blue-Snake.png", 85, 10, 180, 180, 5); // 99 -> 62
            addSnakeOrLadder("Images/Green-Snake.png", 700, -15, 175, 175, 25); // 93 -> 75
            addSnakeOrLadder("Images/Grey-Snake.png", 705, 97, 200, 200, 45); // 73 -> 54
            addSnakeOrLadder("Images/Yellow-Snake.png", 907, 150, 125, 125, 335); // 68 -> 52
            addSnakeOrLadder("Images/Blue-Snake-2.png", 315, 210, 200, 200, 25); // 56 -> 38
            addSnakeOrLadder("Images/Purple-Snake.png", 660, 215, 350, 350, 310); // 46 -> 12
            addSnakeOrLadder("Images/Green-Snake.png", 450, 325, 175, 175, 25); // 35 -> 17

            // Tangga
            addSnakeOrLadder("Images/Long-Ladder.png", 15, 40, 180, 180); // 61 -> 81
            addSnakeOrLadder("Images/Long-Ladder.png", 315, 10, 230, 230, 72); // 78 -> 85
            addSnakeOrLadder("Images/Mid-Ladder.png", 165, 127, 180, 180, 180); // 58 -> 65
            addSnakeOrLadder("Images/Mid-Ladder.png", 860, 240, 180, 180, 145); // 32 -> 48
            addSnakeOrLadder("Images/Small-Ladder.png", 40, 305, 180, 180, 45); // 21 -> 39
            addSnakeOrLadder("Images/Small-Ladder.png", 625, 350, 180, 180, 225); // 15 -> 27

            count--;
        }
    }
    const startButton = document.getElementById("start-game");
    const lobby = document.getElementById("lobby");
    const gameBoard = document.getElementById("game-board");
    const playButtonContainer = document.getElementById("play-button-container");

    startButton.addEventListener("click", function () {
        console.log("Button clicked");
    
        lobby.classList.add("d-none");
        gameBoard.style.display = "block";
        gameBoard.classList.remove("d-none");
    
        console.log("Lobby hidden, game board displayed");
        setTimeout(() => {
            playButtonContainer.classList.remove("d-none");
        }, 400); 
    });
});