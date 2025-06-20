import './footer.css';
import { button } from '../button/button.js';
import gmail from '../../assets/img/gmail.svg';
import instagram from '../../assets/img/instagram.svg';



export const footer=()=>{
    return `
        <div class="footer_container">
           <h3>Si tienes problemas con la tienda,puedes contactar a traves de:</h3>
              ${button(gmail,'<a href="https://ayoubarramdani091@gmail.com">Gmail</a>')}
           ${button(instagram,'<a href=https://instagram.com/ayoubarramdani>Instagram</a>')}

         </div>
         `

        

}