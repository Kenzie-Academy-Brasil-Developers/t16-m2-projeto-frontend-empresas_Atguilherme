import { getAllCompanies, getAllDepartments, getAllUsers, newDepartment, getDepartmentById, deleteDepartment, updateDepartment, getAllEmployeesOutOfWork, hireEmployeeToDepartment, validateUser, deleteUser, updateEmployeeData } from "./requests.js"
import { toast } from "./toast.js"

export const green = '#4BA036'
export const red = '#CE4646'

async function authentication() {
    const token = localStorage.getItem('@kenzie_empresas:token')
    
    if(token) {
        
        //const {is_admin} = await validateUser(token)
        
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

    const btnLogout = document.querySelector('.btnAdmin__loginHome')

    btnLogout.addEventListener('click', () => {
        
        localStorage.clear()
        window.location.replace('../../index.html')

    })
}

async function createAdminDepartmentsHeader(){

    let companiesList = []
    const departmentsHeader = document.querySelector('.departments__header')
    const departmentsHeaderContainer = document.createElement('div')
    const departmentsTitle = document.createElement('h1')
    const companiesSelect = document.createElement('select')
    const departmentsButton = document.createElement('button')
    
    departmentsHeaderContainer.classList.add('departmentsHeader__container')
    departmentsTitle.classList.add('departments__title')
    companiesSelect.classList.add('departments__select')
    departmentsButton.classList.add('departments__button')
    
    departmentsTitle.innerText = 'Departamentos'
    companiesSelect.options[companiesSelect.options.length] = new Option('Selecionar Empresa', 'Selecionar Empresa')
    departmentsButton.innerText = 'Criar'
    
    departmentsHeaderContainer.append(departmentsTitle, companiesSelect, departmentsButton)
    
    departmentsHeader.append(departmentsHeaderContainer)
    
    const companies = await getAllCompanies()
    
    companies.forEach(company =>{

        companiesList.push(company)
        companiesSelect.options[companiesSelect.options.length] = new Option(company.name, company.uuid)

    })
    

    renderDepartmentsByCompanyId()

    createNewDepartment(companiesList)

    return 
    
}

async function renderDepartmentsByCompanyId(){
    
    const companiesSelect = document.querySelector('.departments__select')

    companiesSelect.addEventListener('change', async ()=>{

        if(companiesSelect.value == 'Selecionar Empresa'){

            getDepartments()

        }else{

            const departs = await getDepartmentById(companiesSelect.value)    
            renderDepartments(departs)

        }


    })

    return
}

function createAdminUsersHeader(){

    const adminUsers = document.querySelector('.admin__users')
    const adminUsersHeader = document.createElement('h1')
    const usersContainer = document.createElement('ul')

    adminUsersHeader.classList.add('adminUsers__header')
    usersContainer.classList.add('users__container')

    adminUsersHeader.innerText = 'Usuário Cadastrados'

    adminUsers.append(adminUsersHeader, usersContainer)

    renderUsers()

    return
}

async function renderDepartments(departments){

    const departmentsContainer = document.querySelector('.departments__container')

    departmentsContainer.innerHTML = ''

    departments.forEach(department =>{

        departmentsContainer.appendChild(createAdminDepartmentsCards(department))

    })

    renderDepartmentRemove()
    renderDepartmentEdit()
    openDepartment()

}

async function getDepartments(){

    const departments = await getAllDepartments()

    renderDepartments(departments)

}

function createAdminDepartmentsCards(department){
    
    const departmentItem = document.createElement('li')
    const divUpper = document.createElement('div')
    const departmentName = document.createElement('h2')
    const departmentDescription = document.createElement('h3')
    const departmentCompany = document.createElement('h3')
    const divLower = document.createElement('div')
    const departmentImgEye = document.createElement('img')
    const departmentImgPen = document.createElement('img')
    const departmentImgTrash = document.createElement('img')

    departmentItem.classList.add('department__item')
    divUpper.classList.add('div__upper')
    departmentName.classList.add('department__name')
    departmentDescription.classList.add('department__description')
    departmentCompany.classList.add('department__company')
    divLower.classList.add('div__lower')
    departmentImgEye.classList.add('department__ImgEye')
    departmentImgPen.classList.add('department__ImgPen')
    departmentImgTrash.classList.add('department__ImgTrash')

    departmentName.innerText = department.name
    departmentDescription.innerText = department.description
    departmentCompany.innerText = department.companies.name

    departmentImgEye.src = '../../src/assets/blue_eye.svg'
    departmentImgPen.src = '../../src/assets/pen_black.svg'
    departmentImgTrash.src = '../../src/assets/trash_icon.svg'

    departmentImgEye.dataset.id = department.uuid
    departmentImgPen.dataset.companyId = department.companies.uuid
    departmentImgPen.dataset.id = department.uuid
    departmentImgTrash.dataset.id = department.uuid
    departmentImgTrash.dataset.name = department.name

    divUpper.append(departmentName, departmentDescription, departmentCompany)

    divLower.append(departmentImgEye, departmentImgPen, departmentImgTrash)

    departmentItem.append(divUpper, divLower)

    return departmentItem

}

function createAdminUsersCards(user){
    
    const userItem = document.createElement('li')
    const divUserUpper = document.createElement('div')
    const userName = document.createElement('h2')
    const professionalLevel = document.createElement('h3')
    const userCompany = document.createElement('h3')
    const divUserLower = document.createElement('div')
    const userImgPen = document.createElement('img')
    const userImgTrash = document.createElement('img')
    
    userItem.classList.add('user__Item')
    divUserUpper.classList.add('divUser__Upper')
    userName.classList.add('user__Name')
    professionalLevel.classList.add('professional__Level')
    userCompany.classList.add('user__Company')
    divUserLower.classList.add('divUser__Lower')
    userImgPen.classList.add('userImg__Pen')
    userImgTrash.classList.add('userImg__Trash')

    userName.innerText = user.username
    professionalLevel.innerText = user.professional_level
    
    //falta arrumar o nome da empresa
    userCompany.innerText = 'Company'

    userImgPen.src = '../../src/assets/pen_blue.svg'
    userImgPen.dataset.userUuid = user.uuid
    userImgTrash.src = '../../src/assets/trash_icon.svg'
    userImgTrash.dataset.userUuid = user.uuid

    divUserUpper.append(userName, professionalLevel, userCompany)

    divUserLower.append(userImgPen, userImgTrash)

    userItem.append(divUserUpper, divUserLower)

    return userItem

}

async function renderUsers(){

    const usersContainer = document.querySelector('.users__container')
    usersContainer.innerHTML = ''
    const users = await getAllUsers()

    users.forEach(user =>{

        if(user.username != 'ADMIN'){

            usersContainer.appendChild(createAdminUsersCards(user))
            
            const btnDeleteUser = document.querySelector('.userImg__Trash')   

            btnDeleteUser.addEventListener('click', (event)=>{
                
                const modalControler = document.querySelector('.modal__UserRemove')
                const userName__span = document.querySelector('.userName__span')
                
            })
            
            deleteRegisteredUser()
            editRegisteredUser()
        
        
        
        }
        
    })
    
}

function editRegisteredUser(){

    const modalControler = document.querySelector('.modal__UserEdit')
    const btnsEditUser = document.querySelectorAll('.userImg__Pen')
    
    btnsEditUser.forEach(btnEditUser =>{
        
        btnEditUser.addEventListener('click', async (event) =>{
            
            const users = await getAllUsers()
            const user = users.filter(user => user.uuid == event.target.dataset.userUuid)
            
            modalControler.showModal()
            const btnClose = document.querySelector('.modal__DepartEditClose')
            
            btnClose.addEventListener('click', ()=>{

                modalControler.close()

            })
            const updateBody = {}


            const btnConfirm = document.querySelector('.btnUserEditSave')
            const select_kind_of_work = document.querySelector('.kind_of_work')
            const select_professional_level = document.querySelector('.professional_level')

            btnConfirm.addEventListener('click', async ()=>{

                if(select_kind_of_work.value == 'Selecionar modalidade de trabalho' || select_professional_level.value == 'Selecione um nível profissional'){

                    toast('por favor selecione as opções e tente novamente', red)
                    return 

                }else{
                    
                    updateBody.kind_of_work = select_kind_of_work.value
                    updateBody.professional_level = select_professional_level.value
                    
                }

                const updatedUser = await updateEmployeeData(event.target.dataset.userUuid, updateBody)
                modalControler.close()
                renderDepartments()

                return updatedUser

            })
            

        })
    })
    return

}

function deleteRegisteredUser(){

    // falta termimar aqui

}



function createNewDepartment(companiesList){

    const departmentsButton = document.querySelector('.departments__button')

    departmentsButton.addEventListener('click', ()=>{
        const modalControler = document.querySelector('.modal__NewDepartment')
        const selectCompany = document.querySelector('.selectCompany')

        companiesList.forEach(company =>{

            selectCompany.options[selectCompany.options.length] = new Option(company.name, company.uuid)
    
        })
 
        modalControler.showModal()

        const btnClose = document.querySelector('.modal__NewDepartClose')

        btnClose.addEventListener('click', ()=>{
            modalControler.close()
        })
        
        const btnCreateDepart = document.querySelector('.btn_createDepart')

        btnCreateDepart.addEventListener('click', async ()=>{

            const departBody = {};
            let count = 0;
            const inputs = document.querySelectorAll(".createDepart__input")
            const selectCompany = document.querySelector('.selectCompany')

            inputs.forEach(({ name, value }) => {
                if (value === "") {
    
                count++
    
                }
    
                departBody[name] = value
    
            })
    
            if (count !== 0 || selectCompany.value == 'Selecionar empresa') {
    
                toast('por favor preencha os campos e tente novamente', red)

                return 
    
            } else {
              
                departBody.company_uuid = selectCompany.value
                
                const newDepart = await newDepartment(departBody)
                const modalControler = document.querySelector('.modal__NewDepartment')
                modalControler.close()
            
                renderDepartments()
                return newDepart
    
            }            


        })

    })
    
    
}

function renderDepartmentRemove(){
    const modalControler = document.querySelector('.modal__DepartmentRemove')
    const btnsDeleteDepart = document.querySelectorAll('.department__ImgTrash')
    const message = document.querySelector('.departRemoveMessage > span')
    
    btnsDeleteDepart.forEach(btnDeleteDepart =>{
        
        btnDeleteDepart.addEventListener('click', (event) =>{
            
            const departName = document.querySelector('.department__name')
            message.innerText = event.target.dataset.name
            modalControler.showModal()
            const btnClose = document.querySelector('.modal__DepartRemoveClose')

            btnClose.addEventListener('click', ()=>{

                modalControler.close()

            })

            const btnConfirm = document.querySelector('.departRemoveBtnConfirm')
            btnConfirm.addEventListener('click', ()=>{

                deleteDepartment(event.target.dataset.id)
                modalControler.close()
                renderDepartments()

            })
            

        })
    })
    return
}

function renderDepartmentEdit(){
    const modalControler = document.querySelector('.modal__DepartmentEdit')
    const btnsEditDepart = document.querySelectorAll('.department__ImgPen')
    
    btnsEditDepart.forEach(btnEditDepart =>{
        
        btnEditDepart.addEventListener('click', async (event) =>{
            
            const editDepartInput = document.querySelector('.editDepart__input')
            
            const department = await getDepartmentById(event.target.dataset.companyId)
            editDepartInput.value = department[0].description
            
            const updateBody = {}
            const btnClose = document.querySelector('.modal__DepartEditClose')
            modalControler.showModal()
            
            btnClose.addEventListener('click', ()=>{
                
                modalControler.close()

            })

            const btnConfirm = document.querySelector('.btn__saveEdition')
            btnConfirm.addEventListener('click', ()=>{

                if(editDepartInput.value.trim().lenght == 0){

                    toast('por favor preencha os campos e tente novamente', red)
                    return 

                }else{
                    
                    updateBody.description = editDepartInput.value
                    
                }
                updateDepartment(event.target.dataset.id, updateBody)
                modalControler.close()
                renderDepartments()

            })
            

        })
    })


    return

}

async function renderModalDepartments(departId){

    const departments = await getAllDepartments()
    
    departments.forEach(department =>{

        if(department.uuid == departId){

            const departTitle = document.querySelector('.depart__title')
            const departDescription = document.querySelector('.depart__description')
            const departCompany = document.querySelector('.depart__company')
            departTitle.innerText = department.name
            departTitle.dataset.id = department.uuid
            departDescription.innerText = department.description
            departCompany.innerText = department.companies.name

        }

    })

}

function openDepartment(){

    const modalControler = document.querySelector('.modal__DepartmentsData')
    const DepartContainer = document.querySelector('.modal__DepartContainer')
    const btnsOpenDepart = document.querySelectorAll('.department__ImgEye')

    btnsOpenDepart.forEach(btnOpenDepart =>{

        btnOpenDepart.addEventListener('click', async  (event) =>{

            event.preventDefault()

            renderModalDepartments(event.target.dataset.id)

            

            loadSelectUsers()

            renderDepartEmployees()

            modalControler.showModal()

            const btnToHire = document.querySelector('.toHire')

            btnToHire.addEventListener('click', ()=>{

                const departTitle = document.querySelector('.depart__title')
                const selectUser = document.querySelector('.select__user')

                hireEmploee(selectUser.value, departTitle.dataset.id)



            })

            const btnClose = document.querySelector('.modal__DepartDataClose')

            btnClose.addEventListener('click', ()=>{
                
                modalControler.close()

            })
    
        })

    })

}

async function loadSelectUsers(){

    const EmployeesOutOfWork = await getAllEmployeesOutOfWork()
    const selectUser = document.querySelector('.select__user')
    selectUser.innerHTML = ''  
    selectUser.options[selectUser.options.length] = new Option('Selecionar usuário', 'Selecionar usuário')

    EmployeesOutOfWork.forEach(EmployeeOutOfWork =>{
    

        selectUser.options[selectUser.options.length] = new Option(EmployeeOutOfWork.username, EmployeeOutOfWork.uuid)
    })

}

async function hireEmploee(userUuid, departmentUuid){
    const selectUser = document.querySelector('.select__user')
    
    if(userUuid == 'Selecionar usuário'){

        toast('Selecione o usuário a ser contratado', red)
        return

    }else{

        const updateBody = {}
        updateBody.user_uuid = userUuid
        updateBody.department_uuid = departmentUuid
        
        //const hiredEmploee = await hireEmployeeToDepartment(updateBody)
        
        const modalDepartContainer =document.querySelector('.modal__DepartContainer')
        modalDepartContainer.innerHTML = ''
        
        loadSelectUsers()
        renderDepartEmployees()


        // limpar e recarregar a lista de usuários não contratados

    }
}

async function renderDepartEmployees(){

    const departTitle = document.querySelector('.depart__title')
    const departId = departTitle.dataset.id
    
    const employeesList = document.querySelector('.users_list')
    
    employeesList.innerHTML = ''
    const employees = await getAllUsers()
    
    const departmentEmployees = employees.filter(employee => employee.department_uuid == departId )
    departmentEmployees.forEach(departmentEmployee => {
        
        if (departmentEmployee.username != 'ADMIN'){

            const departEmployee = departmentEmployee
            employeesList.append(createEmployeeCard(departEmployee))

        }
    
    })
    
}

function createEmployeeCard(employee){
    const employeeItem = document.createElement('li')
    const departUserName = document.createElement('h2')
    const UserProfLevel = document.createElement('h3')
    const userCompany = document.createElement('p')
    const btnContent = document.createElement('div')
    const btnDismiss = document.createElement('button')
    
    employeeItem.classList.add('user__card')
    btnContent.classList.add('btn__content')
    btnDismiss.classList.add('btn__Dismiss')
    
    departUserName.innerText = employee.username
    if(employee.professional_level == null){
        UserProfLevel.innerText = ''    
    }else{
        
        UserProfLevel.innerText = employee.professional_level 
        
    }

    const departCompany = document.querySelector('.depart__company')
    userCompany.innerText = departCompany.innerText
    btnDismiss.innerText = 'Desligar'

    btnContent.appendChild(btnDismiss)
    employeeItem.append(departUserName, UserProfLevel, userCompany, btnContent)
    
    return employeeItem

}

authentication()
logout()
createAdminDepartmentsHeader()
createAdminUsersHeader()
getDepartments()
authentication()