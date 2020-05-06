const expect = require('chai').expect;
const TuringMachine = require('./index').TuringMachine;
const machines = require("./machines");

describe("turingmachine", function(){
    const machineKeys = Object.keys(machines);
    for(let i = 0; i < machineKeys.length; i++) {
        const turingMachineConfig = machines[machineKeys[i]];

        for(let j = 0; j < turingMachineConfig["acceptStrings"].length; j++) {
            const acceptString = turingMachineConfig["acceptStrings"][j];
            const turingMachine = new TuringMachine(acceptString, turingMachineConfig);
            it("machine '" + turingMachineConfig.name + "' should accept string: " + acceptString, function(){
                expect(true).to.equal(turingMachine.accepts());
            });
        }

        for(let j = 0; j < turingMachineConfig["rejectStrings"].length; j++) {
            const rejectString = turingMachineConfig["rejectStrings"][j];
            const turingMachine = new TuringMachine(rejectString, turingMachineConfig);
            it("machine '" + turingMachineConfig.name + "' should reject string: " + rejectString, function(){
                expect(false).to.equal(turingMachine.accepts());
            });
        }

    }

});