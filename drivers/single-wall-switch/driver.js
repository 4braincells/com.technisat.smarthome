'use strict';

const Homey = require('homey');

class SingleSwitchDriver extends Homey.Driver {
    onInit() {
        super.onInit();

        // Scene flow triggers
        this.sceneTrigger = this.homey.flow.getDeviceTriggerCard('single_switch_scenes');
        this.sceneTrigger.registerRunListener((args, state) => {
            return (args.button == state.button) && (args.clickcount == state.clickcount);
        });
    }
}

module.exports = SingleSwitchDriver;