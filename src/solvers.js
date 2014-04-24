/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// bc:
// if we've reached the last row of the board and have no conflicts, we have a solution
// rc:
// place a piece on a given row
//  if the board has no conflicts, we're on a good path
//    recurse above steps on next row
//  otherwise, break recursive dive and try item on next column

window.findNRooksSolution = function(n) {
  var board, solution;
  board = new Board({n: n});
  board.findNSolutions(0, "hasAnyRooksConflicts");
  solution = board.rows();

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  var findNCount = function(row, test) {
    var col;
    // base base: we've reached the last row of the board and have no conflict
    if (row === n) {
      solutionCount++;
      return;
    } 

    //recursive case: place a piece on a given row, check and recurse
    for (col = 0; col < n; col++){
      board.togglePiece(row, col);
      if (!board[test]()) findNCount(row + 1, test);
      board.togglePiece(row, col);
    } 
  }

  findNCount(0, "hasAnyRooksConflicts");

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board, solution;
  board = new Board({n: n});
  board.findNSolutions(0, "hasAnyQueensConflicts");
  solution = board.rows();

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  var findNCount = function(row, test) {
    var col;
    // base base: we've reached the last row of the board and have no conflict
    if (row === n) {
      solutionCount++;
      return;
    } 

    //recursive case: place a piece on a given row, check and recurse
    for (col = 0; col < n; col++){
      board.togglePiece(row, col);
      if (!board[test]()) findNCount(row + 1, test);
      board.togglePiece(row, col);
    } 
  }

  findNCount(0, "hasAnyQueensConflicts");

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
