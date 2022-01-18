// Работает с ссылками

const links = document.querySelectorAll(".link");

links.forEach(link=>{
    link.addEventListener("click",()=>{
        links.forEach(ele => ele.classList.remove("active"));
        link.classList.add("active");
    })
})