function Square() {
    let value = ''

    const setValue = (player) => {
        value = player
    }

    const getValue = () => value

    return { setValue, getValue }
}

function Board() {
    const height = 3
    const width = 3
    const squares = []

    for (i = 0; i < width; i++) {
        squares[i] = []
        for (j = 0; j < height; j++) {
            squares[i].push(Square())
        }
    }

    const getBoard = () => squares

    const printBoard = () => {
        for (i = 0; i < width; i++) {
            let row = ''
            for (j = 0; j < height; j++) {
                row = row + ` [${squares[i][j].getValue()}] `
            }
            console.log(row)
            console.log('\n')
        }
    }

    return { getBoard, printBoard }
}

const gameController = (() => {
    let board = Board()
    console.log('tic tac toe')
    board.printBoard()  

    const newRound = () => {
        board = Board()
        console.log('\n\n')
        board.printBoard()
    }

    const takeTurn = (player, row, column) => {
        board.getBoard()[row][column].setValue(player)
        board.printBoard()
        checkForWinner()
    }

    const getBoard = () => { return board.getBoard() }

    const checkForWinner = () => {
        const rowWinner = checkRows()
        const columnWinner = checkColumns()
        const diagWinner = checkDiagonal()

        let winner = ''
        if (rowWinner != '') {
            winner = rowWinner
        }
        else if (columnWinner != '') {
            winner = columnWinner
        }
        else if (diagWinner != '') {
            winner = diagWinner
        }

        if (winner != '') {
            const msg = `Player ${winner} won!`
            alert(msg)
            console.log(msg)
            newRound()
        }
    }

    const checkRows = () => {
        for (let i = 0; i < board.getBoard().length; i++) {
            let count = 0
            let value = board.getBoard()[i][0].getValue()
            for (let j = 0; j < board.getBoard()[i].length; j++) {
                if (board.getBoard()[i][j].getValue() === value && value != '') {
                    count++
                } else {
                    count = 0
                    value = board.getBoard()[i][j].getValue()
                }
            }
            if (count == board.getBoard()[i].length) {
                return value
            }
        }
        return ''
    }
    
    const checkColumns = () => {
        for (let j = 0; j < board.getBoard()[0].length; j++) {
            let count = 0
            let value = board.getBoard()[0][j].getValue()
            for (let i = 0; i < board.getBoard().length; i++) {
                if (board.getBoard()[i][j].getValue() === value && value != '') {
                    count++
                } else {
                    count = 0
                    value = board.getBoard()[i][j].getValue()
                }
            }
            if (count == board.getBoard().length) {
                return value
            }
        }
        return ''
    }

    const checkDiagonal = () => {
        if (board.getBoard().length != board.getBoard()[0].length) { return '' }

        // Check \     
        let count = 0
        let value = board.getBoard()[0][0].getValue()
        for (i = 1; i < board.getBoard().length; i++) {
            if (board.getBoard()[i][i].getValue() === value && value != '') {
                    count++
                }
            } 

        if (count == board.getBoard().length -1) {
            return value
        }

        // Check /    
        count = 0
        value = board.getBoard()[board.getBoard().length -1][board.getBoard().length -1].getValue()
        for (i = board.getBoard().length -2; i >= 0; i--) {
            if (board.getBoard()[i][i].getValue() === value && value != '') {
                    count++
                }
            } 

        if (count == board.getBoard().length -1) {
            return value
        }
        else {
            return ''
        }
    }

    return { newRound, takeTurn, getBoard }
})()

const TicTacToeUI = () => {
    const boardContainer = document.getElementById("board")
    const player1 = "player 1"
    const player2 = "player 2"
    let currentPlayer = player1

    const createSquareElement = (row, col) => {
        const square = document.createElement("div")
        square.classList.add("square")
        square.dataset.row = row
        square.dataset.col = col
        square.addEventListener("click", handleSquareClick)
        return square
    }

    const renderBoard = () => {
        const board = gameController.getBoard()
        boardContainer.innerHTML = ""

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const square = createSquareElement(i, j)
                square.textContent = board[i][j].getValue()
                boardContainer.appendChild(square)
            }
        }
    }

    const handleSquareClick = (event) => {
        const row = parseInt(event.target.dataset.row)
        const col = parseInt(event.target.dataset.col)
        gameController.takeTurn(currentPlayer, row, col)

        // Toggle players
        currentPlayer = currentPlayer === player1 ? player2 : player1

        renderBoard()
    }

    return { renderBoard }
}

const ticTacToeUI = TicTacToeUI()

document.addEventListener("DOMContentLoaded", () => {
    ticTacToeUI.renderBoard()
})
