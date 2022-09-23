
/* CLASES */

class Usuario{

    constructor(nombre, password){
        this.nombre = nombre;
        this.password = password;
    }


}


/* variables */
const label = querySelectorId('labelId')
const registrarUsuario = querySelectorId('registrarId')
const registrarUsuarioConfirm = querySelectorId('registrarIdUser')
const volverInicioBtn = querySelectorId('volverInicio')
const input  = querySelectorClass('login__input');
const inputPassword  = querySelectorClass('login__password');

const spinner = querySelectorClass('spinner-container')

const button = querySelectorClass('login__button');
const form = querySelectorClass('login-form')


/* Even Listeners */
input.addEventListener('input', validateInput);
registrarUsuario.addEventListener('click', registroUser)
registrarUsuarioConfirm.addEventListener('click', registroUserLs)
volverInicioBtn.addEventListener('click', volverInicio)
inputPassword.addEventListener('input', validateInput);
button.addEventListener('click', handleSubmit)




/* Funciones */
function registroUser(){
    spinner.classList.remove('inactive')
    form.classList.add('inactive')
    setTimeout(()=>{
        form.classList.remove('inactive')
        spinner.classList.add('inactive')
        labelFunction('(3-10 carácteres)', 'black')
        form.reset();
        registrarUsuario.textContent = 'Iniciar Registro'
        button.style.display = 'none';
        registrarUsuario.classList.add('inactive')
        registrarUsuarioConfirm.classList.remove('inactive')
        volverInicioBtn.classList.remove('inactive')
    },1000)
}

function registroUserLs(){

    const usuarioLS  = obtenerUsuariosLocalStorage();
    let currentBoolean  = false;

    if(usuarioLS.length !== 0){
        usuarioLS.forEach(user =>{
            if(user.nombre === input.value.trim()){
                labelFunction('Este nombre ya existe','red')
                currentBoolean = false;
            }else{
                currentBoolean = true;
            }
        })        
    }else{
        currentBoolean = true
    }

    if(currentBoolean){

        spinner.classList.remove('inactive')
        form.classList.add('inactive')
        setTimeout(()=>{
            localStorage.setItem('userInGame', input.value)
            registrarUsurio();
            window.location = './index.html'; 
        },2000)
    }
}

function volverInicio(){
    spinner.classList.remove('inactive')
    form.classList.add('inactive')
    setTimeout(()=>{
        window.location = './index.html'; 
    },1000)
}

function validateInput({target}){
    

    let nameValue = target.value.trim();
    
    if(nameValue.length >= 3   && inputPassword.value.trim().length >= 3 && input.value.trim().length >=3 ){
        button.removeAttribute('disabled')
        registrarUsuarioConfirm.removeAttribute('disabled')
    }else{
        button.setAttribute('disabled','')
        registrarUsuarioConfirm.setAttribute('disabled','')
    }
}

function validateInput2(nameValue){
    let current = false;
    const usuarioLS = obtenerUsuariosLocalStorage();
    
    usuarioLS.forEach(usuario=>{
        if(usuario.nombre === nameValue){
            console.log('ya existe')
            
            current = true;
        }
    })
    return current;
}

function validateInput3(passwordValue, nameValue){
    let current = false;
    const usuarioLS = obtenerUsuariosLocalStorage();

    usuarioLS.forEach(usuario=>{
        if(usuario.nombre === nameValue &&  usuario.password === passwordValue){
            console.log('Contraseña incorrecta')
            
            current = true;
        }
    })
    return current;
}


function handleSubmit(e){
    e.preventDefault();
    
    
    if( validateInput2(input.value.trim()) ){
        

        if(validateInput3(inputPassword.value.trim(), input.value.trim())){
            localStorage.setItem('userInGame', input.value);
            form.reset();
            window.location = './pages/games.html';
        }else{
            labelFunction('Contraseña Incorrecta', 'red')
        }
    }else{
        
        labelFunction('No existe este usuario','red')
        
    }
}


function registrarUsurio(){

    let usuarios = obtenerUsuariosLocalStorage();
    
        const player  = new Usuario(input.value.trim(), inputPassword.value.trim())
    
        usuarios.push(player);
    
        localStorage.setItem( 'Usuario', JSON.stringify(usuarios)); 

}

function obtenerUsuariosLocalStorage(){
    let usuaiosLS;

    if(localStorage.getItem('Usuario')=== null){
        usuaiosLS =[];
    }else{
        usuaiosLS = JSON.parse(localStorage.getItem('Usuario'))
    }

    return usuaiosLS;
}

function labelFunction(texto, color){
    label.textContent = texto;
    label.style.color = color;
}

console.log(obtenerUsuariosLocalStorage())
































/* Funciones Fundamentales */
function querySelectorClass (selector){
        return document.querySelector(`.${selector}`);
}
function querySelectorId (selector){
        return document.querySelector(`#${selector}`);
}
