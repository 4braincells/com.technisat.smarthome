'use strict';

const Homey = require('homey');

class DoubleSwitchDriver extends Homey.Driver {
    onInit() {
        super.onInit();

        // Flow triggers
        this.turnedOnFlow = this.homey.flow.getDeviceTriggerCard('double_switch_turned_on');
        this.turnedOnFlow.registerRunListener((args, state) => {
            return args.output == state.output; 
        });
		this.turnedOffFlow = this.homey.flow.getDeviceTriggerCard('double_switch_turned_off');
        this.turnedOffFlow.registerRunListener((args, state) => {
            return args.output == state.output; 
        });
		this.toggledFlow = this.homey.flow.getDeviceTriggerCard('double_switch_toggled');
        this.toggledFlow.registerRunListener((args, state) => {
            return args.output == state.output;
        });

        // Scene flow triggers
        this.sceneTrigger = this.homey.flow.getDeviceTriggerCard('double_switch_scenes');
        this.sceneTrigger.registerRunListener((args, state) => {
            return (args.button == state.button) && (args.clickcount == state.clickcount);
        });

        // Flow conditions
        this.isTurnedOnFlow = this.homey.flow.getConditionCard('double_switch_is_turned_on');
        this.isTurnedOnFlow.registerRunListener((args, state) => {
            return args.state == state.output && args.device.getCapabilityValue(`onoff.output${args.output}`) == true;
        });

        this.isTurnedOffFlow = this.homey.flow.getConditionCard('double_switch_is_turned_off');
        this.isTurnedOffFlow.registerRunListener((args, state) => {
            return args.state == state.output && args.device.getCapabilityValue(`onoff.output${args.output}`) == false;
        });

        // Flow actions
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

    async outputFlowTriggerListener(device, output, value) {
		this.toggledFlow.trigger(device, {}, { output });
		if (value) {
			this.turnedOnFlow.trigger(device, {}, { output });
		} else {
			this.turnedOffFlow.trigger(device, {}, { output });
		}
	}

}

module.exports = DoubleSwitchDriver;