const usp = new URLSearchParams(window.location.search);
const pages = Number(usp.get("page")) || 1;

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://rickandmortyapi.com/api/episode/?page=" + pages);

xhr.onreadystatechange  = () =>{
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

//-------------------------------Pages------------------------------------------------------------------------------------------------------------------------------------

const ul = document.getElementById("pagination");
ul.classList = "pagination d-flex justify-content-center mt-2";
const maxp = Number(json.info.pages);


            //always 3 button and the active button on the middle

            const windowSize = 3;

            let start = pages - Math.floor(windowSize / 1);
            let end = pages + Math.floor(windowSize / 1);

            if(start < 1){
                start = 1;
                end = windowSize;
            }
            if(end > maxp){
                end = maxp;
                start = Math.max(1, maxp-windowSize + 1);
            }
//----------------------------------Cards----------------------------------------------------------------------------------------------------------------------------------

            for(let i = start; i < end; i++){
                let li = document.createElement("li");
                li.classList = "page-item";

                let a = document.createElement("a");
                a.classList = "page-link";
                a.style.backgroundColor = "rgb(255, 165, 0)";
                a.style.color = "black";
                a.appendChild(document.createTextNode(i));
                a.setAttribute("href", "index.html?page=" + i);
                a.addEventListener("mouseover", function(){
                    this.style.backgroundColor = "red";
                    this.style.color = "white";
                })
                // Fixes hover color bug when switching pages
                a.addEventListener("mouseout", function(){
                    if(li.classList.contains("active")){
                             this.style.backgroundColor = "rgb(255, 51, 0)";
                    this.style.color = "white";
                    }
                    else{
                        this.style.backgroundColor = "rgb(255, 165, 0)";
                        this.style.color = "black";
                    }
                   
                })
                if(pages === i){
                    li.classList.add("active");
                    a.style.backgroundColor = "rgb(255, 51, 0)";
                    a.style.color = "white";
                    a.style.textDecoration = "underline";
                }
                li.appendChild(a);
                ul.appendChild(li);
            }


//--------------------------------Cards----------------------------------------------------------------------------------------------------

        for(let i = 0; i < json.results.length; i++){

            let title = json.results[i].name;
            let airdate = json.results[i].air_date;
            let episode = json.results[i].episode;
            let characters = json.results[i].characters.length;

            let col = document.createElement("div");
            col.classList = "col-12 col-md-4 col-lg-3 my-2";

            let card = document.createElement("div");
            card.classList ="card h-100 bg-dark";
            card.style.border = "2px solid white";

            let cardbody = document.createElement("div");
            cardbody.classList = "card-body";

            let ul = document.createElement("ul");
            ul.classList = "list-group";

                //Episode
            let li1 = document.createElement("li");
            li1.classList = "list-group-item text-center";

            let h3 = document.createElement("h3");
            h3.textContent = episode;

            var epNum = parseInt(episode.slice(1,3));
            if(epNum % 2 === 0){
                li1.classList.add("bg-danger");
                card.addEventListener("mouseover", function(){
                this.style.transform = "scale(1.06)";
                this.style.boxShadow = "3px 8px 15px rgba(146, 21, 4, 0.57)";
                this.style.transition = "0.3s ease";
            })
            card.addEventListener("mouseout", function(){
                this.style.transform = "scale(1)";
                this.style.boxShadow = "none";
                this.style.transition = "none";
            })
            }
            else{
                li1.classList.add("bg-success");
                card.addEventListener("mouseover", function(){
                this.style.transform = "scale(1.06)";
                this.style.boxShadow = "3px 8px 15px rgba(11, 133, 21, 0.8)";
                this.style.transition = "0.3s ease";
            })
            card.addEventListener("mouseout", function(){
                this.style.transform = "scale(1)";
                this.style.boxShadow = "none";
                this.style.transition = "none";
            })
            }
          
            

            li1.appendChild(h3);

            //Title
            let li2 = document.createElement("li");
            li2.classList = "list-group-item text-center fw-bold bg-secondary text-white";
            li2.textContent = title;

            //Air date
            let li3 = document.createElement("li");
            li3.classList = "list-group-item text-center bg-secondary text-white";
            li3.textContent = `Air date: ${airdate}`;

            //Episode
            let li4 = document.createElement("li");
            li4.classList = "list-group-item text-center bg-secondary text-white";
            li4.textContent = `Characters: ${characters}`;

            ul.appendChild(li1);
            ul.appendChild(li2);
            ul.appendChild(li3);
            ul.appendChild(li4);

            cardbody.appendChild(ul);
            card.appendChild(cardbody);
            col.appendChild(card);

            document.getElementById("episodesrow").appendChild(col);

         


        }
    }
};
xhr.send(null); 

