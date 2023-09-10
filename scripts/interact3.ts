import { ethers, network } from 'hardhat';

async function main(){
  const uniswapAddr = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
  const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
  const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  // const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
  const to = '0xe9999a29B116cB45444621EcD1CE52CA013243E4'
  const UNIHOLDER = '0x47173B170C64d16393a52e6C480b3Ad8c302ba1e'
  const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  const path = [UNI, DAI]
  const path1 = [WETH, UNI]
  const AmountOut =  ethers.parseEther('1')
  const AmountinMax = ethers.parseEther('5')
  const UNISigner = await  ethers.getImpersonatedSigner(UNIHOLDER)
  const msgValue = ethers.parseEther('5')

  const currentTimestampInSeconds = Math.round(Date.now() / 1000)
  const deadline = currentTimestampInSeconds + 86400

  const uniswap = await ethers.getContractAt('IUniswap',uniswapAddr)
 // @ts-ignore
  const UniContract = await ethers.getContractAt('IERC20', UNI)
  const DAIContract = await ethers.getContractAt('IERC20',DAI )
  // const UsdcContract = await ethers.getContractAt('IERC20', USDC)
  const WETHContract = await ethers.getContractAt('IERC20', WETH)


  // to set signer balance on local host

  await network.provider.send('hardhat_setBalance', [UNIHOLDER, '0x9DC0ED08D31E336800'])

  await UniContract.connect(UNISigner).approve(uniswapAddr, AmountinMax)
  console.log('DAI BalanceBefore:' + '  ' + ethers.formatUnits(await DAIContract.balanceOf(to)))

  await uniswap
  .connect(UNISigner)
  .swapTokensForExactTokens(AmountOut, AmountinMax, path, to, deadline )

  console.log( 'DAI BalanceAfter:' + '   ' + ethers.formatUnits (await DAIContract.balanceOf(to)))

  await uniswap.connect(UNISigner)
  .swapExactETHForTokens(0, path1, to, deadline, {value: msgValue})

  console.log('UNI Balance:' + '    ' + ethers.formatUnits(await UniContract.balanceOf(to)))










}
// async function main() {
//   const uniswapAddr = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
//  // const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
//  const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
//   const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
//   const path = [WETH, DAI]
//   const to = '0xe9999a29B116cB45444621EcD1CE52CA013243E4'
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000)
//   const deadline = currentTimestampInSeconds + 86400
//   const WETHHOLDER = '0x40DCBa8E2508DDAa687fc26f9491b8cca563C845'

//   const uniswap = await ethers.getContractAt('IUniswap', uniswapAddr)
//   const WETHContract = await ethers.getContractAt('IERC20', WETH)
//   const DAIContract = await ethers.getContractAt('IERC20', DAI)

//   const AmountOut = ethers.parseEther('1')
//   const AmountinMax = ethers.parseEther('4')

//   await network.provider.send('hardhat_setBalance', [
//     WETHHOLDER,
//     '0x91A76D5E7CC6F7DEE000',
//   ])

//   const WETHSigner = await ethers.getImpersonatedSigner(WETHHOLDER)
//   await WETHContract.connect(WETHSigner).approve(uniswapAddr, AmountinMax)
//   console.log(await DAIContract.balanceOf(to))

//   await uniswap
//     .connect(WETHSigner)
//     .swapTokensForExactTokens(AmountOut, AmountinMax, path, to, deadline)
//   console.log(await DAIContract.balanceOf(to))
// }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})