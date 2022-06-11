const cnectBtn = document.querySelector("#connect-button");
const altcnectBtn = document.querySelector("#alt-connect");
const wallet = document.querySelector("#user-wallet");

let connected = (accounts) => {
    cnectBtn.innerText, altcnectBtn.innerText = "Connected!";
    cnectBtn.disabled, altcnectBtn.disabled = true;
    wallet.classList.add('account');
    wallet.innerText = accounts[0];
}

async function connectWallet() {
    //was await ethereum.request({method: 'eth_requestAccounts'});
    //connect to pi network and setup firebase user
    //return await <get the id>
};

cnectBtn.innerText = "Install MetaMask";
cnectBtn.disabled = true;
altcnectBtn.innerText = "Install MetaMask";
altcnectBtn.disabled = true;

cnectBtn.addEventListener("click", async () => {
    cnectBtn.disabled = true;
    /* try to get id and set connected
    try {
        
        connectWallet().then((accounts) => {
            if(accounts && accounts[0] > 0) {
                connected(accounts);
            } else {
                cnectBtn.disabled = false;
                cnectBtn.innerText = "Connect MetaMask";
                altcnectBtn.disabled = false;
                altcnectBtn.innerText = "Connect MetaMask";
            };
        });
    } catch (error) {
        cnectBtn.disabled = false;
        console.error(error);
    };
    */
});

altcnectBtn.addEventListener("click", async () => {
    altcnectBtn.disabled = true;
    /* try to get id and set connected
    try {
        connectWallet().then((accounts) => {
            if(accounts && accounts[0] > 0) {
                connected(accounts);
            } else {
                cnectBtn.disabled = false;
                cnectBtn.innerText = "Connect MetaMask";
                altcnectBtn.disabled = false;
                altcnectBtn.innerText = "Connect MetaMask";
            };
        });
    } catch (error) {
        cnectBtn.disabled = false;
        console.error(error);
    };
    */
});
