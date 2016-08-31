$(document).ready(function(){
	var zombieTypes=['michael', 'strong'];
	var zombies = [];
	var $btnGenerate = $('#btnGenerate');
	var $btnExplode = $('#btnExplode');
	var $fieldLines = $('.field-line');
	var $btnGrowOld = $('#btnGrowOld');
	var $btnSlowUp = $('#btnSlowUp');
	var $btnBomb = $('#btnBomb');
	var $userScore = $('#score');
	var explodeDamage = 15;
	var growOldDamage = 1;
	var bombDamage = 100;
	var growOldTime = 10000;
	var slowUpTime = 10000;
	var michaelSpeed = 2;
	var strongSpeed = 3;
	var btnBombDisabledTime = 7000;
	var btnExplodeDisabledTime = 9000;
	var btnGrowOldDisabledTime = 11000;
	var btnSlowUpDisabledTime = 13000;

	unit.inherit(unit.zombie, unit.zombie.michael);
	unit.inherit(unit.zombie, unit.zombie.strong);
	unit.zombie.michael.prototype.speed = michaelSpeed;
	unit.zombie.strong.prototype.speed = strongSpeed;

	$btnGenerate.on('click', function(){
		var randomZombie = random(0,2);
		var $line = $fieldLines[random(0,5)];
		var zombie;
		if (randomZombie == 0){
			zombie = new unit.zombie.michael($line);
		}
		else{
			zombie = new unit.zombie.strong($line);
		}

		var interval  = setInterval(function(){
			zombie.move.call(zombie);
		}, 100);

		zombies.push({zombie:zombie, interval:interval});	//array of zombies and their move intervals
	});

	$btnExplode.on('click', explode);

	$btnGrowOld.on('click', growOld);

	$btnBomb.on('click', bomb);

	$btnSlowUp.on('click', slowUp);

	//creates bomb on field line , which detonates after 1.9 sec
	function bomb(){
		disableButton($btnBomb, bomb, btnBombDisabledTime);
		$('.field-line').on('click', function(e){
			$('.field-line').unbind('click');
			$this = $(this);
			$this.append('<div class="bomb"> </div>');
			$('.bomb').css({'left': getCursorPosition($this, e) });
			$('.bomb').css('background-image', function(index, currentvalue){
				currentvalue = currentvalue.slice(0,-2) + '?' + new Date().getTime() + currentvalue.slice(-2);	//appending random string to gif url for gif reset
				return currentvalue;
			});
			var img = $('.bomb').css('background-image');
			var bombScore = 0;
			setTimeout(function(){
				for (var i = 0; i < zombies.length; i++){
					if (zombies[i] && zombies[i].zombie.zombieLine.find('.bomb').length){
						if (zombies[i].zombie.zombie){
							var zombiePosition = zombies[i].zombie.zombie.position().left;
							var bombPosition =$('.bomb').position().left;
							if (bombPosition > zombiePosition - 200 && bombPosition < zombiePosition + 200){
								bombScore += zombies[i].zombie.damage.call(zombies[i].zombie, 100);
							}
						}
						if (zombies[i].zombie.zombie == null){
							clearInterval(zombies[i].interval);
							zombies[i] = null;
						}
					}
				}
				$('.bomb').remove();
				$userScore.html(+$userScore.html() + bombScore);
			}, 1900);
		});
	}

	//gets current cursor position
	function getCursorPosition(canvas, event) {
		var x;
		canoffset = $(canvas).offset();
		x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
		return x-20;
	}

	//deals damage to all zombies
	function explode(){
		disableButton($btnExplode, explode, btnExplodeDisabledTime);
		var explodeScore = 0;
		for (var i = 0; i < zombies.length; i++){
			if (zombies[i]){
				if (zombies[i].zombie.zombie){
					explodeScore += zombies[i].zombie.damage.call(zombies[i].zombie, explodeDamage);
				}
				if (zombies[i].zombie.zombie == null){
					clearInterval(zombies[i].interval);
					zombies[i] = null;
				}	
			}
		}
		$userScore.html(+$userScore.html() + explodeScore);
	}

	//deals damage to all zombies every second during growOldTime
	function growOld(){
		disableButton($btnGrowOld, growOld, btnGrowOldDisabledTime);
		var timer = setInterval(function(){
			var growOldScore = 0;
			for (var i = 0; i < zombies.length; i++){
				if (zombies[i]){
					if (zombies[i].zombie.zombie){
						growOldScore += zombies[i].zombie.damage.call(zombies[i].zombie, growOldDamage);
					}
					if (zombies[i].zombie.zombie == null){
						clearInterval(zombies[i].interval);
						zombies[i] = null;		
					}		
				}
			}
			$userScore.html(+$userScore.html() + growOldScore);	
			},1000);
			setTimeout(function(){
				clearInterval(timer);
			}, growOldTime);	
	}

	//resets zombies speed to base speed during slowUpTime
	function slowUp(){
		disableButton($btnSlowUp, slowUp, btnSlowUpDisabledTime);
		unit.zombie.michael.prototype.speed = unit.zombie.michael.parent.prototype.speed;
		unit.zombie.strong.prototype.speed = unit.zombie.strong.parent.prototype.speed;
		setTimeout(function(){
			unit.zombie.michael.prototype.speed = michaelSpeed;
			unit.zombie.strong.prototype.speed = strongSpeed;
		}, slowUpTime);
	}

	function random(min, max) {
		return Math.floor((Math.random() * max) + min);
	}	

	function disableButton($button, func, timer){
		$button.addClass('btn-disabled');
		$button.unbind('click', func);
		setTimeout(function(){
			$button.removeClass('btn-disabled');
			$button.bind('click', func);
		}, timer);
	}
});


