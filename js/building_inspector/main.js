var ctx;
var world = createWorld();
var WIDTH;
var HEIGHT;
var TOP;
var LEFT;

function createWorld() {
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-1000, -1000);
	worldAABB.maxVertex.Set(1000, 1000);
	var gravity = new b2Vec2(0, 300);
	var doSleep = true;
	var world = new b2World(worldAABB, gravity, doSleep);
	createGround(world);
	return world;
}

function createGround(world) {
	var groundSd = new b2BoxDef();
	groundSd.extents.Set(1000, 50);
	groundSd.restitution = 0.2;
	var groundBd = new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(-500, 340);
	return world.CreateBody(groundBd)
}

function step() {
  world.Step(1.0/60, 1);
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  draw(world, ctx);
  setTimeout('step(0)', 10);
}

Event.observe(window, 'load', function() {
  ctx = $('canvas').getContext('2d');
  WIDTH = parseInt($('canvas').width);
  HEIGHT = parseInt($('canvas').height);
  TOP = parseInt($('canvas').style.top);
  LEFT = parseInt($('canvas').style.left);

  step();
})
