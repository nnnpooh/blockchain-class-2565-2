// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

interface ERC20Interface {
    // State variables
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);

    function totalSupply() external view returns (uint256);

    // Mandatory functions
    function balanceOf(address _owner) external view returns (uint256 balance);

    function transfer(address _to, uint256 _value)
        external
        returns (bool success);

    // Optional functions
    // function allowance(address _owner, address _spender) external view returns (uint256 remaining);
    // function approve(address _spender, uint256 _value) external returns (bool success);
    // function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);

    // Events
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
}

contract Cryptos is ERC20Interface {
    string public override name = "Industrail Engineering CMU";
    string public override symbol = "IECMU";
    uint8 public override decimals = 0;
    uint256 public override totalSupply;

    address public founder;
    mapping(address => uint256) balances;

    constructor() {
        totalSupply = 1000000;
        founder = msg.sender;
        balances[founder] = totalSupply;
    }

    function balanceOf(address _owner)
        public
        view
        override
        returns (uint256 balance)
    {
        return balances[_owner];
    }

    function transfer(address _to, uint256 _value)
        public
        override
        returns (bool success)
    {
        require(
            balances[msg.sender] >= _value,
            "You don't have enough money to send."
        );

        balances[_to] += _value;
        balances[msg.sender] -= _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}
