export const networks = {
    wax: {
        name: 'wax',
        desc: 'WAX Mainnet',
        baseToken: {
          contract: 'eosio.token',
          symbol: 'WAX',
          precision: 8,
        },
    
        chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
    
        host: 'wax.greymass.com',
        port: 443,
        protocol: 'https',
        monitor: 'http://wax.bloks.io',
        monitor_params: '',
        lightapi: 'https://wax.light-api.net',
        hyperion: 'https://wax.eosrio.io',
    
        //hyperion: 'https://wax.pink.gg/',
        //hyperion: 'https://api.waxsweden.org',
        //backEnd: 'https://alcor.exchange/api/',
    
        client_nodes: {
          //'https://waxnode01.alcor.exchange': 'WAX Alcor - Finland',
          'https://waxnode02.alcor.exchange': 'WAX Alcor - Germany',
    
          'https://wax.greymass.com': 'Greymass - Canada',
          'https://wax.eu.eosamsterdam.net': 'EOSAmsterdam - Amsterdam',
          'https://wax.eosn.io': 'EOS Nation - Canada',
          'https://wax.pink.gg': 'Pink GG - Germany',
        },
    }
}

export const smartcontract= "uniontester1"