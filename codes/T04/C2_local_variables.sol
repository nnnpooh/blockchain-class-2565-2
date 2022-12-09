// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract localVariable {
    // cost gas
    // function myfunc1() public {}

    // free
    // function myfunc2() public pure {}

    function myfunc3() public pure returns (int256) {
        int256 x = -10;
        x = x * x;
        return x;
    }

    function myfunc4() public pure returns (string memory) {
        string memory txt = "I love you.";
        return txt;
    }
}
