// Returns number of rows in grid
function countRows() {
    return GRID.length;
  }
  
  // Returns number of columns in grid
  function countColumns() {
    return GRID[0].length;
  }
  
  // Returns grid size (e.g. '10 x 10')
  function gridSize() {
    return(countColumns() + ' x ' + countRows());
  }
  
  // Returns total number of cells/grids (e.g. '100')
  function totalCells() {
    return (countRows()*countColumns());
  }
  
  // Returns conversion of column coordiante into cell number
  function convertColumn(coordinates) {
    var index=0;
    return coordinates.toUpperCase().charCodeAt(index) - 65;
  }
  
  // Returns conversion of row coordiante into cell number
  function convertRow(coordinates) {
    return parseInt(coordinates.substring(1, coordinates.length));
  }
  
  // Returns the value of given cell
  function lightCell(coordinates) {
      var col = convertColumn(coordinates);
      var row = (coordinates.substr(1))-1;
      
      return GRID[row][col];
  }
  
  // Returns bool depending if the provided cell is a rock
  function isRock(coordinates) {
    if (lightCell(coordinates) == '^') {
      return true;
    } else {
      false;
    }
  }
  
  // Returns bool depending if the provided cell is a current
  function isCurrent(coordinates) {
    if (lightCell(coordinates) == '~') {
      return true;
    } else {
      false;
    }
  }
  
  // Returns bool depending if the provided cell is a ship
  function isShip(coordinates) {
    if (lightCell(coordinates) == 'v') {
      return true;
    } else {
      false;
    }
  }
  
  // Returns the entire row provided
  function lightRow(num) {
    return GRID[num-1];
  }
  
  // Returns the entire column provided
  function lightColumn(char) {
    var col = convertColumn(char);
    var numRows = countRows();
    var litColumns = [];
    
    for (var i=0; i<numRows; i++) {
      litColumns.push(GRID[i][col]);
    }
    
    return litColumns;
  }
  
  // Retuns the grids with the provided value/hazzard
  function checkFor(hazzard) {
    var numCol = countColumns();
    var numRow = countRows();
    var hazzArr = [];
    
    for (var c=0; c<numCol; c++) {
      for (var r=0; r<numRow; r++) {
        if (GRID[r][c] == hazzard) {
          var cToStr = String.fromCharCode(c+65);
          var rToStr = String(r+1);
          hazzArr.push(cToStr + rToStr);
        }
      }
    }
    
    return hazzArr;
  }
  
  // Returns all cells with rocks
  function allRocks() {
    return checkFor('^');
  }
  
  // Returns all cells with currents
  function allCurrents() {
    return checkFor('~');
  }
  
  // Returns all cells with ships
  function allShips() {
    return checkFor('v');
  }
  
  // Retuns the first grid with the provided value/hazzard
  function checkForFirst(hazzard) {
    var numCol = countColumns();
    var numRow = countRows();
    var hazzArr;
    
    for (var r=0; r<numRow; r++) {
      for (var c=0; c<numCol; c++) {
        if (GRID[r][c] == hazzard) {
          var cToStr = String.fromCharCode(c+65);
          var rToStr = String(r+1);
          hazzArr = cToStr + rToStr;
          return hazzArr;
        }
      }
    }
  }
  
  // Returns first cell with a rock in the grid
  function firstRock() {
    return checkForFirst('^');
  }
  
  function firstCurrent() {
    return checkForFirst('~');
  }
  
  // Returns array with coordinates of ships furthest to west/left and east/right
  function shipReport() {
    return ([allShips()[0], allShips()[(allShips().length-1)]]);
  }
  
  function howDangerous (coordinate) {
    if (isRock(coordinate)) {
      return '100';
    } else if (isCurrent(coordinate)) {
      return '50';
    } else {
      return '0';
    }
  }
  
  // Returns an array with 2 values; percentage of rocks and percentage of currents
  function percentageReport() {
    return ([(((allRocks().length)/(totalCells()))*100).toFixed(2), ((allCurrents().length/(totalCells()))*100).toFixed(2)]);
  }
  
  //Returns initialized array with given dimensions
  var createArray = (row, col) => {
    var array = new Array(row);
    for (var r=0; r<countRows(); r++) {
        array[r]= new Array(col);
    }
    return array;
  };
  
  
  function safetyReport() {
    report = createArray(countRows(), countColumns());
    let checkReport = GRID.map((rowValue, rowIndex, rowsArray)  => {
      rowValue.map((columnValue, columnIndex, columnArray) => {
        var coordinate = String.fromCharCode(65+columnIndex) + parseInt(rowIndex+1);
        report[rowIndex][columnIndex] = howDangerous(coordinate);
      });
    });
    return report;
  }
  
  // Retuns the displacement (absolute)
  function calcDistance(coor1, coor2) {
    var colDiff = (convertColumn(coor1))-(convertColumn(coor2));
    var rowDiff = (convertRow(coor1))-(convertRow(coor2));
    return Math.sqrt((colDiff*colDiff)+(rowDiff*rowDiff)).toFixed(2);
  }
