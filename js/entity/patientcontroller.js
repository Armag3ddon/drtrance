define(['basic/entity', 'geo/v2', 'entity/patient'],
	function(Entity, V2, Patient) {
		function PatientController(pos) {
			Entity.call(this, pos);
			this.toSpawn = 2;
			this.add(new Patient(new V2(-50, 300), 1));
//			this.add(new Patient(new V2(150, 250), 2));
			this.add(new Patient(new V2(125, 380), 2));
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
