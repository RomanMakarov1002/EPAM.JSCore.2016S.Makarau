unit.inherit = function (parent, child){
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
	child.parent = parent;
}