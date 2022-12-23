// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Auction {
    address payable public owner;
    uint256 public startBlock;
    uint256 public endBlock;

    enum State {
        Running,
        Ended,
        Cancelled
    }

    State public auctionState;

    uint256 public highestBindingBid;
    address payable public highestBidder;

    mapping(address => uint256) public bids;
    uint256 bidIncrement;

    constructor() {
        owner = payable(msg.sender);
        auctionState = State.Running;
        startBlock = block.number;
        endBlock = startBlock + 100;
        bidIncrement = 100;
        highestBindingBid = 0; // not necessary
    }

    modifier notOwner() {
        require(msg.sender != owner, "Owner cannot bid.");
        _;
    }

    modifier afterStart() {
        require(block.number >= startBlock, "The auction has not begun yet.");
        _;
    }

    modifier beforeEnd() {
        require(block.number <= endBlock, "The auction has already ended.");
        _;
    }

    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a <= b) {
            return a;
        } else {
            return b;
        }
    }

    function placeBid() public payable notOwner afterStart beforeEnd {
        require(auctionState == State.Running, "Auction is not running.");
        require(
            msg.value >= bidIncrement,
            "You need to send at least 100 wei."
        );
        require(
            highestBidder != msg.sender,
            "You are already the highest bidder.  No need to pay more."
        );

        uint256 currentBid = bids[msg.sender] + msg.value;

        require(
            currentBid >= highestBindingBid + bidIncrement,
            "You need to bid at least the current highest-binding-bid plus bid-increment."
        );

        bids[msg.sender] = currentBid;

        uint256 highestBid = bids[highestBidder];

        if (currentBid <= highestBid) {
            highestBindingBid = min(highestBid, currentBid + bidIncrement);
        } else {
            highestBindingBid = min(currentBid, highestBid + bidIncrement);
            highestBidder = payable(msg.sender);
        }
    }
}
