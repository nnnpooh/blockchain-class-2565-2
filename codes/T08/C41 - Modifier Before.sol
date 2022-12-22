// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Modifier {

    uint public price;
    address public owner;

    constructor() {
        price = 0;
        owner = msg.sender;
    }

    function changeOwner(address _owner) public {
        //require(owner == msg.sender, "You need to be an owner.");
        owner = _owner;
    }

    function setPrice(uint _price) public {
        //require(owner == msg.sender, "You need to be an owner.");
        price = _price;
    }
}