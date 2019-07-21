var state = {
    robotPosition: 0,
    mapSize: 5,
    icon: 'R'
}

var histories = [];

function availablePosition(newPosition, mapSize) {
    if (newPosition >= 0 && newPosition < mapSize) {
        return true;
    } else {
        return false;
    }
}

function move(newPosition) {
    if (availablePosition(newPosition, state.mapSize)) {
        histories.push({...state});

        state.robotPosition = newPosition;
        // histories elements:  position > 2   [{robotPosition: 3, mapSize: 5}, {robotPosition: 4, mapSize: 5}]
        let filterList = histories.filter(aState => aState.robotPosition > 1);
        console.log('filter: ', filterList);
        // histories: robotPosition only   [2, 3, 4]
        console.log('map: ' + histories.map(aState => aState.robotPosition))
        // combine all the icons  'RRRRRR'
        console.log('reduce ' + histories.reduce((total, aState) => total + aState.icon, ''));
        render();
        return true;
    } else {
        return false;
    }
}

function render() {
    var mapCells = document.querySelectorAll('.map-cell');
    mapCells.forEach((aCell, index) => {
        if (index === state.robotPosition) {
            aCell.innerHTML = state.icon;
        } else {
            aCell.innerHTML = '';
        }
    })
}

function onCommandRight() {
    move(state.robotPosition + 1);
}

function onReverse() {
    state = histories.pop();
    render();
}

render();