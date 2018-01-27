define(['basic/entity', 'geo/v2', 'entity/patient'],
	function(Entity, V2, Patient) {
		function PatientController(pos) {	
			Entity.call(this);
			this.position = pos;
			this.toSpawn = 3;
			this.add(new Patient(new V2(0, 300), 0));
			this.add(new Patient(new V2(150, 250), 2));
			this.add(new Patient(new V2(75, 350), 1));

			this.current_patient = this.getCurrentPatient();
		}

		PatientController.prototype = new Entity();

		PatientController.prototype.onUpdate = function (delta) {
		}

		PatientController.prototype.reduceHealthAndGetDefeated = function() {
			this.current_patient.reduceHealth();

			if (this.current_patient.isDefeated()) {
				this.remove(this.current_patient);
				this.current_patient = this.getCurrentPatient();
				return true;
			}

			return false;
		};

		PatientController.prototype.getCurrentPatient = function() {
			return this.entities[this.entities.length - 1];
		}

		return PatientController;
	}
);
