// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract t3 {

    uint a; // private by default
    uint public constant b = 20;

    function get_a() public view returns(uint) {
        return a;
    } 

    function set_a(uint _a) public {
        a = _a;
    }

    // Error
    // function set_d(uint _b) public {
    //     b = _b;
    // }    
}