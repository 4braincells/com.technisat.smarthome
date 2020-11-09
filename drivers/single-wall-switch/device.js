'use strict';

const { ZwaveDevice } = require('homey-meshdriver');

class SingleSwitch extends ZwaveDevice {

	async onMeshInit() {
		this.enableDebug();

		this.log('SingleSwitch has been inited');

		this.registerCapability('onoff', 'SWITCH_BINARY');
		this.registerCapability('meter_power', 'METER');
	}

}

module.exports = SingleSwitch;
