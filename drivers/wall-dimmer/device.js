'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class Dimmer extends ZwaveDevice {

	async onNodeInit() {
		this.enableDebug();

		this.log('Dimmer has been inited');

		this.registerCapability('onoff', 'SWITCH_MULTILEVEL');
		this.registerCapability('dim', 'SWITCH_MULTILEVEL')
		this.registerCapability('measure_power', 'METER');
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
	}

}

module.exports = Dimmer;