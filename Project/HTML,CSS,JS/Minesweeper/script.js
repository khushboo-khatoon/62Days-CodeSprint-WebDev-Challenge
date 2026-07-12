// for loader (instructions)
const loader = document.querySelector('.loader')
const main = document.querySelector('.main')

function init() {
    setTimeout(() => {
        setTimeout(() => (loader.style.opacity = 0), 50)
        loader.style.display = 'none'

        main.style.display = 'block'
        setTimeout(() => (main.style.opacity = 1), 50)
    }, 7000)
}

init()


const grid = document.querySelector('.grid')
const flagsLeft = document.querySelector('#flags-left')
const result = document.querySelector('#result')
let width = 10
let bombAmount = 20
let flags = 0
let squares = []
let isGameOver = false

flagsLeft.innerHTML = bombAmount - flags

function createBoard() 
{
    // shuffled, random bombs
    const bombsArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width * width - bombAmount).fill('valid')
    const gameArray = emptyArray.concat(bombsArray)
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5)


    for (let i = 0; i < width * width; i++) 
    {
        const square = document.createElement('div')
        square.setAttribute('id', i)
        square.classList.add(shuffledArray[i])
        grid.appendChild(square)
        squares.push(square)

        // normal click
        square.addEventListener('click', function(e) {
            click(square)
        })

        // on right click
        square.oncontextmenu = function(e) {
            e.preventDefault()
            addFlag(square)
        }
    }

    // add numbers
    for (let i = 0; i < squares.length; i++) 
    {
        let total = 0
        const isLeftEdge = (i % width === 0)
        const isRightEdge = (i % width === width - 1) 

        if (squares[i].classList.contains('valid')) 
        {
            if (i > 9 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++
            if (i > 9 && squares[i - width].classList.contains('bomb'))  total++
            if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++
            if (!isLeftEdge && squares[i - 1].classList.contains('bomb'))  total++

            if (!isRightEdge && squares[i + 1].classList.contains('bomb')) total++
            if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++
            if (i < 90 && squares[i + width].classList.contains('bomb'))  total++
            if (i < 90 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb'))  total++

            squares[i].setAttribute('data', total)
        }
    }
}

createBoard()


// add flag on right click
function addFlag(square) 
{
    if (isGameOver)
        return

    if (!square.classList.contains('checked') && (flags < bombAmount))
    {
        if (!square.classList.contains('flag'))
        {
            square.classList.add('flag')
            square.innerHTML = '⛳'
            flags++
            checkForWin()
            flagsLeft.innerHTML = bombAmount - flags
        }
        else
        {
            square.classList.remove('flag')
            square.innerHTML = ''
            flags--
            flagsLeft.innerHTML = bombAmount - flags
        }
    }

}


// click on square actions
function click(square) 
{   
    if (isGameOver) 
        return
    
    if (square.classList.contains('checked') || square.classList.contains('flag'))  
        return
    
    square.classList.add('checked')
    if (square.classList.contains('bomb'))
        gameOver(square)
    else 
    {
        let currentId = square.getAttribute('id')
        let total = square.getAttribute('data')
        if (total != 0) 
        {
            if (total == 1)
                square.classList.add('one')
            if (total == 2)
                square.classList.add('two')
            if (total == 3)
                square.classList.add('three')
            if (total == 4)
                square.classList.add('four')
            square.innerHTML = total
            return
        }
        checkSquare(square, currentId)
    }
}


// check neighbouring squares once a square is clicked
function checkSquare(square, currentId) {
    const isLeftEdge = (currentId % width === 0)
    const isRightEdge = (currentId % width === width - 1)

    setTimeout(() => {
        if (parseInt(currentId) > 9 && !isLeftEdge)
        {
            const newSquare = document.getElementById(parseInt(currentId) - 1 - width)
            click(newSquare)
        }
        if (parseInt(currentId) > 9)
        {
            const newSquare = document.getElementById(parseInt(currentId) - width)
            click(newSquare)
        }
        if (parseInt(currentId) > 9 && !isRightEdge)
        {
            const newSquare = document.getElementById(parseInt(currentId) + 1 - width)
            click(newSquare)
        }
        if (!isLeftEdge) 
        {
            const newSquare = document.getElementById(parseInt(currentId) - 1)
            click(newSquare)
        }

        if (!isRightEdge)
        {
            const newSquare = document.getElementById(parseInt(currentId) + 1)
            click(newSquare)
        }
        if (parseInt(currentId) < 90 && !isLeftEdge)
        {
            const newSquare = document.getElementById(parseInt(currentId) - 1 + width)
            click(newSquare)
        }
        if (parseInt(currentId) < 90)
        {
            const newSquare = document.getElementById(parseInt(currentId) + width)
            click(newSquare)
        }
        if (parseInt(currentId) < 90 && !isRightEdge)
        {
            const newSquare = document.getElementById(parseInt(currentId) + 1 + width)
            click(newSquare)
        }
    }, 10)
}

// game over
function gameOver(square) {
    result.innerHTML = 'BOOM! Game Over!'
    isGameOver = true

    // show ALL the bombs
    squares.forEach(square => {
        if (square.classList.contains('bomb'))
        {
            square.innerHTML = '💣'
            square.classList.remove('bomb')
            square.classList.add('checked')
        }
    })
}


// check for win
function checkForWin() {
    let matches = 0
    for (let i = 0; i < squares.length; i++)
    {
        if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb'))
            matches++

        if (matches === bombAmount)
        {
            result.innerHTML = 'YOU WON!'
            isGameOver = true
        }
    }
}