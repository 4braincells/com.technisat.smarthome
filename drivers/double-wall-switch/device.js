'use strict';

const { ZwaveDevice } = require('homey-meshdriver');

class DoubleSwitch extends ZwaveDevice {

	async onMeshInit() {
		this.enableDebug();
		this.printNode();

		this.log('DoubleSwitch has been inited');

		this.registerCapability('onoff', 'BASIC', { multiChannelNodeId: 1 });
		this.registerCapability('onoff', 'BASIC', { multiChannelNodeId: 2 });
		// Disable these command classes during testing for the multi channel nodes
		//this.registerCapability('measure_power', 'METER');
		//this.registerCapability('meter_power', 'METER');

		this.registerReportListener('METER', 'METER_REPORT', report => {
			if (report) {
				this.log('Meter report: ', report);
			}
		})
	}

}

module.exports = DoubleSwitch;
