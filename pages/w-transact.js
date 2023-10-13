import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Footer from "@/components/footer";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
    Connection,
    SystemProgram,
    Transaction,
    PublicKey,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
    SendTransactionError,
} from "@solana/web3.js";

import NavBar from '@/components/Navbar'
import Headmenu from '@/components/Headmenu'


const SOLANA_NETWORK = "devnet";

const transact = () => {

    const [match, setMatch] = useState(null)

    const [publicKey, setPublicKey] = useState(null);
    const [bet, setBet] = useState(null);
    const router = useRouter();
    const [balance, setBalance] = useState(0);
    const [receiver, setReceiver] = useState(null);
    const [amount, setAmount] = useState(null);
    const [explorerLink, setExplorerLink] = useState(null);

    const [uploadUrl, setUploadUrl] = useState(null);
    const [url, setUrl] = useState(null);
    const [statusText, setStatusText] = useState("");

    useEffect(() => {
        let key = window.localStorage.getItem("publicKey"); //obtiene la publicKey del localStorage
        setPublicKey(key);
        if (key) getBalances(key);
        if (explorerLink) setExplorerLink(null);

        fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all', {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "e427aa1f81msh6285b35a156aa04p179f68jsn6bed254745b5",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
      },
    })
    .then((response) => {return response.json()
    })
    .then((data) => {
      console.log(data.response)
      setMatch(data.response[0])
      // console.log(data[0].fixture)
      //console.log(data.response[0])
      //console.log(data.response[0].score)
      //console.log(data.response[0].fixture)
      //console.log(data.response[0].teams)

     

    })
    .catch((error) => console.log("Error", error))
    }, []);

    const signIn = async () => {
        //Si phantom no esta instalado
        const provider = window?.phantom?.solana;
        const { solana } = window;

        if (!provider?.isPhantom || !solana.isPhantom) {
            toast.error("Phantom no esta instalado");
            setTimeout(() => {
                window.open("https://phantom.app/", "_blank");
            }, 2000);
            return;
        }
        //Si phantom esta instalado
        let phantom;
        if (provider?.isPhantom) phantom = provider;

        const { publicKey } = await phantom.connect(); //conecta a phantom
        console.log("publicKey", publicKey.toString()); //muestra la publicKey
        setPublicKey(publicKey.toString()); //guarda la publicKey en el state
        window.localStorage.setItem("publicKey", publicKey.toString()); //guarda la publicKey en el localStorage

        toast.success("Tu Wallet esta conectada 👻");

        getBalances(publicKey);

        location.href = "/";
    };

        //Funcion para cerrar sesion con nuestra Wallet de Phantom

        const signOut = async () => {
            if (window) {
                const { solana } = window;
                window.localStorage.removeItem("publicKey");
                setPublicKey(null);
                solana.disconnect();
                router.reload(window?.location?.pathname);

                location.href = "/";
            }
        };
    
        //Funcion para obtener el balance de nuestra wallet
    
        const getBalances = async (publicKey) => {
            try {
                const connection = new Connection(
                    clusterApiUrl(SOLANA_NETWORK),
                    "confirmed"
                );
    
                const balance = await connection.getBalance(
                    new PublicKey(publicKey)
                );
    
                const balancenew = balance / LAMPORTS_PER_SOL;
                setBalance(balancenew);
            } catch (error) {
                console.error("ERROR GET BALANCE", error);
                toast.error("Something went wrong getting the balance");
            }
        };
    
        //Funcion para enviar una transaccion

        const handleSubmit = async () => {
            console.log("Este es el receptor", receiver);
            console.log("Este es el monto", amount);
            sendTransaction();
        };

        const handleReceiverChange = () => {
            setReceiver("Ey1RY9APtmDnqy4PhDGT3wC46gbFADJ3AKkeedJ4MyYe");
        };
    
        const handleAmountChange = (event) => {
            setAmount(event.target.value);
        };

        const sendTransaction = async () => {
            try {
                handleReceiverChange()
                //Consultar el balance de la wallet
                getBalances(publicKey);
                console.log("Este es el balance", balance);
    
                //Si el balance es menor al monto a enviar
                if (balance < amount) {
                    toast.error("No tienes suficiente balance");
                    return;
                }
    
                const provider = window?.phantom?.solana;
                const connection = new Connection(
                    clusterApiUrl(SOLANA_NETWORK),
                    "confirmed"
                );
    
                //Llaves
    
                const fromPubkey = new PublicKey(publicKey);
                const toPubkey = new PublicKey(receiver);
    
                //Creamos la transaccion
                const transaction = new Transaction().add(
                    SystemProgram.transfer({
                        fromPubkey,
                        toPubkey,
                        lamports: amount * LAMPORTS_PER_SOL,
                    })
                );
                console.log("Esta es la transaccion", transaction);
    
                //Traemos el ultimo blocke de hash
                const { blockhash } = await connection.getLatestBlockhash();
                transaction.recentBlockhash = blockhash;
                transaction.feePayer = fromPubkey;
    
                //Firmamos la transaccion
                const transactionsignature = await provider.signTransaction(
                    transaction
                );
    
                //Enviamos la transaccion
                const txid = await connection.sendRawTransaction(
                    transactionsignature.serialize()
                );
                console.info(`Transaccion con numero de id ${txid} enviada`);
    
                //Esperamos a que se confirme la transaccion
                const confirmation = await connection.confirmTransaction(txid, {
                    commitment: "singleGossip",
                });
    
                const { slot } = confirmation.value;
    
                console.info(
                    `Transaccion con numero de id ${txid} confirmado en el bloque ${slot}`
                );
    
                const solanaExplorerLink = `https://explorer.solana.com/tx/${txid}?cluster=${SOLANA_NETWORK}`;
                setExplorerLink(solanaExplorerLink);
    
                toast.success("Transaccion enviada con exito :D ");
    
                //Actualizamos el balance
                getBalances(publicKey);
                setAmount(null);
                setReceiver(null);
    
                return solanaExplorerLink;
            } catch (error) {
                console.error("ERROR SEND TRANSACTION", error);
                toast.error("Error al enviar la transaccion");
            }
        };
        


        return (
            <>
      <main>


        <div class="Home">
          <header class="fondo">
            <h1>
            <Headmenu/>
            <NavBar />


            </h1>
          </header>

          <div class = "cont-transaction">
            {publicKey ? (
                        <div className="flex flex-col py-24 place-items-right justify-right" id="radio">
                            <div class="cont-transaction">
                                <div class="lado-izq">
                                    
                                </div>

                                <div class="lado-der">
                                <br />

<h1 class="titulo">
    Tu numero de Wallet es 
</h1>
<p class="texto">{publicKey}</p>
<br />

<h1 class="titulo">
    Tu balance es 
</h1>

<p class="texto">
   {balance} SOL
</p>

<div className="teamsRadios
">
    <input type="radio" id="team1" name="radio" value={match?.teams?.away?.name} className="radio" checked></input><label className="label-1">{match?.teams?.away?.name} </label>
    <input type="radio" id="team2" name="radio" value={match?.teams?.home?.name} className="radio"></input><label className="label-2" >{match?.teams?.home?.name} </label>

</div>
{/* <h1 className="text-2xl  text-white">
    Enviar una transaccion a:
</h1>
<input
    className="h-8 w-72 mt-4   border-2 border-black "
    type="text"
    onChange={handleReceiverChange}
/> */}
<br />
<h1 className="text-2xl  text-white">
    Cantidad de SOL a apostar:
</h1>
<input
    className="h-8 w-72 mt-4   border-2 border-black "
    type="text"
    onChange={handleAmountChange}
/>
<br /><br />
<br />
<button
    type="submit"
    class="enviar"
    onClick={() => {
        handleSubmit();
        
    }}
>
    Enviar Apuesta ⚡
</button>
<br />

<a href={explorerLink}>
    <h1 className="linkSmartContract">
        {explorerLink}
    </h1>
</a>
<br />
                                </div>
                            </div>                            
                        </div>
                    ) : (
                    <div className="flex flex-col place-items-center justify-center">
                        <button
                            type="submit"
                            className="inline-flex h-8 w-52 justify-center bg-purple-500 font-bold text-white"
                            onClick={() => {
                                signIn();
                            }}
                        >
                            Conecta tu wallet 👻
                        </button>
                    </div> 
                )}

          </div>
          <Toaster position="bottom-center" />
        </div>


        
        <Footer/>

        
      </main>
      <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>
    </>
        )
}

export default transact