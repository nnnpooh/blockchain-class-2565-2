// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract local_variables {
    function myfunc2() public pure returns (int256) {
        int256 x = 10;
        x = x * x;
        return x;
    }

    function myfunc3() public pure returns (string memory) {
        string memory _msg = "I love you.";
        return _msg;
    }
}
