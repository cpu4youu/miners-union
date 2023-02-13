import WCWWallet from "./WCW";
import React, { useContext, createContext, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const  wallet = new WCWWallet

async function Login() {
    try {
        const logined = await wallet.login()
        if(logined){
            return logined
        }
        return {}
    } catch(e) {
        console.log(e)
    }
}

async function checkLogin() {
    try{
        const autoLogined = await wallet.checkLogin()
        if(autoLogined != null){
            return autoLogined
        } 
        return {}
    }catch(e){
        console.log(e)
    }
}
   
async function fetchTable(packed){
    const x = await wallet.fetchTable(packed)
    return x
}

export async function transaction(packed){
  const x = await wallet.transact(packed)
  return x
}
export {Login ,checkLogin, fetchTable}

/* 

export const actions = {
    init({ state, commit, dispatch, rootState, rootGetters, getters }) {
        const wallets = {
          anchor: AnchoWallet,
          wcw: WCWWallet,
        }
    
        commit('setWallets', wallets)
    
        if (state.lastWallet) {
          commit('setWallet', new state.wallets[state.lastWallet](rootState.network, this.$rpc))
          dispatch('autoLogin')
        }
      },

    async autoLogin({state, rootState, dispatch, commit, getters}) {
        console.log('Trying autoLogin...');
        const loginned = await state.wallet.checkLogin()
        if(loginned){
            console.log('YES. autoLogining...');
            const { name, authorization, chainId } = loginned
            if( chainId !== rootState.network.chainId) return console.log('autoLogin chain mismatch')
            commit('setUser', {name, authorization }, {root: true})
            dispatch('afterLoginHook')
        }
    },

    afterLoginHook({ dispatch, rootState }) {
        dispatch('loadAccountData', {}, { root: true })
    },

    logout({ state, dispatch, commit, getters, rootState }) {
        console.log('logout..')
        state.wallet.logout()
        commit('setLastWallet', null)
        commit('setUser', null, { root: true })
    },

    async mainLogin({ commit, dispatch }) {
        try {
          const { wallet, name, authorization } = await dispatch('asyncLogin')
    
          commit('setWallet', wallet)
    
          const wasAutoLoginned = await dispatch('autoLogin')
          if (wasAutoLoginned) return commit('setLastWallet', wallet.name)
    
          commit('setUser', { name, authorization }, { root: true })
          dispatch('afterLoginHook')
    
          commit('setLastWallet', wallet.name)
    
          return wallet
        } catch (e) {
          this._vm.$notify({ type: 'warning', title: 'Wallet connect', message: e })
        }
    },
    async login({ state, commit, dispatch, getters, rootState }, wallet_name) {
        const network = state.loginContext?.chain ? config.networks[state.loginContext.chain] : rootState.network

        const wallet = new state.wallets[wallet_name](network, getMultyEndRpc(Object.keys(network.client_nodes)))

        try {
            const { name, authorization } = await wallet.login()
            state.loginPromise.resolve({ wallet, name, authorization })
        } catch (e) {
            state.loginPromise.reject(e)
        }
    },
    async asyncLogin({ rootState, commit, dispatch }, context) {
        if (context) commit('setLoginContext', context)
    
        const loginPromise = new Promise((resolve, reject) => {
          commit('setLoginPromise', { resolve, reject })
          dispatch('modal/login', null, { root: true })
        })
    
        try {
          return await loginPromise
        } catch (e) {
          throw new Error(e)
        } finally {
          if (context) commit('setLoginContext', null)
        }
      },
} */