// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract EventDeposit {
    uint256 public a = 100;
    event Deposit(address indexed usr, uint256 etherAmount, uint256 time);

    function deposit() public payable {
        emit Deposit(msg.sender, msg.value, block.timestamp);
    }
}
