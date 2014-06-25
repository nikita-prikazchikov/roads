function Coordinate (x, y){
    this.x = x;
    this.y = y;
}

function Road(road){
    this.coordinates = [];
    for(var i = 0; i < road.coordinates.length; i ++){
        this.coordinates.push(new Coordinate(road.step * i, road.coordinates[i]))
    }
    this.step = road.step;
    this.name = road.name;
    this.id = road.id;
}
