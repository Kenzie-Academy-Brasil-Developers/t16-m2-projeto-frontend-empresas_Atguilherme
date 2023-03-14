import { toast } from './toast.js'

export const green = '#4BA036'
export const red = '#CE4646'

const token = JSON.parse(localStorage.getItem("@kenzie_empresas:token")) || ""

const baseUrl = "http://localhost:6278"
const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
}

function redirect(is_admin){
  
  if (is_admin){
   
   window.location.replace('/src/pages/panel_admin.html')
  
  }else{
  
   window.location.replace('/src/pages/panel_user.html')
  
  }

}

export async function loginRequest(loginBody) {
  
  const token = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(loginBody),
  }).then((response) => {
    
    if (response.ok) {
      
      const responseJson = response.json().then(async ({ token }) => {
        localStorage.setItem("@kenzie_empresas:token", JSON.stringify(token))    
        
        const {is_admin} = await validateUser(token)
        redirect(is_admin)
        return token

      })

      return responseJson

    } else {
    
      response.json().then((resError) => {

        toast(resError.message, red)      
      
      })

    }
  })
  
  return token

}


export async function registerRequest(registerBody) {
  
  const newUser = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(registerBody),
  }).then((response) => {

    if (response.ok) {

      response.json().then((resJson) => {
        
        const toastContainer = document.querySelector('.toast__container')
        toast('Usuário cadastrado com sucesso', green)
        setTimeout(() => {
          toastContainer.classList.add('hidden')
        }, 2000)

        return resJson

      })

    } else {

      response.json().then((resError) => {

        const toastContainer = document.querySelector('.toast__container')
        toast(resError.message, red)
        setTimeout(() => {
          toastContainer.classList.add('hidden')
        }, 2000)

        })

    }

  })

  return newUser

}

export async function getAllCompanies() {
  
  const companies = await fetch(`${baseUrl}/companies`, {
    method: "GET",
    headers: requestHeaders,
  }).then((response) => {

    if (response.ok) {


      const responseJson =  response.json().then( (resJson) => {
        
        return resJson

      })
      
      return responseJson
      
    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

        })

    }
    
  })
  
  return companies

}

export async function getCompaniesBySector(sectorName) {
  
  const companies = await fetch(`${baseUrl}/companies/${sectorName}`, {
    method: "GET",
    headers: requestHeaders,
  }).then((response) => {

    if (response.ok) {


      const responseJson =  response.json().then( (resJson) => {
        
        return resJson

      })
      
      return responseJson
      
    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

        })

    }
    
  })
  
  return companies

}

// Rota responsável por listar todos os setores cadastrados no sistema
export async function getSectors() {
  
  const sectors = await fetch(`${baseUrl}/sectors`, {
    method: "GET",
    headers: requestHeaders,
  }).then((response) => {

    if (response.ok) {


      const responseJson =  response.json().then( (resJson) => {
        
        return resJson

      })
      
      return responseJson
      
    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

        })

    }
    
  })
  
  return sectors

}

export async function newCompany(companyBody) {
  
  const newCompany = await fetch(`${baseUrl}/companies`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(companyBody),
  }).then((response) => {

    if (response.ok) {

      toast('Empresa cadastrada com sucesso', green)

      return response.json()

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }

  })

  return newCompany

}

export async function getAllUsers() {
  
  const users = await fetch(`${baseUrl}/users`, {
    method: "GET",
    headers: requestHeaders,
  }).then((response) => {

    if (response.ok) {

      const responseJson =  response.json().then( (resJson) => {
        
        return resJson

      })
      
      return responseJson

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }

  })

  return users

}

export async function getAllDepartments() {
  
  const departments = await fetch(`${baseUrl}/departments`, {
    method: "GET",
    headers: requestHeaders,
  }).then((response) => {

    if (response.ok) {

      const responseJson =  response.json().then( (resJson) => {
        
        return resJson

      })
      
      return responseJson

    } else {

      response.json().then((resError) => {
        if (resError.error != 'need admin permission to access'){

          toast(resError.message, red)
          
        }else{
          
          window.location.replace('/src/pages/panel_user.html')

        }
        

      })

    }

  })

  return departments

}

// Rota responsável por cadastrar um novo departamento
export async function newDepartment(departmentBody) {
  console.log(departmentBody)
  const newDepartment = await fetch(`${baseUrl}/departments`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(departmentBody),
  }).then((response) => {

    if (response.ok) {

      toast('Departamento cadastrado com sucesso', green)

      return response.json()

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }

  })

  return newDepartment

}

// Rota responsável por listar todos os departamentos de uma empresa, o ID da empresa deve ser informado na URL da requisição
export async function getDepartmentById(departmentId) {
  
  const department = await fetch(`${baseUrl}/departments/${departmentId}`, {
    method: "GET",
    headers: requestHeaders,
  }).then((response) => {

    if (response.ok) {

      const responseJson =  response.json().then( (resJson) => {
        
        return resJson

      })
      
      return responseJson

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }

  })

  return department

}

// Rota responsável por contratar um funcionário para um departamento
export async function hireEmployeeToDepartment(updateBody) {
  
  const employee = await fetch(`${baseUrl}/departments/hire`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(updateBody),
  }).then((response) => {

    if (response.ok) {

      toast("Usuário contratado com sucesso", green)

      return response.json()

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }
    
  })

  return employee

}

export async function dismissEmployee(employeeId) {

  const employee = await fetch(`${baseUrl}/departments/dismiss/${employeeId}`, {
    method: "PATCH",
    headers: requestHeaders
  }).then((response) => {

    if (response.ok) {

      toast("post atualizado com sucesso", green)

      return response.json()

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }
    
  })

  return employee

}

// Rota responsável por atualizar a descrição de um departamento
export async function updateDepartment(departmentId, updateBody) {

  const department = await fetch(`${baseUrl}/departments/${departmentId}`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(updateBody)
  }).then((response) => {

    if (response.ok) {

      toast("Descrição atualizada com sucesso", green)

      return response.json()

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }
    
  })

  return department

}

// Rota responsável por deletar um departamento
export async function deleteDepartment(departmentId) {

  const department = await fetch(`${baseUrl}/departments/${departmentId}`, {
    method: "DELETE",
    headers: requestHeaders
  }).then((response) => {

    if (response.ok) {

      toast("Departamento excluído com sucesso", green)

      return response.json()

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }
    
  })

  return department

}

export async function getAllEmployeesOutOfWork() {
  
  const employees = await fetch(`${baseUrl}/admin/out_of_work`, {
    method: "GET",
    headers: requestHeaders,
  }).then((response) => {

    if (response.ok) {

      const responseJson =  response.json().then( (resJson) => {
        
        return resJson

      })
      
      return responseJson

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }

  })

  return employees

}

//Rota responsável por atualizar as informações de um funcionário
export async function updateEmployeeData(employeeId, updateBody) {

  const employee = await fetch(`${baseUrl}/admin/update_user${employeeId}`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(updateBody)
  }).then((response) => {

    if (response.ok) {

      toast("post atualizado com sucesso", green)

      return response.json()

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }
    
  })

  return employee

}

//Rota responsável por deletar um usuário
export async function deleteUser(userId) {

  const user = await fetch(`${baseUrl}/admin/delete_user/${userId}`, {
    method: "DELETE",
    headers: requestHeaders
  }).then((response) => {

    if (response.ok) {

      toast("post atualizado com sucesso", green)

      return response.json()

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }
    
  })

  return user

}

// requests para funcionários

//Rota responsável para listar as informações do usuário logado
export async function getUserProfile(token) {
  
  const userProfile = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {

    if (response.ok) {
      
      const responseJson =  response.json().then( (resJson) => {
        return resJson
        
      })
      
      return responseJson
      
    } else {
      
      response.json().then((resError) => {
        
        if (resError.error = 'you are admin, use the route: users'){
          window.location.replace('/src/pages/panel_admin.html')
        }

      })

    }

  })

  return userProfile

}

// Rota para listar todos os funcionários de um mesmo departamento
export async function getAllEmployeesCoworkers() {
  
  const coworkers = await fetch(`${baseUrl}/users/departments/coworkers`, {
    method: "GET",
    headers: requestHeaders,
  }).then((response) => {

    if (response.ok) {

      const responseJson =  response.json().then( (resJson) => {
        
        return resJson

      })
      
      return responseJson

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }

  })

  return coworkers

}

// Rota responsável por listar todos os departamentos da empresa que o usuário logado é funcionário
export async function getAllDepartmentsFromEmployee() {
  
  const departments = await fetch(`${baseUrl}/users/departments`, {
    method: "GET",
    headers: requestHeaders,
  }).then((response) => {

    if (response.ok) {

      const responseJson =  response.json().then( (resJson) => {
        
        return resJson

      })
      
      return responseJson

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }

  })

  return departments

}

//Rota responsável por atualizar as informações do usuário logado
export async function updateSelfEmployeeData(updateBody) {

  const employee = await fetch(`${baseUrl}/users`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(updateBody)
  }).then((response) => {

    if (response.ok) {

      toast("Seus dados foram atualizados com sucesso", green)

      return response.json()

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }
    
  })

  return employee

}

// Todos os Usuários com Token

// Rota responsável por obter o tipo de usuário logado
export async function validateUser(token) {
  
  const validate = await fetch(`${baseUrl}/auth/validate_user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`}
  })
  
  .then((response) => response.json())

  return validate

}
