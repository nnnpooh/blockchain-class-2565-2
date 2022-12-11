// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract constructor_ex {

    uint public a; 
    uint public b = 10; // The initialization will be overriden.
    string public name;

    constructor(uint _a, uint _b, string memory _name) {
        a = _a;
        b = _b;
        name = _name;
    }


}