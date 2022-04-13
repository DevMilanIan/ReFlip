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
        cnectBtn.onclick = alert("Please install metamask");
    } else {
        connectWallet().then((accounts) => {
            if(accounts && accounts[0] > 0) {
                connected(accounts);
                setTimeout(checkCletName(), 500);
            } else {
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

function checkCletName() {
    if(userWallet !== "") {
        var url = "https://api.clet.domains/api/v1/resolve/reverse/" + userWallet;
    
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
    
        xhr.setRequestHeader("Accept", "*/*");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status !== 404) {
                console.log("GET " + xhr.status + ", Response: " + xhr.responseText);
                let cletName = xhr.responseText.substring(1, xhr.responseText.length - 1);
                user.innerText = "Connected to " + cletName;
            }};
    
        xhr.send();
    };
}

MetaMaskClientCheck();