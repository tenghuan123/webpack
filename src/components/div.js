export default function div(text = 'hello world') {
    const element = document.createElement('div')
    element.className = 'rounded bg-red-100 border max-w-md m-4 p-4'
    element.innerHTML = text

    element.onclick = () => {
        import('./lazy').then((lazy) => {
            element.innerHTML = lazy.default
        })
        .catch((error) => {
            console.error(error)
        })
    }
    
    return element
}