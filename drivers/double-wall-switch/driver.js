'use strict';

const Homey = require('homey');

class DoubleSwitchDriver extends Homey.Driver {
    onInit() {
        super.onInit();

        this.outputOnAction = this.homey.flow.getActionCard('double_switch_turn_on');
        this.outputOnAction.registerRunListener((args, state) => {
            return args.device.setOutputRunListener(args, state, true);
        });

        this.outputOffAction = this.homey.flow.getActionCard('double_switch_turn_off');
        this.outputOffAction.registerRunListener((args, state) => {
            return args.device.setOutputRunListener(args, state, false);
        });

        this.outputToggleAction = this.homey.flow.getActionCard('double_switch_toggle');
        this.outputToggleAction.registerRunListener((args, state) => {
            return args.device.setOutputRunListener(args, state,
                !args.device.getCapabilityValue(`onoff.output${args.output}`));
        });
    }

}

module.exports = DoubleSwitchDriver;