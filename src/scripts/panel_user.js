import { getUserProfile, getAllDepartmentsFromEmployee, updateSelfEmployeeData, getAllEmployeesCoworkers, validateUser } from "./requests.js"
import { createModalEditUser } from './modal.js'

async function authentication() {
    const token = localStorage.getItem('@kenzie_empresas:token')
    
    if(token) {
        
        const {is_admin} = await validateUser(token)
        
        if (is_admin){
            
            window.location.replace('/src/pages/panel_admin.html')
            
        }else{
            
            window.location.replace('/src/pages/panel_user.html')
            
        }
                
    }else{
        
        window.location.replace('/index.html')

    }

}

function logout(){

    const btnLogout = document.querySelector('.btn__registerLogin')

    btnLogout.addEventListener('click', () => {
        
        localStorage.clear()
        window.location.replace('../../index.html')

    })
}

function createUserProfile(profile){

    const userHeader = document.querySelector('.user__header')
    const div1 = document.createElement('div')
    const userName = document.createElement('h1')
    const userEmail = document.createElement('h1')
    const div2 = document.createElement('div')
    const professionalLevel = document.createElement('h2')
    const kindOfWork = document.createElement('h2')
    const div3 = document.createElement('div')
    const editSpan = document.createElement('span')
    const imgEdit = document.createElement('img')

    div1.classList.add('div1')
    userName.classList.add('user__name')
    userEmail.classList.add('user__email')
    div2.classList.add('div2')
    professionalLevel.classList.add('professional__level')
    kindOfWork.classList.add('kindOf__work')
    div3.classList.add('div3')
    editSpan.classList.add('edit__span')
    imgEdit.classList.add('btnImg__edit')
    imgEdit.src = '.././assets/pen_blue.svg'

    userName.innerText = profile.username
    userName.dataset.userId = profile.uuid
    userEmail.innerText = `E-mail: ${profile.email}`
    if(profile.professional_level == null){

        professionalLevel.innerText = profile.professional_level

    }else{

        professionalLevel.innerText = ''    

    }

    if(profile.kind_of_work == null){

        kindOfWork.innerText = profile.kind_of_work

    }else{

        kindOfWork.innerText = ''    
        
    }

    div1.append(userName, userEmail)
    div2.append(professionalLevel, kindOfWork)
    editSpan.appendChild(imgEdit)
    div3.appendChild(editSpan)

    userHeader.append(div1, div2, div3)

    return userHeader
}

async function renderUserProfile(){

    const token = JSON.parse(localStorage.getItem('@kenzie_empresas:token'))
    const profile = await getUserProfile(token)
    
    if(profile.department_uuid == null){

        const hiredUserBody = document.querySelector('.hiredUser__body')
        hiredUserBody.classList.add('hidden')

    }else{

        const UserBody = document.querySelector('.user__body')
        UserBody.classList.add('hidden')
        
        renderCoorkers()

    }
    
    createUserProfile(profile)   
    userEdit()

}

async function renderCoorkers(){

    const departNameTitle = document.querySelector('.departName__Title')
    const coworkersList = document.querySelector('.coworkers__list')
    const usersDepartment = await getAllDepartmentsFromEmployee()
    const usersCoworkers = await getAllEmployeesCoworkers()
    const coworkersData = usersCoworkers[0].users
    const employeeCompany = usersDepartment.name
    const employeeDepartment = usersDepartment.departments[0].name
    
    departNameTitle.innerText = `${employeeCompany} - ${employeeDepartment}`
    coworkersList.innerHTML = ''
    const pageUserName = document.querySelector('.user__name')
    const userId = pageUserName.dataset.userId
    
    coworkersData.forEach(coworkerData => {
        
        if(coworkerData.uuid != userId){

            coworkersList.appendChild(createCoworkerCard(coworkerData))

        }

    })

}

function createCoworkerCard(user){

    const coworkerItem = document.createElement('li')
    const coworkerName = document.createElement('h2')
    const coworkerLevel = document.createElement('h3')

    coworkerItem.classList.add('coorker__item')

    coworkerName.innerText = user.username
    coworkerLevel.innerText = user.professional_level

    coworkerItem.append(coworkerName, coworkerLevel)

    return coworkerItem

}

function renderModalEditUserData(){

    const modalControler = document.querySelector('.modal__controler')

    modalControler.appendChild(createModalEditUser())
    modalControler.showModal()
    
    const btnEditProfile = document.querySelector('.modalBtn__editProfile')

    btnEditProfile.addEventListener('click', async ()=>{

        const updateUserBody = {}
        let count = 0


        const inputs = document.querySelectorAll(".form__input")

            inputs.forEach(({name, value}) => {

                if(value === '') {
                    count++
                }
        
                updateUserBody[name] = value

            })
        
            if(count !== 0) {

                toast('por favor preencha todos os campos necessários para realizar o cadastro', red)
                return 
            
            } else {
            
                const userUpdate = await updateSelfEmployeeData(updateUserBody)
                            
            }

    })

}

function userEdit(){

    const btnEdit = document.querySelector('.btnImg__edit')
    
    btnEdit.addEventListener('click', () => {
        
        renderModalEditUserData()

    })
}


renderUserProfile()
logout()