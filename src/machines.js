const BLANK = require("./index").TuringMachine.BLANK;

const TM_ACCEPTS_STRINGS_WITH_ONLY_A = { // accept strings of only a
    "startState": "q0",
    "name": "accepts strings only with a",
    "rules": {
        // current state to an array of ["read from tape", "write to tape", "move direction", "new state"]
        "q0": [["a", "a", "R", "q1"], ["b", "b", "R", "q2"]],
        "q1": [["a", "a", "R", "q1"], ["b", "b", "R", "q2"]],
        // reject state, doesn't matter what else is on the tape
        "q2": []
    },
    "acceptStates": ["q1"],
    "acceptStrings": ["a","aaaaaaaaaaaa","aaa",],
    "rejectStrings": ["aaaaab", "ab", "b", "aaaaaba", "abaaaaa",]
};

const TM_ACCEPTS_AtoN_BtoN_CtoN_N_GT_1 = {
    "startState": "q0",
    "name": "a^nb^nc^n, n >= 1",
    "rules": {
        "q0": [["a", "X", "R", "q1"], ["Y", "Y", "R", "q4"]],
        "q1": [["Y", "Y", "R", "q1"], ["a", "a", "R", "q1"], ["b", "Y", "R" ,"q2"]],
        "q2": [["Z", "Z", "R", "q2"], ["b", "b", "R", "q2"], ["c", "Z", "L", "q3"]],
        "q3": [["a", "a", "L", "q3"], ["b", "b", "L", "q3"], ["Y", "Y", "L", "q3"], ["Z", "Z", "L", "q3"], ["X", "X", "R", "q0"]],
        "q4": [["Y", "Y", "R", "q4"], ["Z", "Z", "R", "q4"], [BLANK, BLANK, "L", "q5"]],
        "q5": [],
    },
    "acceptStates": ["q5"],
    "acceptStrings": ["aabbcc","aaabbbccc","abc",],
    "rejectStrings": ["", "aabbccc", "bbcc", "aaaabbcc", "aaaabbbcccc",]
}

module.exports = {
    TM_ACCEPTS_STRINGS_WITH_ONLY_A,
    TM_ACCEPTS_AtoN_BtoN_CtoN_N_GT_1,
}