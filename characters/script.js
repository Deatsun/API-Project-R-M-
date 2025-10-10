/*        <div class="col">
                <div class="card">
  <img src="..." class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <ul class="list-group">
  <li class="list-group-item">An item</li>
</ul>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>*/

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://rickandmortyapi.com/api/character/");

xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        const json = JSON.parse(xhr.responseText);

        //---------------------------------------------------------------------------------Cards--------------------------------------------------------------------------------------
        for(let i = 0; i < json.results.length; i++){

            let name = json.results[i].name;
            let status = json.results[i].status;
            let gender = json.results[i].gender;
            let type = json.results[i].type;


            const col = document.createElement("div");
            col.classList = "col-12 col-md-6 col-lg-3 my-3";

            const card = document.createElement("div");
            card.classList = "card h-100";
            card.style.border = "2px solid cyan";
            card.addEventListener("mouseover", function(){
                this.style.transform = "scale(1.06)";
                this.style.boxShadow = "3px 8px 15px rgba(57, 201, 14, 0.6)";
                this.style.transition = "0.3s ease";
                this.style.border = "5px solid rgba(57, 201, 14, 0.6)";
                if(status === "Dead"){
                    this.style.transform = "scale(1.06)";
                this.style.boxShadow = "3px 8px 15px rgba(201, 14, 14, 0.6)";
                this.style.transition = "0.3s ease";
                this.style.border = "5px solid rgba(201, 14, 14, 0.6)";
                }
            });
            card.addEventListener("mouseout", function(){
                this.style.transform = "scale(1)";
                this.style.boxShadow = "none";
                this.style.transition = "none";
                this.style.border = "2px solid cyan";
            });

            const img = document.createElement("img");
            img.classList = "card-img-top w-100";
            img.style.borderBottom = "2px solid black";
            img.setAttribute("src", json.results[i].image);

            const cardbody = document.createElement("div");
            cardbody.classList = "card-body d-flex flex-column";

            const h5 = document.createElement("h5");
            h5.classList = "card-title text-center";
            h5.style.fontWeight = "bold";
            h5.innerHTML = name;
            if(status === "Dead"){
                h5.style.color = "red";
            };

            const ul = document.createElement("ul");
            ul.classList = "list-group";

            const li1 = document.createElement("li");
            li1.classList = "list-group-item";
            if(status === "Alive"){
                li1.textContent = `Status: ${status} ✅`;
            }
            else if (status === "Dead"){
                li1.textContent = `Status: ${status} ❌`;
            }
            else{
                li1.textContent = "Status: ❔"
                li1.style.color = "Red";
            };

            const li2 = document.createElement("li");
            li2.classList = "list-group-item";
            li2.textContent = `Gender: ${gender}`;

            const li3 = document.createElement("li");
            li3.classList = "list-group-item";
            li3.textContent = `Type: ${type}`;
            if(type.length === 0){
                li3.textContent = "Type: Not know ❌";
                li3.style.color = "red";
            }

            const a = document.createElement("a");
            a.classList = "btn btn-dark mt-auto";
            a.textContent = "Information";
            a.setAttribute("href", "../profile/index.html?id=" +json.results[i].id);

            ul.appendChild(li1);
            ul.appendChild(li2);
            ul.appendChild(li3);

            cardbody.appendChild(h5);
            cardbody.appendChild(ul);
            cardbody.appendChild(a);

            card.appendChild(img);
            card.appendChild(cardbody);

            col.appendChild(card);

            document.getElementById("cardrow").appendChild(col);

        }
    }
};
xhr.send(null);