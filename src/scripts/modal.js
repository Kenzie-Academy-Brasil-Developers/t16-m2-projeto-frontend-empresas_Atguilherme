export function createModal(modalType){
    const modalContainer = document.createElement('div')
    const modalForm = document.createElement('form')
    const modalTitle = document.createElement('h1')
    const modalBtnRegisterLogin = document.createElement('button')
    const modalBtnRegisterReturn = document.createElement('button')
    const modalEmail = document.createElement('input')
    const modalPassword = document.createElement('input')
    
    modalContainer.classList.add('modal__container')
    modalForm.classList.add('modal__form')
    modalTitle.classList.add('modal__title')
    modalBtnRegisterLogin.classList.add('modalBtn__registerLogin')
    modalBtnRegisterReturn.classList.add('modalBtn__registerReturn')
    modalEmail.classList.add('modal__email', 'form__input')
    modalPassword.classList.add('modal__password', 'form__input')
    
    modalBtnRegisterReturn.innerText = 'Cadastre-se'
    modalEmail.placeholder = 'Seu e-mail'
    modalEmail.name = 'email'
    modalPassword.placeholder = 'Sua senha'
    modalPassword.type = 'password'
    modalPassword.name = 'password'
    
    if (modalType == 'Login'){
        
        const modalMessage = document.createElement('h2')
        const modalSpan = document.createElement('span')
        
        modalMessage.classList.add('modal__message')
        modalSpan.classList.add('modal__span')
        
        modalTitle.innerText = 'Login'
        modalMessage.innerText = 'Preencha os campos para realizar o login'
        modalBtnRegisterLogin.innerText = 'Login'
        modalSpan.innerText = 'ou'
        modalBtnRegisterReturn.innerText = 'Cadastre-se'
        
        modalForm.append(modalTitle, modalMessage, modalEmail, modalPassword, modalBtnRegisterLogin, modalSpan, modalBtnRegisterReturn)

        modalContainer.appendChild(modalForm)
        
        
        return modalContainer
        
    }else if (modalType == 'Register'){
        
        const modalName = document.createElement('input')
        const modalLevel = document.createElement('select')
        const modalBtnReturn = document.createElement('button')

        modalName.classList.add('modal__name', 'form__input')
        modalLevel.classList.add('modal__level')
        modalBtnRegisterLogin.innerText = 'Cadastre-se'
        

        modalTitle.innerText = 'Cadastre-se'
        modalName.placeholder = 'Seu nome'
        modalName.name = 'username'
        modalLevel.name = 'professional_level'
        modalLevel.options[modalLevel.options.length] = new Option('Nível Profissional', 'Nível Profissional')
        modalLevel.options[modalLevel.options.length] = new Option('Estagiário', 'Estagiário')
        modalLevel.options[modalLevel.options.length] = new Option('Júnior', 'Júnior')
        modalLevel.options[modalLevel.options.length] = new Option('Senior', 'Senior')
        modalLevel.options[modalLevel.options.length] = new Option('Pleno', 'Pleno')

        
        modalBtnRegisterReturn.innerText = 'Retornar'
        
        modalForm.append(modalTitle, modalName, modalEmail, modalPassword, modalLevel, modalBtnRegisterLogin, modalBtnRegisterReturn)

        modalContainer.appendChild(modalForm)
        
        return modalContainer
    }

}

export function createModalEditUser(){

    const modalContainer = document.createElement('div')
    const modalForm = document.createElement('form')
    const modalTitle = document.createElement('h1')
    const modalName = document.createElement('input')
    const modalEmail = document.createElement('input')
    const modalPassword = document.createElement('input')
    const modalBtnEditProfile = document.createElement('button')

    modalContainer.classList.add('modal__container')
    modalForm.classList.add('modal__form')
    modalTitle.classList.add('modal__title')
    modalName.classList.add('modal__name', 'form__input')
    modalPassword.classList.add('modal__password', 'form__input')
    modalEmail.classList.add('modal__email', 'form__input')
    modalBtnEditProfile.classList.add('modalBtn__editProfile')

    modalTitle.innerText = 'Editar Perfil'
    modalName.placeholder = 'Seu nome'
    modalEmail.placeholder = 'Seu e-mail'
    modalPassword.placeholder = 'Sua senha'  
    modalBtnEditProfile.innerText = 'Editar perfil'

    modalName.name = 'username'
    modalEmail.name = 'email'
    modalPassword.type = 'password'
    modalPassword.name = 'password'

    modalForm.append(modalTitle, modalName, modalEmail, modalPassword, modalBtnEditProfile)

    modalContainer.appendChild(modalForm)
        
    return modalContainer

}

