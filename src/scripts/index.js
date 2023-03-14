import { getAllCompanies, getCompaniesBySector, getSectors, loginRequest, registerRequest, validateUser } from './requests.js'
import { createModal } from './modal.js'
import { toast } from './toast.js'

export const green = '#4BA036'
export const red = '#CE4646'

async function authentication() {

    const token = localStorage.getItem('@kenzie_empresas:token')
  
    if(token) {

        const {is_admin} = await validateUser(token)

        if (is_admin){

            window.location.replace('/src/pages/panel_admin.html')
  
          }else{
  
            window.location.replace('/src/pages/panel_user.html')
  
          }
  

    }
}

function openMenu(){
    
    const menuHam = document.querySelector('.menu__ham')
    const menuClose = document.querySelector('.menu__close')

    menuHam.addEventListener('click', () =>{

        const headerContainer = document.querySelector('header')
        const btnsContainer = document.querySelector('.btns__container')
        headerContainer.classList.toggle('headerContainer__tall')
        headerContainer.classList.toggle('header__container')
        btnsContainer.style.display = 'flex'
        menuHam.style.display = 'none'
        menuClose.style.display = 'flex'
        const btns = document.querySelectorAll('.header__btns')
        btns.forEach(btn => {

            btn.classList.remove('hidden')
            
        })
        
    })
}

function closeMenu(){
    const menuClose = document.querySelector('.menu__close')
    const menuHam = document.querySelector('.menu__ham')
    
    menuClose.addEventListener('click', () =>{

        const headerContainer = document.querySelector('header')
        const btnsContainer = document.querySelector('.btns__container')
        const btnsClose = document.querySelector('.btns__close')
        btnsClose.style.display = 'flex'
        headerContainer.classList.toggle('header__container')
        headerContainer.classList.toggle('headerContainer__tall')       
        btnsContainer.style.display = 'none'
        menuHam.style.display = 'flex'
        menuClose.style.display = 'none'
        
    })

}

function goToLogin(){

    const btnLoginHome = document.querySelector('.btn__loginHome')

    btnLoginHome.addEventListener('click', (event) =>{

        event.preventDefault()

        renderAccessPage(btnLoginHome.innerText)
        
    })
}

function goToRegister(){

    const btnRegisterLogin = document.querySelector('.btn__registerLogin')

    btnRegisterLogin.addEventListener('click', (event) =>{

        event.preventDefault()
        
        renderAccessPage(btnRegisterLogin.innerText)

    })
}

async function renderAllCompanies(){

    const sectorsCards = document.querySelector('.sectors__cards')
    sectorsCards.innerHTML = ''
    const companies = await getAllCompanies()

    
    companies.forEach(company => {

        sectorsCards.append(createCards(company))

    })

}

async function renderCompaniesBySector(){

    const selectSector = document.querySelector('#sectors')
    const sectors = await getSectors()
    
    sectors.forEach(sector => {
        
        selectSector.options[selectSector.options.length] = new Option(sector.description, sector.description)
        
    })
    
    selectSector.addEventListener('change', async () =>{
        
        const sectorsCards = document.querySelector('.sectors__cards')
        sectorsCards.innerHTML = ''
        const companies = await getCompaniesBySector(selectSector.value)

        
        companies.forEach(company => {

            sectorsCards.append(createCards(company))
    
        })
    

    })

}

function createCards(company){
    
    const cardContainer = document.createElement('li')
    const cardTitle = document.createElement('h1')
    const cardTime = document.createElement('h2')
    const cardSector = document.createElement('span')

    cardContainer.classList.add('card__container')
    cardTitle.classList.add('card__title')
    cardTime.classList.add('card__time')
    cardSector.classList.add('card__sector')

    cardTitle.innerText = company.name
    cardTime.innerText = company.opening_hours
    cardSector.innerText = company.sectors.description

    cardContainer.append(cardTitle, cardTime, cardSector)

    return cardContainer

}

function renderAccessPage(modalType) {

    const homeImgContainer = document.querySelector('.homeImg__container')
    const accessImgContainer = document.querySelector('.accessImg__container')
    const companiesContainer = document.querySelector('.companies__container')
    homeImgContainer.style.display = 'none'
    companiesContainer.style.display = 'none'
    accessImgContainer.style.display = 'flex'
    
    handleModal(modalType)
}

export function handleModal(modalType){

    const modalControler = document.querySelector('.modal__controler')
    const btnLoginHome = document.querySelector('.btn__loginHome')
    const btnRegisterLogin = document.querySelector('.btn__registerLogin')
    const homeImgContainer = document.querySelector('.homeImg__container')
    modalControler.innerHTML = ''
    let modalBody = ''

    homeImgContainer.style.width = '100%'
    btnLoginHome.innerText = 'Home'
    

    if (modalType == 'Login'){

        btnRegisterLogin.innerText = 'Cadastro'
        modalBody = createModal('Login')
        modalControler.append(modalBody)
        modalControler.showModal()

        const loginBody = {}
        let count = 0
        const modalBtnRegisterLogin = document.querySelector('.modalBtn__registerLogin')
        const modalBtnRegisterReturn = document.querySelector('.modalBtn__registerReturn')
        const inputs = document.querySelectorAll(".form__input")
        
        modalBtnRegisterReturn.addEventListener('click', ()=>{
            modalControler.close()
            renderAccessPage('Cadastro')

        })

        modalBtnRegisterLogin.addEventListener('click', async (event) =>{
            
            event.preventDefault()
            
                inputs.forEach(({ name, value }) => {
                    if (value === "") {
        
                    count++
        
                    }
        
                    loginBody[name] = value
        
                })
        
                if (count !== 0) {
        
                    toast('por favor preencha os campos e tente novamente', red)
                    return 
        
                } else {
                    
                    const token = await loginRequest(loginBody)
                    
                    return token
        
                }            

        })

    }else if (modalType = 'Cadastro') {
        
        btnRegisterLogin.innerText = 'Login'
        modalBody = createModal('Register')
        modalControler.append(modalBody)
        modalControler.showModal()

        const registerBody = {}
        let count = 0
    
        const modalBtnRegisterLogin = document.querySelector('.modalBtn__registerLogin')

        const inputs = document.querySelectorAll(".form__input")

        modalBtnRegisterLogin.addEventListener('click', async (event) =>{

            event.preventDefault()

            inputs.forEach(({name, value}) => {

                if(value === '') {
                    count++
                }
        
                registerBody[name] = value

            })
        
            if(count !== 0) {

                toast('por favor preencha todos os campos necessários para realizar o cadastro', red)
                return 
            
            } else {
                console.log(registerBody)
                const newUser = await registerRequest(registerBody)
                    console.log(newUser)
                modalControler.close()
                renderAccessPage('Login')
                // setTimeout(() => {
                //     window.location.replace('/src/pages/')
                // }, 2000)
                
            }

        })
        
    }


    btnLoginHome.addEventListener('click', (event)=>{

        event.preventDefault()
        
       window.location.replace('../../index.html')

    })
    
}

// ******************************************************

openMenu()
closeMenu()
authentication()
goToLogin()
goToRegister()
renderAllCompanies()
renderCompaniesBySector()