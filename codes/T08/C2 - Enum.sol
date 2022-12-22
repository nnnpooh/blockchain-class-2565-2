// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Enum {

    enum State {Open, Closed}
    State public auctionState;

    function close() public {
        auctionState = State.Closed;
    }

    function open() public {
        auctionState = State.Open;
    }

}