for (var i = 0; i < 3; i++){
	var temp = 'getCount' + (i + 1);
	var count= 0;
	for (var j = 0; j < customArray.length; j++){
		
		if (temp in customArray[j])
			count += customArray[j][temp]();
	}
	console.log('count{%d}={%d}', i + 1, count);
}
