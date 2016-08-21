var cherriesCount=0;
var orangesCount =0;
var pumpkinsCount=0;
var cheeseCount=0;
var resources = ['game-counters-container-cherry', 'game-counters-container-orange', 'game-counters-container-pumpkin', 'game-counters-container-cheese'];
var counters = [cherriesCount, orangesCount, pumpkinsCount, cheeseCount];
var resourceTimeSpawn = 800;
var resourceTimeLive = 1300;
var bombTimeSpawn = 7000;
var bombTimeLive = 2600;
var explodeDamage = 10;
var $button;

$(document).ready(function(){
	$button = $('.btn.btn-start');
	var resourceTimeout;
	var bombTimeout; 	
	var resourceTime = new timer(createResource, resourceTimeSpawn);
	var bombTime = new timer(createBomb, bombTimeSpawn);
	$button.on('click', function(){
		$this = $(this);
		if ($this.hasClass('btn-start')){
			$this.addClass('btn-stop');
			$this.removeClass('btn-start');
			$this.html('Stop');
			resourceTime.resume();
			bombTime.resume();			
		}
		else if ($this.hasClass('btn-stop')){
			$this.removeClass('btn-stop');
			$this.addClass('btn-resume');
			$this.html('Resume');
			resourceTime.pause();
			bombTime.pause();
		}		
		else if ($this.hasClass('btn-resume')){
			$this.removeClass('btn-resume');
			$this.addClass('btn-stop');
			$this.html('Stop');
			resourceTime.resume();
			bombTime.resume();
		}
	});	
});


//creates 1 of the 4 resources at random position
function createResource(){
	var $container = $('.game-action-container');
	$container.append('<div class="resource"> </div>');
	var $resource = $('div[class="resource"]');
	$resource.addClass(resources[random(0,4)]);
	$resource.css('left', random(0,385));
	$resource.css('top', random(0,385));
	$resource.css('bottom', 'auto');
	$resource.css('opacity', 0);
	proceedResource($resource);
};

//creates recursively another resource and animates current resource
function proceedResource($createdResource){
	var resourceTime = new timer(createResource, resourceTimeSpawn);
	resourceTime.resume();
	var animateResource = new AnimateResource($createdResource, resourceTimeLive);
	$button.on('click', function(){
		$this = $(this);
		if ($this.hasClass('btn-stop')){
			animateResource.resume();
			resourceTime.resume();
		}
		else if ($this.hasClass('btn-resume')){  
			animateResource.pause();
			resourceTime.pause();
		}
	});
	$createdResource.on('click', addCounter);
}

//adds score to one of the resource containers
function addCounter(){
	$this = $(this);
	if ($this)
	{
		if ($this.hasClass('game-counters-container-cherry')){
			$('.game-counters-container-cherry p').html(counters[0]+=1);
		}
		else if ($this.hasClass('game-counters-container-orange')){
			$('.game-counters-container-orange p').html(counters[1]+=1);
		}
		else if ($this.hasClass('game-counters-container-pumpkin')){
			$('.game-counters-container-pumpkin p').html(counters[2]+=1);
		}
		else if ($this.hasClass('game-counters-container-cheese')){
			$('.game-counters-container-cheese p').html(counters[3]+=1);
		}
		$this.remove();
	}
}

function createBomb(){
	var $container = $('.game-action-container');
	$container.append('<div class="resource"> </div>');
	var $resource = $('div[class="resource"]');
	$resource.addClass('game-bomb');
	$resource.css('left', random(0,385));
	$resource.css('top', random(0,385));
	$resource.css('opacity', 0);

	var bombTime = new timer(createBomb, bombTimeSpawn);
	bombTime.resume();
	var animateResource = new AnimateResource($resource, bombTimeLive);
	$button.on('click', function(){
		$this = $(this);
		if ($this.hasClass('btn-stop')){
			animateResource.resume();
			bombTime.resume();
		}
		else if ($this.hasClass('btn-resume')){  
			animateResource.pause();
			bombTime.pause();
		}
	});	
};


function random(min, max) {
	return Math.floor((Math.random() * max) + min);
}

//timer for resource creation
function timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    this.resume = function() {
        start = new Date();
        clearTimeout(timerId);
        if (remaining > 0)
        timerId = setTimeout(callback, remaining);
    };
}

//timer for resource animation
function AnimateResource(resource, delay){
	var remaining = delay;
	var start = 0;
	
	this.pause = function(){
		resource.stop();
		remaining -= new Date() - start;
	};

	this.resume = function(){
		start = new Date();
		resource.animate({opacity:1}, remaining, function(){
			if (resource.hasClass('game-bomb')){
				explode();
			}
			resource.remove();
		});
	};

	this.resume();
}

//bomb explode logic
function explode(){
	var rnd = random(0,4);
	counters[rnd] -= explodeDamage;
	if (counters[rnd] < 0)
		counters[rnd] = 0; 
	$('.' + resources[rnd] + ' p').html((counters[rnd]) || '-') ;
}
