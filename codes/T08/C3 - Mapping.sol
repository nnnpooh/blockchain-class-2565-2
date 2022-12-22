// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Mapping {

    mapping(uint => string) public names;
    mapping(address => uint) public bids;
    address public bidder; // Just to test putting the default value into the mapping.


    function write_name(uint idx, string memory name) public  {
        names[idx] = name; 
    }

    function place_bid() payable public{
        bids[msg.sender] = msg.value;
    }
}