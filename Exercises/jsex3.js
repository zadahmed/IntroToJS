//Sum of a Range

const range = function(start , end){
	var list = [];
	for(let i = start; i <= end ; i++){
		list.push[i];
	}
	console.log(list);
};

//Another shorter solution
function range(start ,end){
	return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

//Sum function
const sum = function(start , end){
	var sum = 0;
	for(let i = start; i <= end ; i++){
		sum += i;
	}
	console.log(sum);
};

// Advanced Range Function
///That determines how many numbers to skip 

const rangeWithStep = function(start ,end , step){
	var list = []
	for(let i = start; i <= end ; i+step){
		list.push[i];
	}
};


//Reversing an Array

//Reverse array arranges the place of the components in the array

const reverseArray = function(array[]){
	var newArray = [];
	for(let i = array.length-1 ; i > 0 ; i--){
		newArray.push[i];
	}
	//or
	// array.reverse();
};


//Reversing the Array considering the value of the elements in the array
const reverseArrayInPlace = function(array[]){
	array.reverse();
};


//Array to list function
const arrayToList = function(array){
	var list = {};
	for(let i = 0; i < array.length; ++i){
		list[i] = array[i];
	}


}
