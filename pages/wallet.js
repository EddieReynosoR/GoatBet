import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/footer";
import {
    Connection,
    SystemProgram,
    Transaction,
    PublicKey,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
    SendTransactionError,
} from "@solana/web3.js";
import { useStorageUpload } from "@thirdweb-dev/react";

import axios from "axios";

import NavbarWallet from '@/components/NavbarWallet'
import Headmenu from '@/components/Headmenu'



const SOLANA_NETWORK = "devnet";

export default function Home() {
    const [publicKey, setPublicKey] = useState(null);
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
    }, []);

    //Funcion para Iniciar sesion con nuestra Wallet de Phantom

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
        getBalances(publicKey);
        console.log("publicKey", publicKey.toString()); //muestra la publicKey
        setPublicKey(publicKey.toString()); //guarda la publicKey en el state
        window.localStorage.setItem("publicKey", publicKey.toString()); //guarda la publicKey en el localStorage

        toast.success("Tu Wallet esta conectada 👻");

        

        location.href = "/";
    };


    //Funcion para cerrar sesion con nuestra Wallet de Phantom

    const signOut = async () => {
        if (window) {
            const { solana } = window;
            window.localStorage.removeItem("publicKey");
            window.localStorage.removeItem("balance");
            setPublicKey(null);
            solana.disconnect();
            router.reload(window?.location?.pathname);

            location.href="/"
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
            window.localStorage.setItem("balance", balancenew.toString())
            setBalance(balancenew);
        } catch (error) {
            console.error("ERROR GET BALANCE", error);
            toast.error("Something went wrong getting the balance");
        }
    };

    //Funcion para enviar una transaccion
    
    //Función para subir archivos a IPFS

    // const { mutateAsync: upload } = useStorageUpload();

    // const uploadToIpfs = async (file) => {
    //     setStatusText("Subiendo a IPFS...");
    //     const uploadUrl = await upload({
    //         data: [file],
    //         options: {
    //             uploadWithGatewayUrl: true,
    //             uploadWithoutDirectory: true,
    //         },
    //     });
    //     return uploadUrl[0];
    // };

    // URL a Blob
    // const urlToBLob = async (file) => {
    //     setStatusText("Transformando url...");
    //     await fetch(url)
    //         .then((res) => res.blob())
    //         .then((myBlob) => {
    //             // logs: Blob { size: 1024, type: "image/jpeg" }

    //             myBlob.name = "blob.png";

    //             file = new File([myBlob], "image.png", {
    //                 type: myBlob.type,
    //             });
    //         });

    //     const uploadUrl = await uploadToIpfs(file);
    //     console.log("uploadUrl", uploadUrl);

    //     setStatusText(`La url de tu archivo es: ${uploadUrl} `);
    //     setUploadUrl(uploadUrl);

    //     return uploadUrl;
    // };

    //Funcion para crear un NFT
    // const generateNFT = async () => {
    //     try {
    //         setStatusText("Creando tu NFT...❤");
    //         const mintedData = {
    //             name: "Mi primer NFT con Superteam MX",
    //             imageUrl: uploadUrl,
    //             publicKey,
    //         };
    //         console.log("Este es el objeto mintedData:", mintedData);
    //         setStatusText(
    //             "Minteando tu NFT en la blockchain Solana 🚀 Porfavor espera..."
    //         );
    //         const { data } = await axios.post("/api/mintnft", mintedData);
    //         const { signature: newSignature } = data;
    //         const solanaExplorerUrl = `https://solscan.io/tx/${newSignature}?cluster=${SOLANA_NETWORK}`;
    //         console.log("solanaExplorerUrl", solanaExplorerUrl);
    //         setStatusText(
    //             "¡Listo! Tu NFT se a creado, revisa tu Phantom Wallet 🖖"
    //         );
    //     } catch (error) {
    //         console.error("ERROR GENERATE NFT", error);
    //         toast.error("Error al generar el NFT");
    //     }
    // };










    
  return (
    <>
      <main>


        <div class="Home">
          <header class="fondo">
            <h1>
            <Headmenu/>
            <NavbarWallet />


            </h1>
          </header>

          <div>
            {publicKey ? (
                <button
                                type="submit"
                                className="inline-flex h-8 w-52 justify-center bg-purple-500 font-bold text-white"
                                onClick={() => {
                                    signOut(); 
                                }
                            }
                            >Desconecta tu wallet 👻</button>                           
                    ) : (
                        
                    <div className="flex flex-col place-items-center justify-center">
                        <br/><br/><br/><br/><br/><br/>
                        <br/><br/><br/><br/><br/><br/>

                        <button
                            type="submit"
                            className="inline-flex h-8 w-52 justify-center bg-purple-500 font-bold text-white"
                            onClick={() => {
                                signIn();

                                //location.href = "/";

                            }}
                        >
                            Conecta tu wallet 👻
                        </button>
                        <br/><br/><br/><br/><br/><br/>
                        <br/><br/><br/><br/><br/><br/>

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
