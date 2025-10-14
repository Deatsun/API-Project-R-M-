const usp = new URLSearchParams(window.location.search);
const pages = Number(usp.get("page") || 1);

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://rickandmortyapi.com/api/location/?page=" + pages);

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

//--------------------Pages----------------------------------------------------------------------------------------------------------------------------

const maxp = Number(json.info.pages);

const ul = document.getElementById("pagination");
ul.classList = "pagination mt-2";

            //First button
const lifirst = document.createElement("li");
lifirst.classList = "page-item";

const afirst = document.createElement("a");
afirst.classList = "page-link"
afirst.appendChild(document.createTextNode("First"));
afirst.style.backgroundColor = "rgb(255, 94, 0)";
afirst.setAttribute("href", "index.html?page=1");
if(pages === 1){
    afirst.style.textDecoration = "underline";
}

lifirst.appendChild(afirst);
ul.appendChild(lifirst);


       //Back button

            const liback = document.createElement("li");
            liback.classList = "page-item";

            const aback = document.createElement("a");
            aback.classList = "page-link";
            aback.appendChild(document.createTextNode("Back"));
            aback.setAttribute("href", "index.html?page=" + (pages-1));
            aback.style.backgroundColor = "rgb(255, 94, 0)";
            if(pages === 1){
                liback.classList = "disabled";
            }

            liback.appendChild(aback);
            ul.appendChild(liback);


            //Always 5 button and the active page on middle

            const windowSize = 5;

            let start = pages - Math.floor(windowSize / 2);
            let end = pages + Math.floor(windowSize / 2);

            if(start < 1){
                start = 1;
                end = windowSize;
            }
            if(end > maxp){
                end = maxp;
                start = Math.max(1, maxp- windowSize + 1);
            }

            //Buttons

            for(let i = start; i <= end; i++){
                let li = document.createElement("li");
                li.classList = "page-item";
                
                let a = document.createElement("a");
                a.classList = "page-link";
                if(pages === i){
                    li.classList = "active";
                }
                a.appendChild(document.createTextNode(i));
                a.setAttribute("href", "index.html?page=" + i);

                li.appendChild(a);
                ul.appendChild(li);
            }


                       //Next button
const nextli = document.createElement("li");
nextli.classList = "page-item";

const nexta = document.createElement("a");
nexta.classList = "page-link";
nexta.appendChild(document.createTextNode("Next"));
nexta.style.backgroundColor = "rgb(255, 94, 0)";
nexta.setAttribute("href", "index.html?page=" + (pages + 1));

if(pages === maxp){
    nextli.classList = "disabled";
    nexta.style.cursor = "not-allowed";
}

nextli.appendChild(nexta);
ul.appendChild(nextli);

     
            //Last button
            
            const lilast = document.createElement("li");
            lilast.classList = "page-item";

            const alast = document.createElement("a");
            alast.classList = "page-link";
            alast.appendChild(document.createTextNode("Last"));
            alast.style.backgroundColor = "rgb(255, 94, 0)";
            alast.setAttribute("href", "index.html?page=" + maxp);
            if(pages === maxp){
    alast.style.textDecoration = "underline";
}

            lilast.appendChild(alast);
            ul.appendChild(lilast);


//--------------------Cards--------------------------------------------------------------------------------------------------------------------------------------------------
        for(let i = 0; i < json.results.length; i++){
            
            const name = json.results[i].name;
            const type = json.results[i].type;
            const dimension = json.results[i].dimension;
            const residents = json.results[i].residents.length;
                
            let col = document.createElement("div");
            col.classList = "col-12 col-md-4 col-lg-3 my-3";
                
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

                //Type
            let ul = document.createElement("ul");
            ul.classList = "list-group list-group-flush mt-auto";
            ul.style.border = "5px solid black";

            let li1 = document.createElement("li");
            li1.classList = "list-group-item bg-secondary text-white text-center";
            li1.textContent = `Type: ${type}`;

                //Dimension
            let li2 = document.createElement("li");
            li2.classList = "list-group-item bg-secondary text-white text-center";
            if(dimension === "unknown" || dimension.length === 0){
                li2.textContent = "Dimension: Not know!";
                li2.classList = "list-group-item bg-danger text-white text-center";
                
            }
            else{
                li2.textContent = `Dimension: ${dimension}`;
            }
            
                //Residents
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