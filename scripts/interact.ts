import { ethers } from 'hardhat'

async function main() {
  //   let [admin1, admin2] = await ethers.getSigners()
  const amount = ethers.parseEther('0.04')
  const FACTORY = '0x3c68027368aC1938926f1716AfFAC8A95dDa6267'
  //   connect to the deployed factory contract using getContractAt
  const factory = await ethers.getContractAt('IFactory', FACTORY)
  // call the createMultisig function in the factory contract
  // const receipt = await factory.createMultisig(
  //   [
  //     '0xe9999a29B116cB45444621EcD1CE52CA013243E4',
  //     '0x6B0eA893B1d253bfeeB183eFF6AE6e6D40c7284D',
  //     '0xd8500DA651A2e472AD870cDf76B5756F9c113257',
  //     '0xaaec95f93550c8dB4521ad16Eee49A9b34632fA7',
  //     '0xdE449A556Db775CCBB09477ba81F95FFA4683759',
  //     '0xE03F2A5b69BFD890bf5aF88c8b2a73416fA3F9Af',
  //     '0xe13169f75F3ac186486131862eF89c668Cf57DE9',
  //     '0xC76F962e24F4345301296Bf111529047ec3cA96E',
  //   ],
  //   { value: amount }
  // )
  //   get into the log database to get the newly created multisig address
  //   //@ts-ignore
  // let newMultisig = (await receipt.wait())?.logs[0].args[0]

  //connect to the newly created multisig using getContractAt().
  const multisig = await ethers.getContractAt(
    'IMultisig',
    '0xAD7E1a8cDf11ebbeb633e6099A7391ce0363795b'
  )

  const amount2 = ethers.parseEther('0.04')
  // await multisig.createTransaction(
  //   amount2,
  //   '0xe9999a29B116cB45444621EcD1CE52CA013243E4'
  // )

 let [spender,amountOf,numOfApproval,status] = await multisig.getTransaction(1)
 console.log(spender,amountOf,numOfApproval,status)

  
  // await multisig.connect(admin2).AprroveTransaction(1)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
