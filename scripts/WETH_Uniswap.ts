import { ethers } from 'hardhat'
import { IUniswap__factory } from '../typechain-types'

async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000)
//   const unlockTime = currentTimestampInSeconds + 60

const uniswapAddr = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

const wethAddr = await ethers.getContractAt('IUniswap', uniswapAddr)

const run = await wethAddr.WETH()
console.log(run)












//   const lockedAmount = ethers.parseEther('0.001')

//   const lock = await ethers.deployContract('Lock', [unlockTime], {
//     value: lockedAmount,
//   })

//   await lock.waitForDeployment()

//   console.log(
//     `Lock with ${ethers.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
//   )
//   let [bal, time] = await lock.returnValues()

//   console.log(
//     ` current Locked AMount:${ethers.formatEther(
//       bal
//     )}, The unlock Time is ${new Date(Number(time) * 1000)}`
//   )
 }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
