var customArray = [];

for (var i = 0; i< 5; i++){
	customArray[i] ={};
	customArray[i].count = random(1,10);
	var type = random(1,3);
	customArray[i]['getCount'+type] = function(){return this.count};
	console.log('type={%s}, count={%d}', type, customArray[i].count);
}