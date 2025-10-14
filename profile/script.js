const usp = new URLSearchParams(window.location.search);
const id = Number(usp.get("id"));

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://rickandmortyapi.com/api/character/" + id);

xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        const json = JSON.parse(xhr.responseText);
        //----------------------------------------------Window buttons----------------------------------------------------------------------------------------------------

        //back button
       let back = document.getElementById("backWindow");
       back.appendChild(document.createTextNode(""));
       back.addEventListener("click",function(){
        window.history.back();
       });

       //forward button
       let forward = document.getElementById("forwardWindow");
       forward.addEventListener("click", function(){
        window.history.forward();
       });

        let img = document.getElementById("image");
        img.setAttribute("src", json.image);
        img.classList ="w-100";
        img.style.borderRadius = "100%";

        function random(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        img.style.border = `5px solid rgba(${random(0,255)}, ${random(0,255)}, ${random(0,255)}, ${random(0,255)})`;

        const name = json.name;
        const status = json.status;
        const species = json.species;
        const type = json.type;
        const gender = json.gender;

        const origin = json.origin.name;

        const location = json.location.name;

        const ul = document.getElementById("ul");
        ul.style.listStyle = "none";

             let li1 = document.getElementById("li1");
             li1.style.fontWeight = "bold";
             li1.appendChild(document.createTextNode(name));

             let li2 = document.getElementById("2");
             li2.textContent = `Status: ${status}`;
             if(status === "Alive"){
                li2.setAttribute("class", "bg-success list-group-item")
             }
             else if( status === "Dead"){
                li2.setAttribute("class", "bg-danger list-group-item")
             }
             else{
                li2.textContent = "Status: ❔❔❔";
                li2.setAttribute("class", "bg-secondary list-group-item");
             }

             let li3 = document.getElementById("3");
             li3.textContent = `Species: ${species}`;
             li3.classList = `bg-secondary list-group-item text-white`;

             let li4 = document.getElementById("4");
             li4.textContent = `Type: ${type}`;
             li4.classList = `bg-secondary list-group-item text-white`
             if(type.length === 0){
                li4.textContent = "Type: Not know!";
                li4.classList = "bg-danger list-group-item";
             }
             else{
                li4.classList = "bg-secondary list-group-item";
             }

             let li5 = document.getElementById("5");
             li5.textContent = `Gender: ${gender}`;
             li5.classList = "bg-secondary list-group-item text-white";

             let li6 = document.getElementById("6");
             li6.textContent = `Origin: ${origin}`;
             li6.classList = "bg-secondary list-group-item text-white";
             if(origin === "unknown"){
                li6.textContent = `Origin: Not know!`;
                li6.classList = "bg-danger list-group-item";
             }

             let li7 = document.getElementById("li7");
             li7.textContent = `Location: ${location}`;
             li7.classList = `bg-secondary list-group-item text-white`;
             if(location === "unknown"){
                li7.textContent = "Location: Not know!"
                li7.classList = "bg-danger list-group-item";
             }
             else{
                li7.textContent = `Location: ${location}`;
                li7.classList = `bg-secondary list-group-item text-white`;

             }
             

    }
}
xhr.send(null);