/*Создание двумерного массива и заполнение его undefined элементами*/
let arrChest = [];
for(let i = 0; i <= 7; i++){

  for (let j = 0; j <= 7; j++){
    arrChest[i] = Array(8).fill();
  }

}
/*Заполнение двумерного массива номерами шахматных клеток A1, A2 и т.д*/
for(let i = 0; i <= 7; i++){
  let k = 0;

  for(let j = 65; j <= 72; j++){
    arrChest[i][k] = String.fromCharCode(j) + (i + 1);
    k++;
  }

}
/*создание объекта и запись номеров клеток шахматной доски в объект с полями согласно индексов двумерного массива arrChest*/
let chest = {};
for(let i = 0; i <= 7; i++){

  for (let j = 0; j <= 7; j++){
    chest[i + String(j)] = arrChest[i][j];
    
  }
}
/*функция выбора вариантов ходов коня*/
var horseMove = function (target) {
  let chooseCell = [];
  for (let i = 0; i <= 7; i++) {
 	/*запись вариантов ходов коня (в представлении доски как двумерного массива) без учета края шахматной площадки в одномерный массив*/
    let currentHorsePosition = arrChest[i].indexOf(target);
    if (currentHorsePosition !== -1) {
      chooseCell.push( String(i + 2) + (currentHorsePosition - 1) );
      chooseCell.push( String(i + 2) + (currentHorsePosition + 1) );
      chooseCell.push( String(i + 1) + (currentHorsePosition - 2) );
      chooseCell.push( String(i + 1) + (currentHorsePosition + 2) );
      chooseCell.push( String(i - 2) + (currentHorsePosition - 1) );
      chooseCell.push( String(i - 1) + (currentHorsePosition - 2) );
      chooseCell.push( String(i - 2) + (currentHorsePosition + 1) );
      chooseCell.push( String(i - 1) + (currentHorsePosition + 2) );
    }	
  }
  /*создание и заполнение массива итоговыми вариантами ходов коня согласно шахматной доски*/
  let arrHorseMoves = [];
      
  for (let i = 0; i <= 7; i++) {

    if (chest[chooseCell[i]] !== undefined) {
	  arrHorseMoves.push(chest[chooseCell[i]]);
    }

  }

  return arrHorseMoves;
};	
			
let selectedItem, arrMoves;
/*Функция обработки события клик мыши по полю доски*/
document.querySelector(".rows").onclick = function (event) {
  let target = event.target;
    
  if (selectedItem) {
    selectedItem.classList.remove('clicked');
   
    for (let i = 0; i < arrMoves.length; i++) {
      document.querySelector(`#${arrMoves[i]}`).classList.remove('moves');
    }

  }	
  selectedItem = target;
  selectedItem.classList.add('clicked');
  arrMoves = horseMove(target.id);
  
  for (let i = 0; i < arrMoves.length; i++) {
        document.querySelector(`#${arrMoves[i]}`).classList.add('moves');
  }
};