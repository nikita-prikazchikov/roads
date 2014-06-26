function Coordinate (x, y){
    this.x = x;
    this.y = y;
}
//======================================================================================================================
function Road(road){
    this.coordinates = [];
    for(var i = 0; i < road.coordinates.length; i ++){
        this.coordinates.push(new Coordinate(road.step * i, road.coordinates[i]))
    }
    this.step = road.step;
    this.name = road.name;
    this.id = road.id;
    this.base = null;
}
Road.prototype.getCoordinate = function(x){
    if (x<0){
        return this.coordinates[0].y;
    }
    if (x > this.coordinates[this.coordinates.length - 1].x){
        return this.coordinates[this.coordinates.length - 1].y;
    }
    var index = (x/this.step>>0);
    if ( x % this.step == 0){
        return this.coordinates[index].y;
    }
    var p1 = this.coordinates[index];
    var p2 = this.coordinates[index + 1];
    var k = ( p2.y - p1.y ) / ( p2.x - p1.x );
    return k * x + p2.y - k * p2.x;
};
//======================================================================================================================
function AverageRoad(road){
    this.road = road;
    this.base = null;
    this.coordinates = [];
    this.step = road.step;
}
AverageRoad.prototype.getCoordinate = Road.prototype.getCoordinate;
AverageRoad.prototype.calculateAverageRoad = function(base){
    this.base = base;
    this.average = [];
    var sumStep = 0.01;
    var points = ( this.base / sumStep ) + 1;
    var offsetValue = this.base / 2;
    for ( var index = 0; index < this.road.coordinates.length; index ++ ){
        var coordinate = this.road.coordinates[index];
        var sum = 0;
        var end = coordinate.x + offsetValue;
        for ( var x = coordinate.x - offsetValue; x <= end; x += sumStep ){
            sum += this.road.getCoordinate(x);
        }
        this.coordinates.push(new Coordinate(coordinate.x, sum/points));
    }
};
//======================================================================================================================
function SmoothedRoad(averageRoad){
    this.averageRoad = averageRoad;
    this.coordinates = [];
    this.correlation = [];
    this.step = averageRoad.step;
    this.expectationValue = 0;
    this.dispertion = 0;
}
SmoothedRoad.prototype.calculate = function(){
    for ( var index = 0; index < this.averageRoad.coordinates.length; index ++ ){
        this.coordinates.push(new Coordinate(
                this.averageRoad.coordinates[index].x,
                this.averageRoad.coordinates[index].y - this.averageRoad.road.coordinates[index].y));
    }
};
SmoothedRoad.prototype.getCoordinate = Road.prototype.getCoordinate;
SmoothedRoad.prototype.calculateDispersion = function(){
    var sum = 0.0;
    for ( var i = 0; i < this.coordinates.length; i ++ ) {
        sum += Math.pow(this.coordinates[i].y - this.expectationValue, 2 );
    }
    this.dispertion= sum / this.coordinates.length;
};
SmoothedRoad.prototype.calculateExpectationValue = function(){
    var sum = 0.0;
    for ( var i = 0; i < this.coordinates.length; i ++ ) {
        sum += this.coordinates[i].y;
    }
    this.expectationValue = sum / this.coordinates.length;
};
SmoothedRoad.prototype.calculateCorrelation =function (){
    this.correlation = [];
    for ( var k = 0; k < this.coordinates.length - 1; k++ ) {
        var sum = 0.0;
        for ( var t = 0; t < ( this.coordinates.length - k ); t++ ) {
            sum += ( this.coordinates[t].y - this.expectationValue ) * ( this.coordinates[ t + k ].y - this.expectationValue );
        }
        var cor = ( sum / ( this.coordinates.length - k ) ) / this.dispertion;
        this.correlation.push(cor);
        if ( cor < 0 ){
            break;
        }
    }
};
