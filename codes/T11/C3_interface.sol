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
    function setX(int _x) external;

    
}

// Implement virtual function
contract A is BaseContract{
    int public x;
    int public y = 10;    

    function setX(int _x) public override{
        x = _x;
    }
}