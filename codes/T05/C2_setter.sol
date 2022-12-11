// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract setter {

    uint a; // private by default
    uint public constant b = 20;
    string public name = 'John';

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

    function set_name(string memory newName) public {
        name = newName;
    }

    // Return of this function do nothing because the function return hash.
    // function set_name2(string memory newName) public returns(string memory) {
    //     name = newName;
    //     return newName;
    // }

}