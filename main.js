let images=["img/74454.jpg","img/89391.jpg","img/189863.jpg","img/201447.jpg","img/223111.jpg","img/201447.jpg"];

// carrusel de imagenes
let slider=document.getElementById("slider-js");

// section
let silderConteiner=document.getElementById("slider-container");


// generamos los circulos de la navegacion dependiendo de las imagenes que existan
let sliderNav=document.getElementById("slider-navigation");

// variable para saber si el slider esta activo o no osea si tiene que moverse automaticamenete o quedarse quieto hasta q salgamos de ahi
let active=true;


// establecer el ancho segun el numero de imagenes
// si agregamos mas imagenes al array el ancho se genera automaticamente y se agranda para q ande hay que agregarle el simbolo de % al final
slider.style.width=images.length *100 + "%";

// caundo entramos a el section que engloba todo active pasa a ser false
silderConteiner.addEventListener("mouseover",(e)=>
{
    if(active==true)  active=false
})
// caundo entramos a el section que engloba todo active pasa a ser true
silderConteiner.addEventListener("mouseout",(e)=>
{
    if(active===false) active=true
})
sliderNav.addEventListener("click",(e)=>
{
    console.log(e.target.id.slice(-1))
    sliderImg(e.target.id.slice(-1))
})


// dibujamos el slider de navegacion osea los ciculos
for(let img in images)
{
    // cargamos imganes
    // cada vuelta de bucle en el array de iagenes llama a la pisicion dependiendo de la vuelta y pinta todas las img
    // el ancho de la imagen se lo damos de manera automatica divisiendo la cantidad de imagens por 100
    slider.innerHTML+=`<img src=${images[img]} class="slider__img" style="width:${100/images.length}%;height:300px" >`;

    // cargamos la navegacion osea los circulos
    sliderNav.innerHTML+=`<span class="${img==0 ? 'slider-nav slider-nav--active': 'silder-nav'} slider-nav" id="slider-nav-${img}"> </span>`
}

let contadorDeImg=0;
let navIcon=[...document.getElementsByClassName("slider-nav")];//barra de navegacion
console.log(navIcon)
const setActive=(id)=>{

    // slice para que devulva el ultimo caracter que es el id del span
    // si el id de cualquiera de los iconos o circulos de navegacion es igual al id osea el contadorImg pinta el circulo
    navIcon.map(idValue=> idValue.attributes.id.nodeValue.slice(-1)==id ? idValue.classList.add("slider-nav--active"):
    idValue.classList.remove("slider-nav--active"));
}
const sliderImg=(id)=>{
    if(active==false && isNaN(id)==true)//si esta en falso estamos con el raton encia de la imagenes para buscar automaticamente
    {
        // el contador tendra el id que le dimos a cada circulo  de navegacion
        contadorDeImg=id;
        setActive(id)
    }
    // si el contador de imagen esta en 1 por la primera imagen valdra 1 y con el 00% que le dimos valdra 100%
    // por lo tanto se meve 100% hacia ala izquierda
    slider.style.left="-"+id+ "00%";
}

// funcion que cambia de imagene
const counter=()=>
{
    if(active==true)//si esta true es que no tenemos el raton dentro de las imagenes
    {
        contadorDeImg ++;
        if(contadorDeImg >= images.length)//si el contador de imagenes es mayor a el array de fotos llegamos al final del array
        {
            contadorDeImg=0;//volvemos al principio
        }
        // console.log(contadorDeImg)// vemos al contador sumar hasta la ultima posicion del array y vulve a empezar
        setInterval(sliderImg(contadorDeImg),2000);//cada 2000 milisegundos 
        setInterval(setActive(contadorDeImg),2000)//esta funcion ara marcar en cual imagen estamos pintando el circulo correspondiente
    }
} 

// intervalos de timepo para el contador
const starInterval=()=>
{
    // esta funcion va a llamar ala funcion counter cada 5000 milisegundos
    setInterval(counter,5000);
}

// iniciamos el contador
starInterval();

