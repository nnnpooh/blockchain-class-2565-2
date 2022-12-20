// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

 
contract lottery {

    address public manager;
    address[] public players;

    constructor () {
        manager = msg.sender;
    }

    function enter() public payable {
        players.push(msg.sender);
    }
}