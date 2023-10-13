import {
    Connection,
    SystemProgram,
    Transaction,
    PublicKey,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
    SendTransactionError,
} from "@solana/web3.js";

const Headmenu = () => {
    return(
    <nav>
        <ul>  
            
            <li class="headerBut headerActive">
                <a href="/">
                <span class="icon_Title">
                <ion-icon name="football"></ion-icon>
                        </span><span class="textNav">Football</span>
                        </a>
            </li>
            <li class="headerBut">
                <a href="/popup">
                <span class="icon_Title">
                <ion-icon name="basketball"></ion-icon>
                        </span><span class="textNav">Basketball</span>
                        </a>
            </li>
            <li class="headerBut">
                <a href="/popup">
                <span class="icon_Title">
                <ion-icon name="american-football"></ion-icon>
                        </span><span class="textNav">NFL</span>
                        </a>
            </li>
            <li class="headerBut">
                <a href="/popup">
                <span class="icon_Title">
                <ion-icon name="home"></ion-icon>
                        </span><span class="textNav">eSports</span>
                        </a>
            </li>
        </ul>
    </nav>
    )
}
 
export default Headmenu