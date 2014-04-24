// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row, i, conflict;
      row = this.get(rowIndex);
      conflict = 0;
      for (i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          conflict++;
        }
        if (conflict > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var row, Board, board;
      Board = this;
      board = Board.attributes;
      conflict = false;

      for (row = 0; row < board.n; row++) {
        if (Board.hasRowConflictAt(row)) {return true};
      }

      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var Board, board, rowIndex, conflict;
      Board = this;
      board = Board.attributes;
      conflict = 0;

      for (rowIndex = 0; rowIndex < board.n; rowIndex++) {
        if (board[rowIndex][colIndex] === 1) {
          conflict++;
        }
        if (conflict > 1) {
          return true;
        }
      }

      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var col, Board, board;
      Board = this;
      board = Board.attributes;
      conflict = false;

      for (col = 0; col < board.n; col++) {
        if (Board.hasColConflictAt(col)) {return true};
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var Board, board, conflict, col, row;
      Board = this;
      board = Board.attributes;
      conflict = 0;
      row = arguments[1] || 0; // second argument should be row

      for (col = majorDiagonalColumnIndexAtFirstRow; (col < board.n) && (row < board.n); col++) {
        if(board[row][col] === 1) {
          conflict++;
        }
        if (conflict > 1) {return true;}
        row++;
      }

      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n, Board, board;
      Board = this;
      board = Board.attributes;

      for (n = 0; n < board.n - 1; n++) {
        if (n === 0) {
          if (Board.hasMajorDiagonalConflictAt(0, 0)) {return true;}
        } else {
          if (Board.hasMajorDiagonalConflictAt(0, n) ||
              Board.hasMajorDiagonalConflictAt(n, 0)) {
            return true;
          }
        }
      }

      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var Board, board, conflict, col, row;
      Board = this;
      board = Board.attributes;
      conflict = 0;
      row = arguments[1] || 0; // second argument should be row

      for (col = minorDiagonalColumnIndexAtFirstRow; (col >= 0) && (row <= board.n-1); col--) {
        if(board[row][col] === 1) {
          conflict++;
        }
        if (conflict > 1) {return true;}
        row++;
      }

      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n, Board, board;
      Board = this;
      board = Board.attributes;

      for (n = board.n - 1; n > 0; n--) {
        if (n === board.n - 1) {
          if (Board.hasMinorDiagonalConflictAt(n, n)) {return true;}
        } else {
          if (Board.hasMinorDiagonalConflictAt(n, 0) ||
              Board.hasMinorDiagonalConflictAt(board.n - 1, n)) {
            return true;
          }
        }
      }

      return false;
    },

    hasAnyConflicts: function(){
      var Board = this;
      return (
        Board.hasAnyRowConflicts() ||
        Board.hasAnyColConflicts() ||
        Board.hasAnyMinorDiagonalConflicts() ||
        Board.hasAnyMajorDiagonalConflicts()
        );
    },

    hasRookConflicts: function(){
      var Board = this;
      return (Board.hasAnyRowConflicts() || Board.hasAnyColConflicts());
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
