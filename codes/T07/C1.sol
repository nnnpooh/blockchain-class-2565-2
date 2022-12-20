// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

 
contract lottery {

    address public manager;
    address[] public players;

    constructor () {
        manager = msg.sender;
    }


    function enter() public payable {
        require(msg.value > 0.1 ether, "Please send at least 0.1 ETH.");
        players.push(msg.sender);
    }


    function getPlayers() public view returns(address[] memory) {
        return players;
    }

    
    function random() private view returns (uint256) {
        uint256 timestamp = block.timestamp;
        uint256 difficulty = block.difficulty;
        // Dynamic array of byte or byte[]
        bytes memory enc = abi.encodePacked(timestamp, difficulty);
        bytes32 hash = keccak256(enc);
        uint256 num = uint(hash);
        return num ;
    }

    // Shorter version
    // function randomShort() private view returns (uint256) {
    //     return uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)));
    // }

    // Just for testing
    // function get_random() public view returns(uint256) {
    //     return random();
    // }

    // Just for testing
    // function get_winner_idx() public view returns(uint256) {
    //     return random() % players.length;
    // }

    function pickWinner() public {
        require(msg.sender == manager, "You need to be a manager.");
        require(players.length > 0, "Need at least one player.");
        uint256 idx = random() % players.length;
        uint256 balance = address(this).balance;
        payable(players[idx]).transfer(balance);
        players = new address[](0);
    }


}