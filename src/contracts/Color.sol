pragma solidity 0.5;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract Color is ERC721Full {
    string[] public colors;
    mapping(string => bool) _colorExists; // Basic key-value pair that has all colors as keys and true/false as values.

    // Access for all is public. Can't have this in production.
    constructor() ERC721Full("Color", "COLOR") public {
    }

    function mint(string memory _color) public {
        // Check if color exists in mapping. Here when require gets a false, it'll exit with an exception
        require(!_colorExists[_color]);

        // Add the color to the list of all colors. _id gets the position of the new color
        uint _id = colors.push(_color);
        
        // Mint the color. So a new block with _id is created with the details of the user who calls this function
        _mint(msg.sender, _id);

        // After a color is minted, add to mapping so that the same color can't be minted again
        _colorExists[_color] = true; // 
        
        // Track the color
    }
}
