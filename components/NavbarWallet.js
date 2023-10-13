import {useEffect, useState}from 'react'




const NavBar = () => {
    // todo esto es javascript
    let headerNav;
    let menuToggle;
    let navigation;
    let list;

    const [balance, setBalance] = useState(0)
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
        console.log(balancenew)
        setBalance(balancenew)
    } catch (error) {
        console.error("ERROR GET BALANCE", error);
    }
};

    function activeHeader() {
        headerNav.forEach((item)=>
          item.classList.remove('headerActive'))
  
          this.classList.add('headerActive')
      }
  
  
      function toggleButton() {
          navigation.classList.toggle('open')
      }
  
      function activarLink(){
          list.forEach((item)=>
          item.classList.remove('active'))
  
          this.classList.add('active')
          
          navigation.classList.remove('open')
          
      }
  
   
    useEffect(()=>{
        let balance
        let key = window.localStorage.getItem("publicKey"); //obtiene la publicKey del localStorage
        if (key) setBalance(localStorage.getItem("balance"))

        console.log(balance)

        menuToggle = document.querySelector('.menuToggle')
        navigation = document.querySelector('.navigation')
    
        menuToggle.addEventListener('click',toggleButton)

        list = document.querySelectorAll('.list')
    
        list.forEach((item)=>
        item.addEventListener('click',activarLink)
        )

        headerNav = document.querySelectorAll('.headerBut')

        headerNav.forEach((item)=>
        item.addEventListener('click',activeHeader)
        )
        function cargarPagina(pagina) {
              fetch(pagina)
                  .then(response => response.text())
                  .then(data => {
                      document.getElementById('contenido').innerHTML = data;
                  })
                  .catch(error => console.error(error));
          }
    
    },[])
   return (
    // esto es html 
    <div class="navigation">
              <div class="menuToggle"></div>
              
              <ul class="menu">
                  

                  
                  
                  <li class="list " >
          
                      <a href="/">
                          <span class="icon">
                              <ion-icon name="home">
                              </ion-icon>
                          </span>
                          <span class="text">Home</span>
                      </a>
                  </li>
                  <li class="list active">
          
                      <a href="/wallet">
                          <span class="icon">
                              <ion-icon name="person">
                              </ion-icon>
                          </span>
                          <span class="text">Wallet</span>
                      </a>
                  </li>
                  
                  <li class="list setting" >
                      <a href="/popup">
                          <span class="icon">
                              <ion-icon name="settings">
                              </ion-icon>
                          </span>
                          <span class="text">Settings</span>
                      </a>
                  </li>
              </ul>
              
            </div>
   )
}

export default NavBar