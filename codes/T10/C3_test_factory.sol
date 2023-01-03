// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract A {
    address public ownerA;
    // not correct
    // constructor() {
    //     ownerA = msg.sender;
    // }
    constructor(address eoa) {
        ownerA = eoa;
    }
}

contract Creator {
    address public ownerCreator;
    A[] public deployedA;
    constructor() {
        ownerCreator = msg.sender;
    }

    function deployA() public {
        A new_A_address = new A(msg.sender);
        deployedA.push(new_A_address);

    }
}