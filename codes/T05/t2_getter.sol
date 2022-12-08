// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract t2 {

    uint a; // private by default
    uint public b = 10;

    function get_a() public view returns(uint) {
        return a;
    } 

    // Redundant
    function get_b() public view returns(uint) { 
        return b;
    }

}