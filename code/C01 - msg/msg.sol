// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract MessageFromMe {

    string public message = "Hi";

    function change(string memory messageNew) public {
        message = messageNew;
    }

}