// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract array_test {
    // Several ways to initialize an array
    uint256[] public arr;
    uint256[] public arr2 = [1, 2, 3];

    // Fixed sized array, all elements initialize to 0
    uint256[10] public arrFixed;

    // Redundant
    function get(uint256 i) public view returns (uint256) {
        return arr[i];
    }

    // Solidity can return the entire array.
    // But this function should be avoided for
    // arrays that can grow indefinitely in length.
    function getArr() public view returns (uint256[] memory) {
        return arr;
    }

    // Append to array
    // This will increase the array length by 1.
    function push(uint256 i) public {
        arr.push(i);
    }

    // Remove last element from array
    // This will decrease the array length by 1
    function pop() public {
        arr.pop();
    }

    function getLength() public view returns (uint256) {
        return arr.length;
    }

    // Delete does not change the array length.
    // It resets the value at index to it's default value,
    // in this case 0
    function remove(uint256 index) public {
        delete arr[index];
    }

    // Reset array
    function resetArr() public {
        uint256[] memory _arr = new uint256[](0);
        arr = _arr;
    }
}
