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
    function allowance(address _owner, address _spender)
        external
        view
        returns (uint256 remaining);

    function approve(address _spender, uint256 _value)
        external
        returns (bool success);

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool success);

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

    // V2
    mapping(address => mapping(address => uint256)) allowed;

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

    // V2
    function allowance(address _owner, address _spender)
        public
        view
        override
        returns (uint256 remaining)
    {
        return allowed[_owner][_spender];
    }

    // V2
    function approve(address _spender, uint256 _value)
        public
        override
        returns (bool success)
    {
        require(_value > 0, "The allowed value must be greater than zero.");
        require(
            balances[msg.sender] >= _value,
            "Not enough token in the origin account."
        );

        allowed[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // V2
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public override returns (bool success) {
        require(
            allowed[_from][msg.sender] >= _value,
            "You don't have enough allowance."
        );
        require(
            balances[_from] >= _value,
            "Not enough tokens in the origin account"
        );

        balances[_from] -= _value;
        allowed[_from][msg.sender] -= _value;
        balances[_to] += _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}

contract Bank {
    ERC20Interface public token;

    constructor(address _token) {
        token = ERC20Interface(_token);
    }

    function balance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function deposit(uint256 _value) public {
        token.transferFrom(msg.sender, address(this), _value);
    }

    function allowed() public view returns (uint256) {
        return token.allowance(msg.sender, address(this));
    }
}
