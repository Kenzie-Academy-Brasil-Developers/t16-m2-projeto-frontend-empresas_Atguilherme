export function toast(text, color){

    const toastContainer = document.querySelector('.toast__container')
    const toastParagrapgh = document.querySelector('.toast__Paragrapgh')

    toastParagrapgh.innerText = text
    toastParagrapgh.style = `color: #FFFFFF`

    toastContainer.style = `background-color: ${color}; border-color: ${color}` 

    toastContainer.classList.remove('hidden')

    setTimeout(() => {

        toastContainer.classList.add('hidden')

    }, 4000)

}