require('dotenv').config();

require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('hardhat-abi-exporter');
require('hardhat-docgen');
require('hardhat-gas-reporter');
require('hardhat-spdx-license-identifier');
require('solidity-coverage');

require('./tasks/deploy');
require('./tasks/deploy_unraveler');
require('./tasks/deploy_magic');
require('./tasks/deploy_agld_farm');
require('./tasks/deploy_loot_farm');
require('./tasks/deploy_n_farm');
require('./tasks/deploy_treasure_farm');
require('./tasks/claim');
require('./tasks/unravel');
require('./tasks/read');
require('./tasks/magic_set_whitelist');

module.exports = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    hardhat: {
      ...(process.env.FORK_MODE
        ? {
            forking: {
              url: `https://eth-${
                process.env.FORK_NETWORK || 'mainnet'
              }.alchemyapi.io/v2/cT--tfMgLAyODIWTnAv7QLgGjYfuQc7I`,
            },
          }
        : {}),
    },

    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/cT--tfMgLAyODIWTnAv7QLgGjYfuQc7I`,
      accounts: [
        'd8ca267069fc7aabcd6101bc55c85f9f6fbc2bea482636f28061624410590af9',
      ],
    },

    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/SsKAptbQoQHMfvEx9kfAYb39Y24EoXZm`,
      accounts: [
        'd8ca267069fc7aabcd6101bc55c85f9f6fbc2bea482636f28061624410590af9',
      ],
    },
  },

  abiExporter: {
    clear: true,
    flat: true,
    pretty: true,
  },

  docgen: {
    clear: true,
    runOnCompile: false,
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },

  gasReporter: {
    enabled: process.env.REPORT_GAS === 'true',
  },

  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },
};
