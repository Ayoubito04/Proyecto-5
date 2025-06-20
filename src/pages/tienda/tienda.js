
import './tienda.css';
import { footer } from '../../components/footer/footer';

export const  getTienda=async() => {
    try{
        const url = 'https://fakestoreapi.com/products';
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const map= MapProducts(data);
        console.log(map);
        PrintProducts(map);
        SearchProducts(map);
        return map;
       

       

    }
    catch(error){
        alert('Error al cargar los productos');
    }
   
    
}
getTienda();

export const MapProducts =(products)=>{
    return  products.map((product)=>{
        return {
        productId: product.id,
        productTitle: product.title,
        productPrice: product.price,
        productImage: product.image,
        productDescription: product.description,
        productCategory: product.category
       }
    });

}
export const PrintProducts=(products)=>{
    const container =document.getElementById('section-product');
    container.innerHTML = '';
   
    



    products.map((product)=>{
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML=`
        <img src="${product.productImage}" alt="${product.productTitle}">
        <h2>${product.productTitle}</h2>
        <p class="description">${product.productDescription}</p>
        <p class="Precio">Precio: $${product.productPrice}</p>
        <button class="btn">Agregar al carrito</button>
        
        `;  
        container.appendChild(card);
        const button = card.querySelector('.btn');
        button.addEventListener('click',()=>{
            alert('Producto agregado al carrito');
            const productosEnCarrito = JSON.parse(localStorage.getItem('productos dentro de carrito')) || [];
            productosEnCarrito.push({
                productId: product.productId,
                productTitle: product.productTitle,
                productPrice: product.productPrice,
                productImage: product.productImage,
                productDescription: product.productDescription
            });
            localStorage.setItem('productos dentro de carrito', JSON.stringify(productosEnCarrito));
            console.log(productosEnCarrito);
            
            
            

            
        }
        );
    });
}
 

   export const normalizarTexto = (texto) => {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};


    export const SearchProducts=(products)=>{
        const searchInput =document.getElementById('search-input')
        const searchButton =document.getElementById('search-button');
       searchButton.addEventListener('click',()=>{
            const keyword=searchInput.value.toLowerCase();
            const categoriaSeleccionada= document.getElementById('categoria').value;
         
            const filteredProducts=products.filter((product)=>{
                const coincideCategoria = categoriaSeleccionada === 'all' ||
                (categoriaSeleccionada ==='Hombres' && product.productCategory.toLowerCase() === 'men\'s clothing') ||
                (categoriaSeleccionada ==='Mujer' && product.productCategory.toLowerCase() === 'women\'s clothing') ||
                (categoriaSeleccionada ==='Joyas' && product.productCategory.toLowerCase() === 'jewelery') ||
                (categoriaSeleccionada ==='Tecnologicos' && product.productCategory.toLowerCase()
    === 'electronics');
                if (!coincideCategoria) {
                    return false; // Si no coincide la categoría, no incluir el producto
                }
                
               return normalizarTexto(product.productTitle).includes(normalizarTexto(keyword)) ||
               normalizarTexto(product.productDescription).includes(normalizarTexto(keyword)) ||
               normalizarTexto(product.productCategory).includes(normalizarTexto(keyword));


            })
            PrintProducts(filteredProducts);
        
        });

         
                
          
        
       }
    export const CerrarSesion=()=>{
        const Cerrar_Sesion = document.getElementById('Delete-count');
        Cerrar_Sesion.addEventListener("click",()=>{
            localStorage.removeItem('productos dentro de carrito');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            alert('Sesión cerrada');
            window.location.href = '../index.html';

        })
    }
    document.addEventListener('DOMContentLoaded', async() => {
        const products=await getTienda();
        CerrarSesion();
        VerCarrito();
        categoria(products);
        VerPerfil();
        volverInicio();
        printFooter();
        getLogo();
    
       
        
    }
    );
    export const VerCarrito=()=>{
        const Ver_Carrito=document.getElementById('cart-button');
        Ver_Carrito.addEventListener('click',()=>{
            PrintCarrito();
            const searchButton = document.getElementById('search-button');
            searchButton.style.display = 'none';
            const searchInput = document.getElementById('search-input');
            searchInput.style.display = 'none';
            const categoria = document.getElementById('categoria');
            categoria.style.display = 'none';
            const infoPerfil = document.getElementById('Informacion');
            infoPerfil.style.display = 'none';
            const Carrito=document.getElementById('cart-button')
            Carrito.style.display = 'none';
            const CerrarSesion= document.getElementById('Delete-count');
            CerrarSesion.style.display = 'none';



        });
        volver.addEventListener('click',()=>{
            const searchButton = document.getElementById('search-button');
            searchButton.style.display = 'block';
            const searchInput = document.getElementById('search-input');
            searchInput.style.display = 'block';
            const categoria = document.getElementById('categoria');
            categoria.style.display = 'block';
            const infoPerfil = document.getElementById('Informacion');
            infoPerfil.style.display = 'block';
            const Carrito=document.getElementById('cart-button')
            Carrito.style.display = 'block';
            const CerrarSesion= document.getElementById('Delete-count');
            CerrarSesion.style.display = 'block';
            getTienda();
        
    
        




        
        }        );
    }


    export const PrintCarrito=()=>{
     const container =document.getElementById('section-product');
        container.innerHTML = '';
        const productosEnCarrito = JSON.parse(localStorage.getItem('productos dentro de carrito')) || [];
        const productoExistente=productosEnCarrito.some((product) => product.productId === product.productId);
        if(productosEnCarrito.length===0){
            const mensajeDeSAviso=document.createElement('div');
            mensajeDeSAviso.classList.add('mensaje-aviso');
            mensajeDeSAviso.innerHTML = `
            <h2>No hay productos en el carrito</h2>
            <p>Agrega productos al carrito para verlos aquí.</p>
            `;
            container.appendChild(mensajeDeSAviso);
            mensajeDeSAviso.style.textAlign = 'center';
            mensajeDeSAviso.style.padding = '20px';
            mensajeDeSAviso.style.border = '1px solid #ccc';
            mensajeDeSAviso.style.borderRadius = '10px';
            mensajeDeSAviso.style.backgroundColor = '#f9f9f9';
            mensajeDeSAviso.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            mensajeDeSAviso.style.margin = '20px auto';
            mensajeDeSAviso.style.maxWidth = '400px';
            mensajeDeSAviso.style.fontFamily = 'Arial, sans-serif';
            mensajeDeSAviso.style.color = '#333';
            mensajeDeSAviso.style.lineHeight = '1.5';
            mensajeDeSAviso.style.display = 'block';
            mensajeDeSAviso.style.position = 'relative';
            mensajeDeSAviso.style.boxSizing = 'border-box';
            mensajeDeSAviso.style.padding = '20px';
            mensajeDeSAviso.style.borderRadius = '10px';
            mensajeDeSAviso.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            mensajeDeSAviso.style.margin = '20px auto';
            mensajeDeSAviso.style.height = '500px';
            mensajeDeSAviso.style.overflowY = 'auto';
            mensajeDeSAviso.style.fontSize = '18px';
            mensajeDeSAviso.style.fontWeight = 'bold';

        }
       
        else{
            productosEnCarrito.map((product)=>{
                  const card=document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML=`
                    <img src="${product.productImage}" alt="${product.productTitle}">
                    <h2>${product.productTitle}</h2>
                    <p>${product.productDescription}</p>
                    <p class="Precio">Precio: $${product.productPrice}</p>
                    <button class="btn">Eliminar del carrito</button>
                    `;
                    container.appendChild(card);
                   const button=card.querySelector('.btn');
                   button.addEventListener('click',()=>{
                  const ProductoEliminado=productosEnCarrito.filter((p)=>p.productId !== product.productId);
                     localStorage.setItem('productos dentro de carrito',JSON.stringify(ProductoEliminado));
                        alert('Producto eliminado del carrito');
                        PrintCarrito();
                        
    


                       
                    
        
                   })
            })
        }
        }
        export const categoria =(products)=>{
            const categoria =document.getElementById('categoria');
            categoria.addEventListener('change',()=>{
                if(categoria.value==='all'){
                    PrintProducts(products);
                }

                else if(categoria.value==='Hombres'){
                    const productosHombres=products.filter((product)=>{
                        return product.productCategory.toLowerCase()=== 'men\'s clothing';
                    }
                    );
                    PrintProducts(productosHombres);
                        
                }
                else if(categoria.value==='Mujer'){
                    const productosMujer=products.filter((product)=>{
                        return product.productCategory.toLowerCase()=== 'women\'s clothing';
                    })
                    PrintProducts(productosMujer);

                }
                else if(categoria.value==='Joyas'){
                    const ProductosJoyas=products.filter((product)=>{
                       return product.productCategory.toLowerCase()==='jewelery';
                    });
                    PrintProducts(ProductosJoyas);

                }
                else if(categoria.value==='Tecnologicos'){
                    const ProductosElectronicos=products.filter((product)=>{
                        return product.productCategory.toLowerCase()==='electronics';
                    })
                    PrintProducts(ProductosElectronicos);
                }
        });
            }   
            export const VerPerfil=()=>{
                const infoPerfil=document.getElementById('Informacion');
                infoPerfil.addEventListener('click',()=>{
                    const name= localStorage.getItem('name');
                    const email= localStorage.getItem('email');
                    const password= localStorage.getItem('password');
                    const container =document.getElementById('section-product');
                    container.innerHTML = '';
                    const perfilCard = document.createElement('div');
                    perfilCard.classList.add('perfil-card');
                    perfilCard.innerHTML = `
                    <h2 id="info-perfil">Información del Perfil</h2>
                    <p id="nombre-usuario"><strong>Nombre:</strong> ${name}</p>
                    <p id="email-usuario"><strong>Email:</strong> ${email}</p>
                    <p id="contraseña"><strong>Contraseña:</strong> ${password}</p>
                    `;
                    perfilCard.style.textAlign = 'center';
                    perfilCard.style.padding = '20px';
                    perfilCard.style.border = '1px solid #ccc';
                    perfilCard.style.borderRadius = '10px';
                    perfilCard.style.backgroundColor = '#f9f9f9';
                    perfilCard.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                    perfilCard.style.margin = '20px auto';
                    perfilCard.style.maxWidth = '400px';
                    perfilCard.style.fontFamily = 'Arial, sans-serif';
                    perfilCard.style.color = '#333';
                    perfilCard.style.lineHeight = '1.5';
                    perfilCard.style.textAlign = 'left';
                    perfilCard.style.backgroundColor = '#fff';
                    perfilCard.style.height = '500px';
                    perfilCard.style.overflowY = 'auto';
                    perfilCard.style.display='block';
                    perfilCard.style.position = 'relative';
                    perfilCard.style.boxSizing = 'border-box';
                    perfilCard.style.padding = '20px';
                    perfilCard.style.borderRadius = '10px';
                    perfilCard.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                    perfilCard.style.margin = '20px auto';
                    perfilCard.style.maxWidth = '400px';
                    perfilCard.style.fontFamily = 'Arial, sans-serif';
                    const nombreUsuario = perfilCard.querySelector('#nombre-usuario');
                    const emailUsuario = perfilCard.querySelector('#email-usuario');
                    const contraseña = perfilCard.querySelector('#contraseña');
                    nombreUsuario.style.fontSize = '18px';
                    emailUsuario.style.fontSize = '18px';
                    contraseña.style.fontSize = '18px';
                    nombreUsuario.style.marginBottom = '10px';
                    emailUsuario.style.marginBottom = '10px';
                    contraseña.style.marginBottom = '10px';
                    
                
                    
                container.appendChild(perfilCard);
        });
    }
    export const volverInicio=()=>{
        const volver=document.getElementById('volver');
        volver.addEventListener('click',()=>{
            getTienda();

        });
    }
    export const printFooter=()=>{
        const footerContent = document.getElementById('footer-content');
        footerContent.innerHTML = footer();
       
    }
    export const getLogo=()=>{
        const logo = document.getElementById('logo');
         
    }
   
    






