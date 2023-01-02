'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class DoubleSwitch extends ZwaveDevice {

	async onNodeInit() {
		this.enableDebug();

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

		// Get the measure_power poll setting
		var powerSetting = this.getSetting('current_report');
		powerSetting *= 10000; // * 10 (seconds due device format) * 1000ms (1 second)

		this.registerCapability('measure_power.output1', 'METER', {
			multiChannelNodeId: 1,
			getOpts: {
				getOnStart: true,
				pollInterval: powerSetting,
			}
		});
		this.registerCapability('measure_power.output2', 'METER', {
			multiChannelNodeId: 2,
			getOpts: {
				getOnStart: true,
				pollInterval: powerSetting,
			}
		});
		this.registerCapability('meter_power.output1', 'METER', { multiChannelNodeId: 1 });
		this.registerCapability('meter_power.output2', 'METER', { multiChannelNodeId: 2 });

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