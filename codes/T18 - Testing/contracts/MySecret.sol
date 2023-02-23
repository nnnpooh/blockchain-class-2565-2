// SPDX-License-Identifier: GPL-3.0
import "../node_modules/hardhat/console.sol";

pragma solidity >=0.7.0 <0.9.0;

contract MySecret {
    string public secret;

    constructor(string memory _secret) {
        secret = _secret;
    }

    function changeSecret(string memory _secret) public {
        secret = _secret;
    }
}
