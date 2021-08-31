'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class SingleSwitch extends ZwaveDevice {

	async onNodeInit() {
		this.enableDebug();

		this.log('SingleSwitch has been inited');

		this.registerCapability('onoff', 'SWITCH_BINARY');
		this.registerCapability('measure_power', 'METER');
		this.registerCapability('meter_power', 'METER');
	}

}

module.exports = SingleSwitch;
