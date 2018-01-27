define(['basic/entity', 'geo/v2', 'entity/patient'],
	function(Entity, V2, Patient) {
		function PatientController(pos) {
			Entity.call(this);
			this.position = pos;
			this.toSpawn = 3;
			for (var i = this.toSpawn; i > 0; i--)
			{
					this.add(new Patient(new V2(600 - (i*150), 300)));
			}
		}

		PatientController.prototype = new Entity();

		PatientController.prototype.onUpdate = function (delta) {
			for (var i = this.toSpawn - 1; i >= 0; i--)
			{
				if(this.entities[i].health <= 0) this.remove(this.entities[i]);
			}
		}

		return PatientController;
	}
);
