'use strict';

const { ZwaveDevice } = require('homey-meshdriver');

class Dimmer extends ZwaveDevice {

	onMeshInit() {
		this.enableDebug();

		this.log('Dimmer has been inited');

		this.registerCapability('onoff', 'SWITCH_BINARY');
		this.registerCapability('dim', 'SWITCH_MULTILEVEL')
		this.registerCapability('measure_power', 'METER');
		this.registerCapability('meter_power', 'METER');
	}

}

module.exports = Dimmer;
