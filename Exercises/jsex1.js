//Javascript Exercise 1
// Looping A Triangle
*/ Print Hash Triangle /*

for( var i = 1; i <= 7; i ++){
	for ( var j = 1; j <=i; j++){
		console.log('#');
}
}
*/ Fizz Buzz */
*/ Program to print out Fizz for numbers 
3 and Buzz for numbers 5 */

fizzbuzz = function(){

	for(var i = 0; i <=100; i++){
		if(i%3==0){
			console.log("Fizz");
		}
		else if(i%5==0){
			console.log("Buzz");
		}
		else
			console.log(i);
	}


}


// Chessboard for JS

//8X8 Grid
var board = ""; // the string we add either the hash or the space

for (var i = 0; i < 8; i ++){
	for( var j = 0; j< 8; j++){
		board += (j%2) == (i%2) ? " " : "#";
	}
	board += '\n';
}

console.log(board);