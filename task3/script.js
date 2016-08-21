var blocksCount = 50;

$(document).ready(function(){
	$ContentContainer = $('.content-container');
	$GenerateButton = $('#Generate');
	$SetColorButton = $('#SetColor');
	$ResetButton = $('#Reset');
	
	if ($ContentContainer.children().length === 0){
		disableButton($SetColorButton, setColor);										
		disableButton($ResetButton, reset);
	};

	$GenerateButton.click(generate); 
	$SetColorButton.click(setColor);
	$ResetButton.click(reset);

});


//custom functions for disabling/enabling div buttons
function disableButton(button, f){
	button.removeClass('enabled-div-button');
	button.addClass('disabled-div-button');
	
	button.unbind('click', f);
}

function enableButton(button, f){
	button.removeClass('disabled-div-button');
	button.addClass('enabled-div-button');
	button.click(f);
}

function random(min, max) {
	return Math.floor((Math.random() * max) + min);
}

function generate(){
	if ($ContentContainer.children().length > 0){
		$ContentContainer.empty();
	}
	for (var i = 0; i < blocksCount; i++){
		$ContentContainer.append('<div class="block-content"><p>' + random(1, 100) + '</p></div>');			
	}
	disableButton($GenerateButton, generate);
	enableButton($SetColorButton, setColor);
	enableButton($ResetButton, reset);
}

function reset(){
	$ContentContainer.empty();
	disableButton($SetColorButton, setColor);
	disableButton($ResetButton, reset);
	enableButton($GenerateButton, generate);
}

function setColor(){
	disableButton($SetColorButton, setColor);

	$blocks = $('.block-content');
	$blocks.each(function(){
		var $this = $(this);
		if ($this.text() > 75){
			$this.addClass('red-block');
		}
		else if ($this.text() > 50){
			$this.addClass('orange-block');
		}
		else if ($this.text() > 25){
			$this.addClass('green-block');
		}
	});
}
