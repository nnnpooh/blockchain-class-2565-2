// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract LoveLetter {

    string public secret;

    constructor(string memory _secret) {
        secret = _secret;
    }

    function changeSecret(string memory _secret) public {
        secret = _secret;
    }

}