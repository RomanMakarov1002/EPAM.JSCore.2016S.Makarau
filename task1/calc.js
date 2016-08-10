//calculation only for numbers and strings 
for(var i=0; i < data.length; i++){
	if (data[i] !== null && data[i] !== undefined && typeof data[i] != 'boolean'){
		if (data[i] == 0){
			data[i] = 10;
		}
		else if (data[i] > 100){
			data[i] = Number(data[i])-100;
		}
		else if (data[i] < 100){
			data[i] = Number(data[i])+100;
		}
	}	
}