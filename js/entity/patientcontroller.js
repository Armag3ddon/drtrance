define(['basic/entity', 'geo/v2', 'entity/patient'],
	function(Entity, V2, Patient) {
		function PatientController(pos) {
			Entity.call(this, pos);
			this.toSpawn = 3;
			this.add(new Patient(new V2(40, 270), 3));
			this.add(new Patient(new V2(-50, 350), 1));
			this.add(new Patient(new V2(140, 390), 2));
			this.patients_index = 2;

			this.current_patient = this.getCurrentPatient();
		}

		PatientController.prototype = new Entity();

		PatientController.prototype.onUpdate = function (delta) {
		}

		PatientController.prototype.reduceHealthAndGetDefeated = function() {
			if (this.parent.gameEnded == false)
			{
				this.current_patient.reduceHealth();

				if (this.current_patient.isDefeated()) {
					this.patients_index--;
					this.current_patient = this.getCurrentPatient();
					return true;
				}
			return false;
		}
		};

		PatientController.prototype.getCurrentPatient = function() {
			return this.entities[this.patients_index];
		}

		PatientController.prototype.beat = function(time) {
			this.dispatch(this.entities, 'beat', time);
		};

		PatientController.prototype.patientsLeft = function() {
			return this.patients_index + 1;
		};

		return PatientController;
	}
);
