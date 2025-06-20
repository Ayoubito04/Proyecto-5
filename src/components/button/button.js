import './button.css';


export const button=(icon,text)=>{
    return `<button class="button_footer">
    <img src="${icon}" alt=${icon} class="button__icon">
        <span>${text}</span>
    </button>`;
}