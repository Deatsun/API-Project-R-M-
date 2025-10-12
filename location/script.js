const xhr = new XMLHttpRequest();

xhr.open("GET", "https://rickandmortyapi.com/api/location");

xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        const json = JSON.parse(xhr.responseText);

            //Cards--------------------------------------------------------------------------------------------------------------------------------------------------
        for(let i = 0; i < json.results.length; i++){
            
            const name = json.results[i].name;
            const type = json.results[i].type;
            const dimension = json.results[i].dimension;
            const residents = json.results[i].residents.length;
                //Col
            let col = document.createElement("div");
            col.classList = "col-12 col-md-4 col-lg-3 my-3";
                //Card
            let card = document.createElement("div");
            if(residents > 0){

            card.addEventListener("mouseover", function(){
                this.style.transform = "scale(1.06)";
                this.style.boxShadow = "3px 8px 15px rgba(57, 201, 14, 0.6)";
                this.style.transition = "0.3s ease";
                this.style.border = "5px solid green";
            })}
            else{
                card.addEventListener("mouseover", function(){
                this.style.transform = "scale(1.06)";
                 this.style.boxShadow = "3px 8px 15px rgba(201, 14, 14, 0.6)";
                this.style.transition = "0.3s ease";
                this.style.border = "5px solid rgba(201, 14, 14, 0.6)";
            })
            }
            card.addEventListener("mouseout", function(){
                this.style.transform = "scale(1)";
                this.style.boxShadow = "none";
                this.style.transition = "none";
                this.style.border = "2px solid black";
            });
            card.style.border = "2px solid white";
            card.style.borderRadius = "10px";
            card.classList = "card h-100 bg-dark";

            let cardbody = document.createElement("div");
            cardbody.classList = "card-body d-flex flex-column";

            let h1 = document.createElement("h1");
            h1.style.fontWeight = "bold";
            h1.classList = "card-title text-center text-white";
            if(residents === 0){
                h1.classList = "card-title text-center text-danger";
            }
            h1.textContent = name;

            let hr = document.createElement("hr");
            hr.style.color = "white";

            let ul = document.createElement("ul");
            ul.classList = "list-group list-group-flush mt-auto";
            ul.style.border = "5px solid black";

            let li1 = document.createElement("li");
            li1.classList = "list-group-item bg-secondary text-white text-center";
            li1.textContent = `Type: ${type}`;

            let li2 = document.createElement("li");
            li2.classList = "list-group-item bg-secondary text-white text-center";
            if(dimension === "unknown"){
                li2.textContent = "Dimension: Not know!";
                li2.classList = "list-group-item bg-danger text-white text-center";
                
            }
            else{
                li2.textContent = `Dimension: ${dimension}`;
            }
            

            let li3 = document.createElement("li");
            li3.classList = "list-group-item bg-secondary text-white text-center";
            if(residents === 0){
                li3.classList = "list-group-item bg-danger text-white text-center";
            }
            li3.textContent = `Residents: ${residents}`;

            ul.appendChild(li1);
            ul.appendChild(li2);
            ul.appendChild(li3);

            cardbody.appendChild(h1);
            cardbody.appendChild(hr);
            cardbody.appendChild(ul);

            card.appendChild(cardbody);

            col.appendChild(card);

            document.getElementById("locationrow").appendChild(col);
        }
    }
};
xhr.send(null);