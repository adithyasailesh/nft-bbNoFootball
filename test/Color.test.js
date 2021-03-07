const { assert } = require('chai')

const Color = artifacts.require('./Color.sol')

require('chai').use(require('chai-as-promised')).should()

contract('Color', (accounts) => {
    let contract
    before(async() => {
        contract = await Color.deployed()
    })

    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = contract.address
            assert.notEqual(address, '')
            assert.notEqual(address, 0x0)
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async() => {
            const name = await contract.name()
            assert.equal(name, 'Color')
        })

        it('has a symbol', async() => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'COLOR')
        })
    })

    describe('minting', async() => {
        it('minted successfully', async() => {
            const result = await contract.mint('#FFFFFF')
            const totalSupply = await contract.totalSupply()
            assert.equal(totalSupply, 1)
            console.log(result)
            const event = result.logs[0].args
            console.log(event)
            assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
            assert.equal(event.to, accounts[0], 'to is correct')
                
            // This will fail as the color has already been minted
            await contract.mint('#FFFFFF').should.be.rejected
        })
    })

    describe('indexing', async() => {
        it('lists colors', async() => {
            await contract.mint('#FFFFF1')
            await contract.mint('#FFFFF2')
            const totalSupply = await contract.totalSupply()
            let color
            let result = []

            for (var i = 1 ; i <= totalSupply; i++) {
                color = await contract.colors(i - 1)
                result.push(color)
            }

            let expected = ["#FFFFFF", "#FFFFF1", "#FFFFF2"]
            assert.equal(result.join(','), expected.join(','))
        })
    })

})