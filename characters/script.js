const usp = new URLSearchParams(window.location.search);
const pages = Number(usp.get("page")) || 1;

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://rickandmortyapi.com/api/character?page=" + pages);

xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        const json = JSON.parse(xhr.responseText);

        //--------------------------------------------------Pages--------------------------------------------------------------------------------------------------------------
            
        const ul =  document.getElementById("pagination");
        ul.classList ="pagination justify-content-center mt-2 col-12";

        const maxp = Number(json.info.pages);


            //First button
        const lifirst = document.createElement("li");
        lifirst.classList = "page-item";
        
        const afirst = document.createElement("a");
        afirst.classList = "page-link"
        afirst.style.backgroundColor = "rgb(255, 94, 0)";
        afirst.style.color = "black";
        afirst.appendChild(document.createTextNode("First"));
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
            aback.classList ="page-link";
            aback.style.backgroundColor = "rgb(255, 94, 0)";
            aback.style.color = "black";
            aback.appendChild(document.createTextNode("back"));
            aback.setAttribute("href", "index.html?page=" + (pages - 1));
            if(pages === 1){
                if (pages === 1) {
                    aback.classList.add("inactive");
                     aback.style.backgroundColor = "rgba(255,165,0,0.4)";
                     aback.style.color = "white";
                     aback.style.cursor = "not-allowed";
                    }
                     else {
                        aback.classList.remove("inactive");
                        aback.style.backgroundColor = "rgba(255,165,0,1)";
                        } 
                    }

            liback.appendChild(aback);
            ul.appendChild(liback);






                //Always 5 button and the active button on middle

                
                const WindowSize = 3;

                let start = pages - Math.floor(WindowSize / 2);
                let end = pages + Math.floor(WindowSize / 2);

                if(start < 1){
                    start = 1;
                    end = WindowSize;
                }
                if(end > maxp){
                    end = maxp;
                    start = Math.max(1, maxp - WindowSize + 1);
                }




                    //Buttons
        for(let i = start; i <= end; i++){

            let li = document.createElement("li");
            li.classList = "page-item ";

            let a = document.createElement("a");
            a.classList = "page-link";
            a.style.backgroundColor = "rgb(255, 165, 0)";
            a.style.color ="black";
            a.appendChild(document.createTextNode(i));
            a.setAttribute("href", "index.html?page=" + i);

            if(pages === i){
                li.classList = "active";
                li.style.textDecoration = "underline";
                li.style.color = "white";
                a.style.color ="white";
                a.style.backgroundColor = "rgb(255, 51, 0)";
            }

                li.appendChild(a);
                ul.appendChild(li);
        };



         //Next button

        const linext = document.createElement("li");
        linext.classList ="page-item";

        const anext = document.createElement("a");
        anext.classList ="page-link"
        anext.appendChild(document.createTextNode("Next"));
         anext.style.backgroundColor = "rgb(255, 94, 0)";
        anext.style.color = "black";
        anext.setAttribute("href", "index.html?page="+(pages + 1));
        if(pages === maxp){
                if (pages === maxp) {
                    anext.classList.add("inactive");
                     anext.style.backgroundColor = "rgba(255,165,0,0.4)";
                     anext.style.color = "white";
                     anext.style.cursor = "not-allowed";
                    }
                     else {
                        anext.classList.remove("inactive");
                        anext.style.backgroundColor = "rgba(255,165,0,1)";
                        } 
                    }
        linext.appendChild(anext);
        ul.appendChild(linext);



                //Last button
        const lilast = document.createElement("li");
        lilast.classList = "page-item";

        const alast = document.createElement("a");
        alast.classList = "page-link";
         alast.style.backgroundColor = "rgb(255, 94, 0)";
         alast.style.color = "black";
        alast.appendChild(document.createTextNode("Last"));
        alast.setAttribute("href", "index.html?page=" + maxp);

         if(pages === maxp){
            alast.style.textDecoration = "underline";
        }

        lilast.appendChild(alast);
        ul.appendChild(lilast);
        

        
        





        

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