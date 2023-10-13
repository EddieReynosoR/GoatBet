
import {useEffect}from 'react'

const Slider = () => {

    let sliders;

    let buttonNext;
    let buttonBefore;
    let value;

    useEffect(()=>{
        sliders = document.querySelectorAll('.testinomy__body');
        buttonNext= document.querySelector('#next');
        buttonBefore= document.querySelector('#before');
        
        
            const changePosition = (add)=>{
            const currentTestinomy = document.querySelector('.testinomy__body--show').dataset.id;
            value = Number(currentTestinomy);

            value+=add;
            
            sliders[Number(currentTestinomy)-1].classList.remove('testinomy__body--show')
            if(value === sliders.length+1   || value === 0)
            {
                value = value === 0 ? sliders.length : 1;
            }

            sliders[value-1].classList.add('testinomy__body--show')
            console.log(value);
            }


        buttonNext.addEventListener('click',()=>{
        changePosition(1);
        });

        buttonBefore.addEventListener('click',()=>{
        changePosition(-1);
        });

    },[])


    return(
        


        <div class="testinomy__container container1">
            <span class="testinomy__arrow" id="next">
                <ion-icon name="arrow-back"></ion-icon>
            </span>

            <div class="testinomy__body testinomy__body--show" data-id="1">
                <div class="content">
                    <h2 class="subtitle">Bet with the Goat</h2>
                    <img src="https://depor.com/resizer/h3CRvkqbptR0e3EwODBzHFpV3os=/580x330/smart/filters:format(jpeg):quality(90)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/MWLNRZA2E5EPBMYXEI7WCCHQV4.jpg" width="400" height="300"/>
                </div>
            </div>

            <div class="testinomy__body " data-id="2">
                <div class="content">
                    <h2 class="subtitle">The safest bets with GoatBet</h2>
                    <img src="https://elcomercio.pe/resizer/TTfnJf4tvti-n1FSZX1MEdkyz4o=/580x330/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/LQQC5SCEWJFBJOXWEHOR56P6DI.jpg" width="400" height="300"/>
                </div>
            </div>

            <div class="testinomy__body " data-id="3">
                <div class="content">
                    <h2 class="subtitle">Only place to bet with Solana</h2>
                    <img src="https://s32679.pcdn.co/wp-content/uploads/2022/01/neymar-BIC.jpg.webp" width="400" height="300"/>
                </div>
            </div>
            <span class="testinomy__arrow" id="before">
                  <ion-icon name="arrow-forward"></ion-icon>
            </span>
            

            
        </div>
        
    )

    
}
 
export default Slider