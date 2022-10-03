
let resultElement = document.querySelector('.result');
let mainContainer = document.querySelector('.wordle-container')
let rowId = 1;



/* PREVIEW GAME */

const wordleGame = querySelectorClass('wordle-game')
const spinner = querySelectorClass('spinner-container')


window.onload =
    spinner.classList.remove('inactive');
    wordleGame.classList.add('inactive');
    setTimeout(() => {
        spinner.classList.add('inactive');
        wordleGame.classList.remove('inactive');
    }, 2000);



/* CONSUMO DE API */

let word;

async function createWord(){

    const response = await fetch('https://1000-most-common-words.p.rapidapi.com/words/spanish?words_limit=1',{
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '72f9a99048msh74036f2e8ef9fd7p1d3ea7jsn3756d471ed91',
            'X-RapidAPI-Host': '1000-most-common-words.p.rapidapi.com'
	    }
    })
    
    const data = await response.json();

    return data

}




createWord()
    .then(data =>{

        /* Loading cargando */
        let loadingElement = document.querySelector('.loading')
        loadingElement.style.display = 'none'


        /* In Game */
        word = data[0];
        console.log(word)

        /* AYUDA DEL JUEGO */

        let wordArray = word.toUpperCase().split('');

        let rowHelp = document.querySelector('#rowHelp')
        drawSquaresHelp(rowHelp)


        let actualRow = document.querySelector('.row').nextElementSibling;
        drawSquares(actualRow);
        listenInput(actualRow)


        let focusElement = document.querySelector('.focus')
        focusElement.focus();



        function listenInput(actualRow){
            let squares = actualRow.querySelectorAll('.square');
            squares = [...squares];

            let userInput = [];


            squares.forEach((element,index) =>{
                element.addEventListener('input', ({target})=>{
                    /* Recoger el ingreso del usuario */
                    
                    userInput.push(target.value.toUpperCase());
            
                    target.setAttribute('disabled','')

                    if(target.nextElementSibling){
                        target.nextElementSibling.focus() 
                    } 
                    else{ /* CUANDO SE LLENO LAS 5 CASILLAS */
                        /* Si existen */
                        let existIndexArray =  existLetter(wordArray, userInput)
                        existIndexArray.forEach(element =>{
                            squares[element].classList.add('gold')
                        })
            
                        /* Si existen y están en la posición  */
                        let rightIndex = [];
                        rightIndex = compareArrays(wordArray, userInput);
            
                        rightIndex.forEach( element => {
                            squares[element].classList.add('green')
                        })


                        if(rightIndex.length === wordArray.length){
                            showResult('Palabra Correcta 🧐!!!');
                            /* Evento de botón reiniciar */
                            let resetBtn = document.querySelector('.button-wordle')
                            resetBtn.addEventListener('click', ()=>{
                            location.reload();
                            })
                            /* Evento de botón home */
                            let homeBtn = document.querySelector('.button-wordle--home')
                            homeBtn.addEventListener('click', ()=>{
                            window.location = '../pages/games.html';
                            })
                        }else{
                            if(rowId <= 3){
                                let actualRow = createRow();
                                drawSquares(actualRow);
                                target.parentElement.nextElementSibling.firstElementChild.focus() 
                                listenInput(actualRow);
                            }else{
                                showResult(`Intentalo de nuevo, la palabra era <span class="result-correct">${word.toUpperCase()}</span>`)
                                /* Evento de botón reiniciar */
                                let resetBtn = document.querySelector('.button-wordle--replay')
                                resetBtn.addEventListener('click', ()=>{
                                location.reload();
                                })
                                /* Evento de botón home */
                                let homeBtn = document.querySelector('.button-wordle--home')
                                homeBtn.addEventListener('click', ()=>{
                                window.location = '../pages/games.html';
                                })
                            } 
                        }
                    } 
                })
                
            })
        }




        function compareArrays(array1 , array2){

            let equalsIndex = [];

            array1.forEach((element, indice) =>{
                if(element === array2[indice]){
                    /* console.log(indice) */
                    equalsIndex.push(indice);
                }else{
                    console.log('nel')
                }
            })

            return equalsIndex
        }

        function existLetter(array1, array2){

            let existIndexArray = [];

            array2.forEach((element, indice)=>{
                if(array1.includes(element)){
                    existIndexArray.push(indice)
                }
            });

            return existIndexArray;
        }


        function createRow(){
            rowId++;
            let newRow = document.createElement(`div`);
            newRow.className = 'row'
            newRow.setAttribute('id',rowId)

            mainContainer.append(newRow)
            return newRow;
        }

        function drawSquaresHelp(rowHelp){
            let numberLetters = [];
            if(wordArray.length == 3){
                numberLetters = [];
            }else if( wordArray.length == 4){
                numberLetters = [0]
            }else if(wordArray.length == 5){
                numberLetters = [0,4]
            }else if(wordArray.length >= 6){
                let letterMiddle = Math.round(wordArray.length/2)
                numberLetters = [0,letterMiddle-1,wordArray.length-1]
            }

            wordArray.forEach( (item, index) =>{
                if(numberLetters.includes(index)){
                    rowHelp.innerHTML += `<input type="text" maxlength="1" class="square green" value=${item} disabled=''>` 
                }else{
                    rowHelp.innerHTML += `<input type="text" maxlength="1" class="square" value='?' disabled=''>` 
                }
            });
            
        }
        function drawSquares(actualRow){
            
            wordArray.forEach( (item, index) =>{
                index === 0 ? 
                actualRow.innerHTML += `<input type="text" maxlength="1" class="square focus">` 
                : actualRow.innerHTML += `<input type="text" maxlength="1" class="square">`
            });
            
        }

        function showResult(textMsg){
            resultElement.innerHTML = `
                <p class="result-head">${textMsg}</p>
                <button class="button-wordle button-wordle--replay">
                    <i class="bi bi-arrow-clockwise"></i>
                    Reiniciar
                </button>
                <button class="button-wordle button-wordle--home">
                    <i class="bi bi-house-door-fill"></i>
                    Inicio
                </button>
                `;
        }


    })




/* Funciones Fundamentales */
function querySelectorClass (selector){
    return document.querySelector(`.${selector}`);
}
function querySelectorId (selector){
    return document.querySelector(`#${selector}`);
}
