/*Функцията "enableBtn()":
1. Сменя курсора ни на сочещ, когато сме върху бутона
2. Променя на наситеността на цвета на бутона
3. Позволява на бутона да бъде използван и Event listener да отчита натискането му*/
function enableBtn(){
  document.getElementById("byBtn").style.cursor = "pointer";
  document.getElementById("byBtn").style.opacity = "1";
  document.getElementById("byBtn").disabled = false;
}

/*Функцията "disableBtn()":
1. Сменя курсора ни на забранен за натискане, когато сме върху бутона
2. Променя на наситеността на цвета на бутона, за да прилича на неактивен
3. НЕ позволява на бутона да бъде използван и Event listener НЕ отчита натискането му*/
function disableBtn(){
  document.getElementById("byBtn").style.cursor = "not-allowed";
  document.getElementById("byBtn").style.opacity = "0.6";
  document.getElementById("byBtn").disabled = true;
}

let nameOne="";
let nameTwo="";
let nameOneBuf;
let nameTwoBuf;
/* statusDisplay взима елемента в html, който е за показване на:
1.Кой играч е на ход
2.Дали и кой играч е победил
3.Дали играта е завършила с draw(на равно)
*/
const statusDisplay = document.querySelector('.game--status');

//gameActive - променливата, която играе ролята на флаг за това дали играта е приключила
let gameActive = true;

//currentPlayer - съдържа в себе си играчът, който е на ход в момента
let currentPlayer = "X";

/*gameState - масив, в който се съдържат инициалите на двамата играчи,
като индексът в масивът отговаря на индекса на полето в което е играл*/
let gameState = ["", "", "", "", "", "", "", "", ""];

//Съобщенията, които отиват в UI за да знаят играчите:
const winningMessage = () => `Player ${currentPlayer} has won!`;   //1.Кой е спечелил
const drawMessage = () => `Game ended in a draw!`;                //2.Дали играта е приключила наравно
const currentPlayerTurn = () => `It's ${nameOne}'s turn with ${currentPlayer}`;   //3.Кой играч е на ход

//Изписва се в UI, чии хот е в момента
statusDisplay.innerHTML = currentPlayerTurn();

/*winningConditions- масив в който се съдържат подмасиви със елементи,чиито
стойности са всички пермутаии за победа в 3x3 морски шах*/
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*В масивът gameState, в който се записват всички изиграни ходове, се записва под индекс на кликнатата клетка,
името на сегашният играч, за да се отбележи, като негов ход.*/
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

/*Сменя играча, който ще се изпише, че е на ход с тройния оператор,
като ако сегашният играч е X то той става O и обратното*/
function handlePlayerChange() {
    nameOne = nameOne === nameOneBuf ? nameTwoBuf : nameOneBuf;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

//handleResultValidation() тази функция е логическата част на играта
function handleResultValidation() {
    //roundWon - показва дали в този рунд играта приключва, като някой е победил или резултатът е равен
    let roundWon = false;

    //сравнява се дали изиграните до тук ходове съвпадат с някой от печелившите подмасиви
    for (let i = 0; i <= 7; i++) {

        //winCondition става равен с един по един печелившите подмасиви на всяка итерация
        const winCondition = winningConditions[i];

        /*a,b,c - присвояват стойността записана в gameState, в когото се записват изиграните ходовете от играчите,
        като индексът от който се взимат стойностите е числото записано в печеливш подмасив спрямо итерацията,
        за да се обходят всички варианти за победа*/
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        /*Ако някое от местате е празно няма как да има победа,
        защото за победа са ни нужни поне 3 полета, следователно програмата продължава*/
        if (a === '' || b === '' || c === '') {
            continue;
        }

        /*В този момент ако програмата е изкарала, че на местата с печеливши индекси стоят едни и същи знаци
        то играчът с тези знаци печели, в този случай итерациите за търсене приключват*/
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    /*Ако roundWon е станал TRUE то печелившия е последния играл и той бива подаден на функцията за обявяване
    на печеливш, а бутона за рестарт бива активиран, а флагът за край на играта се вдига gameActive*/
    if (roundWon) {
      //Слага името на играча който е победил, като current player за да бъде изписан като победител
        if(currentPlayer==="X"){
          currentPlayer=nameOne;
        }else {
          currentPlayer=nameTwo;
        }
        statusDisplay.innerHTML = winningMessage();
        enableBtn();
        gameActive = false;
        return;
    }

    /*Прави се проверка ако всички всички полета са запълнени, това ще значи че двамата играчи нямат повече ходове и тъй като
    никой не е спечелил се обявява равен резултат и се активира бутона за рестарт, а флагът за край на играта се вдига gameActive*/
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        enableBtn();
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    /*Ако програмата е стигнала до тук то това значи, че не е приключила играта, а ходът на играчът е приключил.
    Затова се извиква функцията handlePlayerChange(), която да даде редът на другия играч*/
    handlePlayerChange();
}

//handleCellClick взима през Event Listener даденото събитие, което е кликът върху дадена клетка
function handleCellClick(clickedCellEvent) {

    //clickedCell присвоява html елементът, върху когото е било кликнато, чрез функцията .target
    const clickedCell = clickedCellEvent.target;

    /*clickedCellIndex присвоява стрингът, който е записан в атрибута 'data-cell-index' на clickedCell,
    който е елементът върху когото е било кликнато, като този стринг се приравнява на цяло число от parseInt функцията*/
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    //Проверка, дали клетката е запълнена(следователно вече изиграна) и дали играта не е приключила
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        /*Ако играта е приключила или клетката е запълнена програмата не продължава,
        а програмата се връща докато нов клик не настъпи*/
        return;
    }
    /*Ако кликът е валиден и играта още не е приключила ще продължи изпълнението на
    логическата част на играта и ще се обновят данните, които излизат в UI*/
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

//handleRestartGame() - отговаря за връщането на началните стойности на играта, за да може да бъде започната нова
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];

    //Изписва първия играч за слдващата игра
    statusDisplay.innerHTML = currentPlayerTurn();

    //Изключва бутона, за да не може да бъде натискан преди играта да приключи
    disableBtn();

    //Зануляване на всички клетки, като те биват направени празни
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
  disableBtn();

  function hide() {
    /*document.querySelector('.section').style.display = "none";*/
    let hidden = document.querySelector('.section').style.display;
    console.log(hidden);

    nameOne = document.querySelector('.playerOne').value;
    nameOneBuf = nameOne;
    console.log(nameOne);

    nameTwo = document.querySelector('.playerTwo').value;
    nameTwoBuf=nameTwo;
    console.log(nameTwo);

    if(nameOne === "" || nameTwo===""){
      alert("Both of the names must be entered!");
    }else{
    document.querySelector('.box').style.display="none";
    document.querySelector('.section').style.display="block";
  }
}

  //Тук слагаме нашият Event lister, като той следи дали някоя от клетките е била натисната
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

  //Тук слагаме нашият Event lister, като той следят дали бутона за рестартиране на играта е бил натиснат
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

document.querySelector('.button-show-items').addEventListener('click', hide);
