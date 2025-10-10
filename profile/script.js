const usp = new URLSearchParams(window.location.search);
const id = Number(usp.get("id"));

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://rickandmortyapi.com/api/character/" + id);

xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        const json = JSON.parse(xhr.responseText);

        let img = document.getElementById("image");
        img.setAttribute("src", json.image);
        img.classList ="w-100";
        img.style.borderRadius = "100%";
    }
}
xhr.send(null);