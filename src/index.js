
// Infinite tape
class InfiniteTape {
    constructor(startingInput) {
        this._index = 0;
        //this handles index 0 through infinity
        this._positiveInfinity = [];
        // this handles index -infinity through -1
        this._negativeInfinity = [];

        for(let i = 0; i < startingInput.length; i++) {
            const charToWrite = startingInput.charAt(i);
            this.write(charToWrite);
            this.moveRight();
        }

        // reset the read head
        this._index = 0;
    }

    moveRight() {
        this._index++;
    }

    moveLeft() {
        this._index--;
    }

    readFromTape() {
        if(this._index < 0) {
            const resolvedIndex = Math.abs(this._index);
            return this._negativeInfinity[resolvedIndex];
        } else {
            return this._positiveInfinity[this._index];
        }
    }

    write(character) {
        if(this._index < 0) {
            const resolvedIndex = Math.abs(this._index);
            this._negativeInfinity[resolvedIndex] = character;
        } else {
            this._positiveInfinity[this._index] = character;
        }
    }

}

class TuringMachine {
    // blank is undefined, since our infinite tape is undefined
    static BLANK = undefined;
    constructor(input, config) {
        this._input = input;
        this._config = config;
        this._tape = new InfiniteTape(this._input);
        this._running = true;
        this._currentState = config["startState"];

    }

    get name() {
        return this._config["name"];
    }

    accepts() {
        while(this._running) {
            // we assume we don't transition to a new state and prep to halt. if we do, we allow the machine to run another round
            this._running = false;
            const characterReadFromTape = this._tape.readFromTape();
            const possibleMoves = this._config["rules"][this._currentState];

            // do we have any possible moves?
            if(possibleMoves && possibleMoves.length > 0) {
                for(let i = 0; i < possibleMoves.length; i++) {
                    const transitionToEval = possibleMoves[i];

                    // decompose the possible transition for readability
                    // reminder of order:
                    // ["read from tape", "write to tape", "move direction", "new state"]
                    const readChar  = transitionToEval[0];
                    const writeChar = transitionToEval[1];
                    const moveDir   = transitionToEval[2];
                    const newState  = transitionToEval[3];

                    // did we find a valid transition?
                    if(readChar === characterReadFromTape) {
                        // write to the tape
                        this._tape.write(writeChar);

                        // move as needed
                        if(moveDir === 'R') {
                            this._tape.moveRight();
                            this._running = true;
                        } else if (moveDir === 'L'){
                            this._tape.moveLeft();
                            this._running = true;
                        }
                        this._currentState = newState;
                        break;
                    }
                }
            }
        }
        return this._config["acceptStates"].includes(this._currentState);
    }

}

module.exports = {
    TuringMachine
};