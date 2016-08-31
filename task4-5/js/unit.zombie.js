var unit = {};

	unit.zombie = function (line) {
		this.zombieLine = $(line);
		$(line).append('<div class="zombie"> </div>');
		this.zombie = $('div [class="zombie"]');
		this.zombie.append('<p> 100% </p>')
		var position = 0;

		this.move = function(){	
			this.gameOver();
			position += this.speed;
			if (this.zombie){
				if (this.zombie.position().left <= 0){
					$('.game-over').css('display', 'block');
					unit.zombie.prototype.gameOver = function(){
						this.zombie.remove();
					};
				}
				else{
					this.zombie.css('right', position + 'px');
				}
			}
		};

		this.health = 50;
		this.currentHealth = this.health;

		this.die = function(){
			if (this.zombie){
				this.zombie.remove();
				this.zombie = null;	
			}			
		}

		this.explode = function(){
			this.health -= 15;
			if (this.health <= 0)
				this.die();
			else
			this.zombie.children().last().text(((this.health / this.currentHealth) * 100).toFixed()+'%');
		}

		this.growOld = function(){
			this.health -= 1;
			if (this.health <= 0)
				this.die();
			else
			this.zombie.children().last().text(((this.health / this.currentHealth) * 100).toFixed()+'%');
		}


		this.damage = function(dmg){
			this.health -= dmg;
			if (this.health <= 0){
				this.die();
			}
			else{
				this.zombie.children().last().text(((this.health / this.currentHealth) * 100).toFixed()+'%');
			}
			if (this.health < 0 ){
				return this.health + dmg;
			}
			else {
				return dmg;
			}
		}	
	};

		unit.zombie.prototype.speed = 1;
		unit.zombie.prototype.gameOver = function(){

		};