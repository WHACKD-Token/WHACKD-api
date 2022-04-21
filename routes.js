
const path = require('path')
const express = require('express');
const router = express.Router();
const Web3 = require("web3")
const axios = require("axios")

const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/6c9b0e506a304bc799dc709d0984db04"))
const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]
const URL = 'https://etherscan.io/address/0xCF8335727B776d190f9D15a54E6B9B9348439eEE'
const address = "0xCF8335727B776d190f9D15a54E6B9B9348439eEE" //WHACKD contract address
const contract = new web3.eth.Contract(abi, address)
const decimalPlaces = 1000000000000000000
const ETHdecimalPlaces = 1000000000000000
const supply = 1000000000
const bigSupply = 1000000000000000000000000000
const name = "Whackd"
const symbol = "WHACKD"
const _ = contract.methods
const parse = input => { return JSON.parse(input) }
const formatted = input => { return parse(input) / decimalPlaces }
const formattedETH = input => { return parse(input) / ETHdecimalPlaces }
module.exports = router;

router.get('/api', (__, res) => {
        _.totalSupply().call((__, totalSupply) => { 
  _._totalSupply().call((__, _totalSupply) => { 
                _.decimals().call((__, decimals) => { 
                                                                                        const burn = supply - formatted(totalSupply)
											const bigburn = bigSupply - parse(totalSupply)
                                                                                    res.send({
                                                                                        name,
                                                                                        symbol,
                                                                                        circulatingSupply: parse(_totalSupply) - bigburn,
                                                                                        circulatingSupplyFormatted: formatted(_totalSupply) - burn,
                                                                                        totalSupply: parse(totalSupply),
												
										
                                                                                        totalSupplyFormatted: formatted(totalSupply),
                                                                                	maxSupplyFormatted: parse(supply),
											maxSupply: parse(bigSupply), 
                                                                                        tokensBurned: bigSupply - parse(totalSupply),
                                                                                        tokensBurnedFormatted: burn,
                                                                                        tokensBurnedPercent: burn / supply,
                                                                                        contractURL: URL,
                                                                                        decimals: parse(decimals),
                                                                                                                                                                             
											apiMainPage: "https://whackd-api.herokuapp.com/"
                                                                                    }) 
                                                                                
                                                                            
                                                                        })
                                                                    })
                    
 })
});


router.get('/totalsupply-text', (__, res) => {
    _.totalSupply().call((__, totalSupply) => {
        _._totalSupply().call((__, _totalSupply) => {
            const burn = supply - formatted(totalSupply)
            res.set('text/html').send(
                (formatted(_totalSupply) - burn).toString()
            )
        })
    })
});

router.get('/circulating-text', (__, res) => {
    _.totalSupply().call((__, totalSupply) => { 
        _._totalSupply().call((__, _totalSupply) => {
            const burn = supply - formatted(totalSupply)
            res.set('text/html').send(
                (formatted(_totalSupply) - burn).toString()
            )
        })
    })
});



router.get('/circulating', (__, res) => {
    _.totalSupply().call((__, totalSupply) => { 
        _._totalSupply().call((__, _totalSupply) => {
            const burn = supply - formatted(totalSupply)
            res.send({
                circulatingSupply: formatted(_totalSupply) - burn
            })
        })
    })
});

// router.get('/liquidity', (__, res) => {
//	const UniswapWhackdEthAmountOfWhackd = "https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xCF8335727B776d190f9D15a54E6B9B9348439eEE&address=0xc491405d542a393d8d202a72f0fb076447e61891&tag=latest&apikey=VFXCIKBK33QVIW42AM7153EANCA3YT7Q7V"
//	const UniswapWhackdEthAmountOfEth = "https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&address=0xc491405d542a393d8d202a72f0fb076447e61891&tag=latest&apikey=VFXCIKBK33QVIW42AM7153EANCA3YT7Q7V"
//		axios.get(UniswapWhackdEthAmountOfWhackd).then(function (response) {	
//			console.log(response.data.result)
//       			const {hello} = response.data.result
//
//		axios.get(UniswapWhackdEthAmountOfEth).then(function (response) {
//			console.log(response.data.result)
//       			const {bye} = response.data.result
//res.send({
//
//		UniswapWhackdEthAmountOfWhackd: hello,
//		UniswapWhackdEthAmountOfETH: bye
//		
//})
//})    
//})
// });

 router.get('/liquidity-eth', (__, res) => {
    const UniswapWhackdEthAmountOfEth = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&address=0xc491405d542a393d8d202a72f0fb076447e61891&tag=latest&apikey=VFXCIKBK33QVIW42AM7153EANCA3YT7Q7V';
    axios.get(UniswapWhackdEthAmountOfEth).then(function (response) {
        console.log(response.data.result)
       const {result} = response.data
        res.send({
            UniswapWhackdEthAmountOfEth: formatted(result)
        })
    })
 });

 router.get('/liquidity-whackd', (__, res) => {
    const UniswapWhackdEthAmountOfWhackd = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xCF8335727B776d190f9D15a54E6B9B9348439eEE&address=0xc491405d542a393d8d202a72f0fb076447e61891&tag=latest&apikey=VFXCIKBK33QVIW42AM7153EANCA3YT7Q7V';
    axios.get(UniswapWhackdEthAmountOfWhackd).then(function (response) {
        console.log(response.data.result)
       const {result} = response.data
        res.send({
            UniswapWhackdEthAmountOfWhackd: formatted(result)
        })
    })
 });

router.get('/price', (__, res) => {
    const priceURL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoinsov&vs_currencies=usd';
    axios.get(priceURL).then( function (response) {
       const { usd } = response.data.bitcoinsov
        console.log(usd)
        res.send({
           currentPrice: usd
       })
    })
});


// router.get('/frozen', (__, res) => {
//    const frozenURL18 = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x26946adA5eCb57f3A1F91605050Ce45c482C9Eb1&address=0x19E6BF254aBf5ABC925ad72d32bac44C6c03d3a4&tag=latest&apikey=3WU7U7EIMED8U9AYRUNVSPPYGQ7CESGDDP';
//    axios.get(frozenURL18).then(function (response) {
//        console.log(response.data.result)
//        const {result} = response.data
//        res.send({
//            timeLockedTokens: parse(result),
//            timeLockedTokensFormatted: formatted(result)
//        })
//    })
// });

//router.get('/price', (__, res) => {
//    const priceURL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoinsov&vs_currencies=usd';
//    axios.get(priceURL).then( function (response) {
//        const { usd } = response.data.bitcoinsov
//        console.log(usd)
//        res.send({
//            currentPrice: usd
//        })
//    })
//});


router.get('/', (__, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});





