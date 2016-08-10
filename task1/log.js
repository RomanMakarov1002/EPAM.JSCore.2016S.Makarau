// loggin to console array values
for (var i = 0; i < data.length; i++){
	if (data[i] === undefined){
		console.log('data[%d] = %s', i, 'не определено');
	}
	else if(data[i] === null){
		console.log('data[%d] = %s', i, 'не указано');
	}
	else{
		console.log('data[%d] = %s', i, data[i]);
	}	
}
