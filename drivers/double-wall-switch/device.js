'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class DoubleSwitch extends ZwaveDevice {

	async onNodeInit() {
		this.enableDebug();
		// this.printNode();

		this.log('DoubleSwitch has been inited');

		// Based on the docs: Supported association groups - Connection 1, Connection 2.
		// Set a custom report parser to catch on/off events and use them for the flow triggers.
		this.registerCapability('onoff.output1', 'SWITCH_BINARY', {
			reportParserV1: report => {
				if (report && report.hasOwnProperty('Value')) {
					if (report.Value === 'on/enable') {
						this.driver.outputFlowTriggerListener(this, 1, true);
						return true;
					}
					if (report.Value === 'off/disable') {
						this.driver.outputFlowTriggerListener(this, 1, false);
						return false;
					}
				}
				return null;
			},
			multiChannelNodeId: 1
		});

		this.registerCapability('onoff.output2', 'SWITCH_BINARY', {
			reportParserV1: report => {
				if (report && report.hasOwnProperty('Value')) {
					if (report.Value === 'on/enable') {
						this.driver.outputFlowTriggerListener(this, 2, true);
						return true;
					}
					if (report.Value === 'off/disable') {
						this.driver.outputFlowTriggerListener(this, 2, false);
						return false;
					}
				}
				return null;
			},
			multiChannelNodeId: 2
		});

		this.registerCapability('measure_power.output1', 'METER', { multiChannelNodeId: 1 });
		this.registerCapability('measure_power.output2', 'METER', { multiChannelNodeId: 2 });
		this.registerCapability('meter_power.output1', 'METER', { multiChannelNodeId: 1 });
		this.registerCapability('meter_power.output2', 'METER', { multiChannelNodeId: 2 });

		// Disable these command classes during testing for the multi channel
		// this.registerCapability('meter_power', 'METER');
		// this.registerCapability('measure_power', 'METER');
	}
}

module.exports = DoubleSwitch;
