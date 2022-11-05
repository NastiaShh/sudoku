/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
function solve(boardString) {
  function getArr(boardString) {
    const arr = boardString.split('');
    let result = [];
  
    for (let i = 0; i < arr.length; i++) {
      const breakdown = arr.splice(0, 9);
      result.push(breakdown);
    };

    return result;
  };

  const board = getArr(boardString);
  
  function findEmptyCell(board) {
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] === "-") {
          return [r, c];
        }
      }
    }
    return 0;
  }
  
  function findNum(cell, table) {
    if (findEmptyCell(board) === 0) {
      return table
    }

    function checkNum(num, cell, table) {
      const [r, c] = cell; 
      for (let i = 0; i < 9; i++) {
        if (table[r][i] === num) {
          return false;
        }
      }
  
      for (let j = 0; j < 9; j++) {
        if (table[j][c] === num) {
          return false;
        }
      }

      const boxRow = Math.floor(r/3) * 3;
      const boxColumn = Math.floor(c/3) * 3;

      for (let x = boxRow; x < boxRow + 3; x++) {
        for (let y = boxColumn; y < boxColumn + 3; y++) {
          if (table[x][y] === num)  {
            return false;
          }
        }
      }
      
      return true;
    }

    function solving() {
      const posOfEmpty = findEmptyCell(board);
      if (posOfEmpty === 0) {
        return true;
      }
      for (let i = 1; i < 10; i++) {
        const num = i.toString();
        const newNum = checkNum(num, posOfEmpty, table);
        if(newNum) {
          const [r, c] = posOfEmpty;
          board[r][c] = num;
          if (solving()) {
            return true;
          }
          board[r][c] = '-';
        }
      }
      return false;
    }
    solving();
    return board;
  }

  findNum(findEmptyCell(board), board);
  return board;
}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */
function isSolved(board) {
  let res = 0;
  board.map(el => {
    res += el.reduce((acc, num) => Number(acc) + Number(num), 0) 
  })
  return res === 405;
}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает строку с игровым полем для последующего вывода в консоль.
 * Подумай, как симпатичнее сформировать эту строку.
 */
function prettyBoard(sudoku) {
  console.table(sudoku);
}

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
