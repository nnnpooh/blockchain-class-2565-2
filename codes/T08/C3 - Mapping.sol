// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Mapping {
    mapping(uint256 => string) public names;
    mapping(address => uint256) public bids;
    address public bidder; // Just to test putting the default value into the mapping.

    function write_name(uint256 idx, string memory name) public {
        names[idx] = name;
    }

    function place_bid() public payable {
        bids[msg.sender] = msg.value;
    }
}
