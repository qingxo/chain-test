import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from '../contract/abi.json';
import { Input, Button, } from 'antd';
import './index.css';
const contractAddress = '0xCd30857AFEF59Ee2E0752efFC3D2edD6d1Af5A0F';
const prefixCls = 'home';
export default function Home() {
    const [contract, setContract] = useState('');
    const [connected, setConnected] = useState(false);
    const [currentAccount, setCurrentAccount] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        initData();
    }, []);

    function initData() {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const ct = new ethers.Contract(contractAddress, abi, signer);
            setContract(ct);
        } else {
            window.alert('MetaMask not detected');
        }
    }

    async function connectWallet() {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                // 没有安装metamask
                setConnected(false);
                window.alert('Metamask not detected');
                return;
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' }); //读取钱包中的账号
            setCurrentAccount(accounts[0]);
            setConnected(true);
        } catch (e) {
            console.log("the wallet connect error :", e);
            setConnected(false);
        }
    }

    async function add() {
        console.log("the add called")
        try {
            const tx = await contract.addNote(title, content);
            await tx.wait();
        } catch (e) {
            console.log("the wallet connect error :", e);

        }
    }

    async function get() {
        try {
            const ns = await contract.getNotes();
            setNotes(ns);
        } catch (e) {

        }
    }

    async function remove(id) {
        try {
            const tx = await contract.removeNote(id);
            await tx.wait();
        } catch (e) {

        }
    }

    async function clear() {
        setTitle('');
        setConnected('')
    }




    return <div className={prefixCls}>
        <div className={`${prefixCls}-content`}>
            <div><div>XXX App</div> <Button onClick={connectWallet}>{!connected ? "connect wallet" : currentAccount}</Button></div>
            <Input placeholder='please input you title' onChange={e => { setTitle(e.target.value) }} />
            <Input placeholder='please input you content' onChange={e => { setContent(e.target.value) }} />
            <Button type="primary" onClick={add}>提交</Button>
        </div>

    </div >
}