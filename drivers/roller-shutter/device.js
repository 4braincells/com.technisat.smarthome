'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class RollerShutterDevice extends ZwaveDevice {

	async onNodeInit() {
		this.enableDebug();

		this.log('RollerShutter has been inited');

		this.registerCapability('windowcoverings_set', 'SWITCH_MULTILEVEL');
		if(!this.hasCapability('measure_power')) this.addCapability('measure_power');
		if(!this.hasCapability('meter_power')) this.addCapability('meter_power');

		// Get the measure_power poll setting
		var powerSetting = this.getSetting('current_report');
		powerSetting *= 10000; // * 10 (seconds due device format) * 1000ms (1 second)

		this.registerCapability('measure_power', 'METER', {
			getOpts: {
				getOnStart: true,
				pollInterval: powerSetting,
			}
		});
		this.registerCapability('meter_power', 'METER');

		this.registerReportListener('CENTRAL_SCENE', 'CENTRAL_SCENE_NOTIFICATION', report => {
			if (report.hasOwnProperty('Properties1')
                && report.Properties1.hasOwnProperty('Key Attributes')
                && report.hasOwnProperty('Scene Number')) {
					// Build state from the report. Parse the count from the text "Key pressed 'n' times"
					const state = {
						button: report['Scene Number'],
						clickcount: report.Properties1['Key Attributes'].match(/\d+/)[0],
					};

					this.driver.sceneTrigger.trigger(this, null, state);
			}
		});

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