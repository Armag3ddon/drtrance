define(['basic/entity', 'geo/v2', 'entity/patient', 'core/sound'],
	function(Entity, V2, Patient, s) {
		s.add('snd/patient_death1.mp3');
		s.add('snd/patient_death2.mp3');
		s.add('snd/patient_death3.mp3');
		s.add('snd/patient_death4.mp3');

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
					if (this.patients_index >= 0) {
						var rnd = Math.floor(Math.random() * 4) + 1;
						s.play('snd/patient_death' + rnd + '.mp3');
					}
					this.current_patient = this.getCurrentPatient();
					return true;
				} else {
					var rnd = Math.floor(Math.random() * 4) + 1;
					s.play('snd/patient_death' + rnd + '.mp3');
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
