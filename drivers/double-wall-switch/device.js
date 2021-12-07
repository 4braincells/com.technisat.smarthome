'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class DoubleSwitch extends ZwaveDevice {

	async onNodeInit() {
		this.enableDebug();
		this.printNode();

		this.log('DoubleSwitch has been inited');

		// Based on the docs: Supported association groups - Connection 1, Connection 2.
    		this.registerCapability('onoff.output1', 'BASIC_SET', { multiChannelNodeId: 1 });
    		this.registerCapability('onoff.output2', 'BASIC_SET', { multiChannelNodeId: 2 });
		
		// Disable these command classes during testing for the multi channel
		this.registerCapability('meter_power', 'METER');
		this.registerCapability('measure_power', 'METER');
	}

}

module.exports = DoubleSwitch;
