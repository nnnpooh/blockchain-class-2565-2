// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract BaseContract {
    int256 public x;
    address public owner;

    constructor() {
        x = 5;
        owner = msg.sender;
    }

    function setX(int256 _x) public {
        x = _x;
    }
}

contract A is BaseContract {
    int256 public y = 10;

    // This will give error;
    // int public x = 30;

    function setY(int256 _y) public {
        y = _y;
    }
}
