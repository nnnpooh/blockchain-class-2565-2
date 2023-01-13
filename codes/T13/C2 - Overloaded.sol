// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract OverloadedFunction {
    uint256 public a;

    function set_a(uint256 _a) public {
        a = _a;
    }

    function set_a(uint256 _a, uint256 _b) public {
        a = _a + _b;
    }
}
