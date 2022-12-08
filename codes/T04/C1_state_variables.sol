// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract state_variables {
    uint256 a; // private by default
    uint256 public b; // 0 by default

    // This statement does not work.
    // b = 10

    uint256 public c = 10;
    uint256 public constant d = 100; // Cannot set this
}
