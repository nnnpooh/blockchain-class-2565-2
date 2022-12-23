// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Auction {
    address payable public owner;
    uint public startBlock;
    uint public endBlock;

    enum State {Started, Running, Ended, Cancelled}

    State public auctionState;

    uint public highestBindingBid;
    address payable public highestBidder;

    mapping(address => uint) public bids;
    uint bidIncrement;

    constructor() {
        owner = payable(msg.sender);
        auctionState = State.Running;
        startBlock = block.number;
        endBlock = startBlock + 100;
        bidIncrement = 100;
        highestBindingBid = 0; // not necessary
    }

    modifier notOwner(){
        require(msg.sender != owner, "Owner cannot bid.");
        _;
    }

    modifier afterStart(){
        require(block.number >= startBlock, "The auction has not begun yet.");
        _;
    }

    modifier beforeEnd(){
        require(block.number <= endBlock, "The auction has already ended.");
        _;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "You need to be an owner.");
        _;
    }

    function min(uint a, uint b) pure internal returns(uint) {
        if (a <= b) {
            return a;
        } else {
            return b;
        }
    }

    function placeBid() public payable notOwner afterStart beforeEnd {
        require(auctionState == State.Running, "Auction is not running.");
        require(msg.value >= bidIncrement, "You need to send at least 100 wei.");
        require(highestBidder != msg.sender, "You are already the highest bidder.  No need to pay more.");

        uint currentBid = bids[msg.sender] + msg.value;

        require(currentBid >= highestBindingBid + bidIncrement, "You need to bid at least the current highest-binding-bid plus bid-increment.");

        bids[msg.sender] = currentBid;

        uint highestBid = bids[highestBidder];

        if (currentBid <= highestBid) {
            highestBindingBid = min(highestBid, currentBid + bidIncrement);
        } else {
            highestBindingBid = min(currentBid, highestBid + bidIncrement);
            highestBidder = payable(msg.sender);
        } 
    }

    function cancelAuction() public onlyOwner {
        auctionState = State.Cancelled;
    }

    function finalizeAuction() public {
        require(auctionState == State.Cancelled || block.number > endBlock);
        require(msg.sender == owner || bids[msg.sender] > 0);

        address payable recipient;
        uint value;

        if (auctionState == State.Cancelled) { // Auction cancelled
            recipient = payable(msg.sender);
            value = bids[msg.sender];
        } else { // Auction ended
            if (msg.sender == owner) { // This is the owner.
                recipient = owner;
                value = highestBindingBid;
            } else {
                if (msg.sender == highestBidder) {
                    recipient = highestBidder;
                    value = bids[highestBidder] - highestBindingBid;
                } else { // Bidders who did not win.
                    recipient = payable(msg.sender);
                    value = bids[msg.sender];
                }
            }
        }

        // Resetting the bids to zero
        bids[recipient] = 0;

        // Transfer the value.
        recipient.transfer(value);

    }

}