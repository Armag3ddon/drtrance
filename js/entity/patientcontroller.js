define(['basic/entity', 'geo/v2', 'entity/patient'],
	function(Entity, V2, Patient) {
		function PatientController(pos) {
			Entity.call(this, pos);
			this.toSpawn = 3;
			this.add(new Patient(new V2(40, 270), 3));
			this.add(new Patient(new V2(-50, 350), 1));
			this.add(new Patient(new V2(140, 390), 2));
		}

		PatientController.prototype = new Entity();

		PatientController.prototype.onUpdate = function (delta) {
			for (var i = this.toSpawn - 1; i >= 0; i--)
			{
				if(this.entities[i].health <= 0) this.remove(this.entities[i]);
			}
		}

		PatientController.prototype.beat = function(time) {
			this.dispatch(this.entities, 'beat', time);
		};

		return PatientController;
	}
);
