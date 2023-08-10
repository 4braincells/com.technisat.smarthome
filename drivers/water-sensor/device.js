'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class WaterSensor extends ZwaveDevice {
    async onNodeInit() {
        // this.enableDebug();

        this.log('Water sensor has been inited');

        // HACK: To make sure the device values are not empty
        this.setCapabilityValue('alarm_water', false);
        this.setCapabilityValue('alarm_tamper', false);

        // Register the capabilitiesq
        this.registerCapability('alarm_water', 'NOTIFICATION');
        this.registerCapability('alarm_tamper', 'NOTIFICATION');
        this.registerCapability('measure_battery', 'BATTERY', {
            getOpts: {
                getOnOnline: true,
            },
        });
        this.registerCapability('alarm_battery', 'BATTERY', {
            getOpts: {
                getOnOnline: true,
            },
        });
    }
}

module.exports = WaterSensor;