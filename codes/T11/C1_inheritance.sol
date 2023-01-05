// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract BaseContract {
    int public x;
    address public owner;

    constructor() {
        x = 5;
        owner = msg.sender;
    }
}

contract A is BaseContract {
    int public y = 10;
}