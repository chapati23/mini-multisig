import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as tenderly from "@tenderly/hardhat-tenderly";

tenderly.setup({ automaticVerifications: false });

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "tenderly",
  networks: {
    tenderly: {
      url: "https://rpc.vnet.tenderly.co/devnet/mini-multisig-tests/8c0c3401-f35d-467c-8aa5-8ed2eda75a9c",
      chainId: 736031,
    },
  },
  tenderly: {
    username: "chapati",
    project: "mini-multisig",
  },
};

task("verifyExistingMS", "Verifies deployed MultiSigWallet instance")
  .addParam("address")
  .setAction(async (args, hre) => {
    await hre.run("compile");
    console.log("Verifying MS", args.address);
    await hre.tenderly.verify({
      name: "MultiSigWallet",
      address: args.address,
    });
  });

export default config;
