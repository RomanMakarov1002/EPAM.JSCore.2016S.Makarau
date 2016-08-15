var blocksCount = 50;

$(document).ready(function(){
	$ContentContainer = $('.content-container');
	$GenerateButton = $('#Generate');
	$SetColorButton = $('#SetColor');
	$ResetButton = $('#Reset');
	
	if ($ContentContainer.children().length === 0){
		disableButton($SetColorButton);										
		disableButton($ResetButton);
	};

	$GenerateButton.on('click', function(){
		if ($ContentContainer.children().length > 0){
			$ContentContainer.empty();
		}
		for (var i = 0; i < blocksCount; i++){
			$ContentContainer.append('<div class="block-content"><p>' + random(1, 100) + '</p></div');			
		}
		disableButton($GenerateButton);
		enableButton($SetColorButton);
		enableButton($ResetButton);
	});

	$SetColorButton.on('click', function(){
		disableButton($SetColorButton);

		$blocks = $('.block-content');
		$blocks.each(function(){
			if ($(this).text() > 75){
				$(this).css('background-color', '#f44336');
				$(this).css('box-shadow', '0px 0px 0px 2px white');
			}
			else if ($(this).text() > 50){
				$(this).css('background-color', '#ff9800');
				$(this).css('box-shadow', '0px 0px 0px 2px white');
			}
			else if ($(this).text() > 25){
				$(this).css('background-color', '#4caf50');
				$(this).css('box-shadow', '0px 0px 0px 2px white');
			}
		});
	});

	$ResetButton.on('click', function(){
		$ContentContainer.empty();
		disableButton($SetColorButton);
		disableButton($ResetButton);
		enableButton($GenerateButton);
	});
});

function disableButton(button){
	button.css('opacity', 0.25);
	button.css('cursor', 'not-allowed');
	button.prop('disabled', true);
}

function enableButton(button){
	button.css('opacity', 1);
	button.css('cursor', 'pointer');
	button.prop('disabled', false);
}

function random(min, max) {
	return Math.floor((Math.random() * max) + min);
}

