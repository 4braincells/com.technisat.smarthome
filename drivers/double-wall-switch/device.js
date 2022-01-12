'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class DoubleSwitch extends ZwaveDevice {

	async onNodeInit() {
		this.enableDebug();
		// this.printNode();

		this.log('DoubleSwitch has been inited');

		// Based on the docs: Supported association groups - Connection 1, Connection 2.
		this.registerCapability('onoff.output1', 'SWITCH_BINARY', { multiChannelNodeId: 1 });
		this.registerCapability('onoff.output2', 'SWITCH_BINARY', { multiChannelNodeId: 2 });

		this.registerCapability('measure_power.output1', 'METER', { multiChannelNodeId: 1 });
		this.registerCapability('measure_power.output2', 'METER', { multiChannelNodeId: 2 });
		this.registerCapability('meter_power.output1', 'METER', { multiChannelNodeId: 1 });
		this.registerCapability('meter_power.output2', 'METER', { multiChannelNodeId: 2 });

		// Disable these command classes during testing for the multi channel
		// this.registerCapability('meter_power', 'METER');
		// this.registerCapability('measure_power', 'METER');
	}

	// Handle custom flow card logic
	async setOutputRunListener(args, state, value) {
		if (!args.output) return new Error('Missing arguments');
		const output = Number(args.output);

		if (output === 1) {
			this.setCapabilityValue('onoff.output1', value);
			return this._setCapabilityValue('onoff.output1', 'SWITCH_BINARY', value);
		}
		if (output === 2) {
			this.setCapabilityValue('onoff.output2', value);
			return this._setCapabilityValue('onoff.output2', 'SWITCH_BINARY', value);
		}
		return new Error('Incorrect output');
	}

}

module.exports = DoubleSwitch;
