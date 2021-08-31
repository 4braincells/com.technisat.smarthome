'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class RollerShutterDevice extends ZwaveDevice {

	async onNodeInit() {
		this.enableDebug();

		this.log('RollerShutter has been inited');

		this.registerCapability('windowcoverings_set', 'SWITCH_MULTILEVEL');

		// Reset the calibration setting so that it doesn't stick on calibrating.
		this.registerSetting('start_calibration', newValue => {
			if (newValue) {
				setTimeout(() => {
					this.setSettings({ start_calibration: false });
				}, 5000);
			}
	  
			return new Buffer([newValue ? 1 : 0]);
		});
	}

}

module.exports = RollerShutterDevice;
