// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract setter {
    uint256 a; // private by default
    uint256 public constant b = 20;
    string public name = "John";

    function get_a() public view returns (uint256) {
        return a;
    }

    function set_a(uint256 _a) public {
        a = _a;
    }

    // Error
    // function set_b(uint _b) public {
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
