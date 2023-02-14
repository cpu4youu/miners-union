import * as waxjs from '@waxio/waxjs/dist'
import { JsonRpc } from 'eosjs'


export default class WCWWallet {
  name = 'wcw'
  wax = null
  
  constructor() {
    const wax = new waxjs.WaxJS({ rpcEndpoint: 'https://wax.greymass.com', tryAutoLogin: false })
    wax.rpc = new JsonRpc("https://wax.greymass.com", {
      fetch
    })
    this.wax = wax
  }

  async checkLogin() {
    const isAutoLoginAvailable = await this.wax.isAutoLoginAvailable()
    console.log('check wax autoLogin', isAutoLoginAvailable)

    if (isAutoLoginAvailable) {
      console.log('wcw auto logined')
      return {
        chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4', //WCW is only for wax so we hardcode that
        name: this.wax.user.account,
        authorization: {
          actor: this.wax.user.account, permission: 'active'
        }
      }
    } else {
      return null
    }
  }

  async login() {
    const userAccount = await this.wax.login()
    return {
      chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4', //WCW is only for wax so we hardcode that
      name: this.wax.user.account,
      authorization: {
        actor: this.wax.user.account, permission: 'active'
      }
    }
  }

  async logout() {
    this.wax = new waxjs.WaxJS({ rpcEndpoint: 'https://wax.greymass.com', tryAutoLogin: false })
    return {}
  }

  async transact(packed) {
    //console.log(packed)
    try{
      const trans = await this.wax.api.transact(
        packed, {
        blocksBehind: 3,
        expireSeconds: 1200,
      })
      return trans
    } catch(e){
      
      alert(e)
    }
    
  }

  async fetchTable(packed){
    try{
      //console.log(packed)
      const response = this.wax.rpc.get_table_rows(packed);
       return response
    } catch (e) {
      console.log(e)
      return {}
    }
  }
}
