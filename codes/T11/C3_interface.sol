// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// Cannot deploy this contract
interface BaseContract {
    // int public x;
    // address public owner;

    // constructor() {
    //     x = 5;
    //     owner = msg.sender;
    // }

    // Virtual keyword
    function setX(int256 _x) external;
}

// Implement virtual function
contract A is BaseContract {
    int256 public x; //Need to declare X here.
    int256 public y = 10;

    function setX(int256 _x) public override {
        x = _x;
    }
}
