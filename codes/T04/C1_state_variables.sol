// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract myFirstContract {
    uint256 a; // private by default
    uint256 public b;

    // This does not work.
    // b = 10

    uint256 public c = 10;
    uint256 public constant d = 100; // Constant, cannot change value
}
