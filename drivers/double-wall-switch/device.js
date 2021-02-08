'use strict';

const { ZwaveDevice } = require('homey-meshdriver');

class DoubleSwitch extends ZwaveDevice {

	async onMeshInit() {
		this.enableDebug();

		this.log('DoubleSwitch has been inited');

		this.registerCapability('onoff', 'SWITCH_BINARY');
		this.registerCapability('measure_power', 'METER');
		this.registerCapability('meter_power', 'METER');
	}

}

module.exports = DoubleSwitch;
