//Minimum Function

const minimumfunction = function(a , b) {

	if(a<b){
		return a;
	}
	else if (b<a)
		return b;
	else
		return("Both are Equal")

}


//Even Function

const evenfunction = function(a) {

	if ( a % 2 == 0){
		return true;
	}
	else return false;
}

const beanCount = function(stringValue){
	var count = 0;
	if(typeof stringValue == "string" ){
		for(let i = 0; i < stringValue.length ; i ++){
			if(string[i] == "b" || string[i] ==  "B")
				count++;
		}
		return count;
	}
	else
		return("Please enter a string")
}