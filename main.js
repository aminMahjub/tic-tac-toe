const cellContainer = document.querySelector('.game-container');
const status = document.querySelector('.status');
const signs = ['O', 'X'];
const winningCond = [	
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const randomNumberForSign = Math.floor(Math.random() * 2);
let currentPlayer = '',
    running = true,
    firstPlayerHit = false,
    isDraw = true;
let options = ['', '', '', '', '', '', '', '', ''];

currentPlayer = signs[randomNumberForSign];

cellContainer.addEventListener('click', (event) => {
    const targetEl = event.target;

    if (targetEl.classList[0] !== 'game-container' && running) {
        let index = +targetEl.id;

        if (firstPlayerHit) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
        options[index] = currentPlayer;
        targetEl.textContent = currentPlayer;
        status.textContent = currentPlayer + '\'s turn';
        targetEl.disabled = true;
        firstPlayerHit = true;
        checkWinner();
    }
});

function checkWinner() {
    for (const conditions of winningCond) {
        const cellA = conditions[0];
        const cellB = conditions[1];
        const cellC = conditions[2];

        if (options[cellA] === options[cellB] 
            && options[cellB] === options[cellC] &&
            options[cellA] !== '' && options[cellB] !== '' && options[cellC] !== ''
        )
        {
            alert(currentPlayer + ' won');
            running = false;
            break;
        }
    }

    const found = options.find(elemnet => elemnet === '');

    if (found === undefined) {
        alert('draw');
    }
}



