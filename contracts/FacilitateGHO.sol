//SPDX-License-Identifier: MIT
//Code by @0xGeeLoko

pragma solidity ^0.8.19;
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

//interfaces
/*
*AAVE Collateral
*/
interface IWrappedTokenGatewayV3 {
    function depositETH(
        address pool,
        address onBehalfOf,
        uint16 referralCode
    ) external payable;
}
/*
*AAVE Loans 5299 99570700
*/
interface IPool {
    function borrow(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        uint16 referralCode,
        address onBehalfOf
    ) external;
    function repay(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        address onBehalfOf
    ) external returns (uint256);
    function getUserAccountData(
        address user
    ) external view returns(uint256, uint256, uint256, uint256, uint256, uint256);
}

contract FacilitateGHO is Ownable {
    constructor(address initialOwner) 
        Ownable(initialOwner)
    {}

    address public GHO = 0xc4bF5CbDaBE595361438F8c6a187bDc330539c60; //GHO Sepolia
    IERC20 ghoToken = IERC20(GHO);

    address public aaveGateway = 0x387d311e47e80b498169e6fb51d3193167d89F7D;
    IWrappedTokenGatewayV3 gateway = IWrappedTokenGatewayV3(aaveGateway); // collateral

    address public aavePool = 0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951;
    IPool pool = IPool(aavePool); // borrow repay

    
    function addEthCollatetal () external payable onlyOwner {
        gateway.depositETH{value: msg.value}(aavePool, address(this), 0);
    }

    function getCanBorrowBalance() public view returns (uint256){
        (/*uint256 totalCollateralBase*/,/* uint256 totalDebtBase*/, uint256 availableBorrowsBase, /*uint256 currentLiquidationThreshold*/, /*uint256 ltv*/, /*uint256 healthFactor*/) = pool.getUserAccountData(address(this));
        return availableBorrowsBase * 10**10;
    }

    function getBorrowedBalance() public view returns (uint256){
        (/*uint256 totalCollateralBase*/, uint256 totalDebtBase, /*uint256 availableBorrowsBase*/, /*uint256 currentLiquidationThreshold*/, /*uint256 ltv*/, /*uint256 healthFactor*/) = pool.getUserAccountData(address(this));
        return totalDebtBase * 10**10;
    }

    function borrowGHO (uint256 amount) internal onlyOwner {
        uint256 canBorrow = getCanBorrowBalance();
        require(amount <= canBorrow, 'cannot mint GHO');
        
        pool.borrow(GHO, amount, 2, 0, address(this));
    }

    function sellGHO (uint256 amount, address user) external onlyOwner {
        borrowGHO(amount);
        bool ghoTransferred = ghoToken.transfer(user, amount);
        require(ghoTransferred, 'Transfer failed.');
    }

    function repayLoanGHO (uint256 amount) external onlyOwner {
        uint256 borrowed = getBorrowedBalance();
        require(amount <= borrowed, 'debt overpay');

        pool.repay(GHO, amount, 2, address(this));
    }

    //withdraw aave WETH
    //callback fucntion to update balance reserve

    //withdraw onlyOwner
    function withdraw() external onlyOwner {
        require(ghoToken.balanceOf(address(this)) >= 0, 'zero balance');
        
        //clear gho vault
        uint256 balance = ghoToken.balanceOf(address(this));
        bool ghoTransferred = ghoToken.transfer(msg.sender, balance);
        require(ghoTransferred, 'Transfer failed.');
    } 


    //E!-withdraw
    function eWithdraw(address token) external onlyOwner {
        IERC20 erc20Token = IERC20(token);
        require(erc20Token.balanceOf(address(this)) >= 0, 'zero balance');

        //clear token balance
        uint256 balance = erc20Token.balanceOf(address(this));
        bool tokenTransferred = erc20Token.transfer(msg.sender, balance);
        require(tokenTransferred, 'Transfer failed.');
    } 


    //E!-withdraw E
    function eWithdrawEth() external onlyOwner {
        require(address(this).balance >= 0, 'zero balance');
        //clear eth balance
        (bool success, ) =  msg.sender.call{value: address(this).balance}('');
        require(success, 'Transfer failed.');
    }

}