'use strict';

const Homey = require('homey');

class DimmerDriver extends Homey.Driver {
    onInit() {
        super.onInit();

        // Scene flow triggers
        this.sceneTrigger = this.homey.flow.getDeviceTriggerCard('dimmer_scenes');
        this.sceneTrigger.registerRunListener((args, state) => {
            return (args.button == state.button) && (args.clickcount == state.clickcount);
        });
    }
}

module.exports = DimmerDriver;