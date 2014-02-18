Car = function() {
	Car.FORWARD = -1;
	Car.BACKWARD = 1;

	this.acceleration = 0.0;
	this.gear = 0.0;
	this.gears = 0;
	this.speed = 0.0;
	this.mesh = new THREE.Mesh();;
	this.model = "";
	this.moving = false;
	this.direction = 0;
	
	var mesh;


	this.initialize = function (model, gears) {
		this.model = model;
		this.gears = gears;
	};

	this.addToScene = function (scene) {
		loader = new THREE.JSONLoader();
		var model = this.model;
		
		loader.load("cars/" + this.model + "/" + this.model + ".js", function (geometry) {
			var material = new THREE.MeshPhongMaterial({
				map: THREE.ImageUtils.loadTexture("cars/" + model + "/" + model + ".png"),
				shading: THREE.SmoothShading,
				transparent: true
				});
			mesh = new THREE.Mesh(geometry, material);
			mesh.scale.set(1, 1, 1);
			scene.add(mesh);
		});
	};
	

	this.getModel = function () {
		return this.model;
	}

	this.update = function () {
		if (this.moving && Math.abs(this.gear) <= this.gears / 1000)
			this.gear += this.direction * 0.0001;
		else
			if (this.direction * this.gear > 0)
				this.gear -= this.direction * 0.0001;
			else
				this.gear = 0;

		this.acceleration = this.gear * Math.exp(this.gears - Math.abs(this.gear));

		x = mesh.position.z;
		mesh.position.z = 0.5 * this.acceleration * Math.pow(this.gear, 2) + x;
	};
};
