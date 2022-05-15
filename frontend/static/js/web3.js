const cnectBtn = document.querySelector("#connect-button");
const user = document.querySelector("#user-wallet");
var userWallet = "";

const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
};

let connected = (accounts) => {
    cnectBtn.innerText = "Connected!";
    cnectBtn.disabled = true;
    user.classList.add('account');
    user.innerText = accounts[0];
    userWallet += accounts[0];
}

async function connectWallet() {
    return await ethereum.request({ method: 'eth_accounts' });
};

const MetaMaskClientCheck = () => {
    if(!isMetaMaskInstalled()) {
        cnectBtn.innerText = "Install MetaMask";
        cnectBtn.disabled = true;
    } else {
        connectWallet().then((accounts) => {
            if(accounts && accounts[0] > 0) {
                connected(accounts);
            } else {
                cnectBtn.disabled = false;
                cnectBtn.innerText = "Connect MetaMask";
            };
        });
    };
};

cnectBtn.addEventListener("click", async () => {
    cnectBtn.disabled = true;

    try {
        const accounts = await ethereum.request({method: 'eth_requestAccounts'});
        connected(accounts);
    } catch (error) {
        console.error(error);
    };
});

MetaMaskClientCheck();