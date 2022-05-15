window.onload =()=>{
    const name = document.getElementById('referencia');
    const fabric = document.getElementById('fabricante'); 
    const description = document.getElementById('descripcion');
    const price = document.getElementById('precio');
    const erroresList = document.getElementById('errores');
    const amount = document.getElementById('stock');

    name.focus();

    const form = document.getElementById('crearProductoForm');
    
    form.onsubmit = (e) => {
        
        const errores = [];
        
        if(name.value === "") {            
            name.classList.add('is-invalid')
            errores.push('La referencia no puede estar vacía');
        }

        if(fabric.value === "") {            
            fabric.classList.add('is-invalid')
            errores.push('La fabrica no puede estar vacía');
        }
        
    }
    const removeIsInvalid = (e) => {
        console.log(e);
        e.target.classList.remove('is-invalid');
    }
    name.onkeydown = removeIsInvalid();
    fabric.onkeydown = removeIsInvalid();
}