// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract getter {

    uint a; // private by default
    uint public b = 10;
    string name = 'Tim';

    // We can get a from this getter function.
    function get_a() public view returns(uint) {
        return a;
    } 

    // Redundant
    function get_b() public view returns(uint) { 
        return b;
    }

    // If we did not use the keyword `view`, our function would not return the value.  This is about call vs transac issue.  
    // function get_a2() public returns(uint) {
    //     return a;
    // }

    // Need the keyword memory.  I guess the data from the storage is copied to memory before returning.
    function get_name() public view returns(string memory) {
        return name;
    }

}