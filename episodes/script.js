const usp = new URLSearchParams(window.location.search);
const pages = Number(usp.get("page")) || 1;

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://rickandmortyapi.com/api/episode/?page=" + pages);

xhr.onreadystatechange  = () =>{
    if(xhr.readyState == 4 && xhr.status == 200){
        const json = JSON.parse(xhr.responseText);

//-------------------------------Pages-------------------------------------------------------------------------------------------------

const ul = document.getElementById("pagination");
const maxp = Number(json.info.pages);

            //First
            const firstli = document.createElement("li");
            firstli.classList = "page-item";

            const firsta = document.createElement("a");
            firsta.classList = "page-link";
            firsta.textContent = "First";
            firsta.setAttribute("href", "index.html?page=1");

            firstli.appendChild(firsta);
            ul.appendChild(firstli);

            //Next
            const nextli = document.createElement("li");
            nextli.classList = "page-item";

            const nexta = document.createElement("a");
            nexta.classList ="page-link";
            nexta.textContent = "Next";
            nexta.setAttribute("href", "index.html?page= " + (pages + 1));

            nextli.appendChild(nexta);
            ul.appendChild(nextli);

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

            for(let i = start; i < end; i++){
                let li = document.createElement("li");
                li.classList = "page-item";

                let a = document.createElement("a");
                a.classList = "page-link";
                a.appendChild(document.createTextNode(i));
                a.setAttribute("href", "index.html?page=" + pages);
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
            card.classList ="card h-100";

            let cardbody = document.createElement("div");
            cardbody.classList = "card-body";

            let ul = document.createElement("ul");
            ul.classList = "list-group";

                //Episode
            let li1 = document.createElement("li");
            li1.classList = "list-group-item text-center";

            let h3 = document.createElement("h3");
            h3.textContent = episode;
            

            li1.appendChild(h3);

            //Title
            let li2 = document.createElement("li");
            li2.classList = "list-group-item text-center fw-bold";
            li2.textContent = title;

            //Air date
            let li3 = document.createElement("li");
            li3.classList = "list-group-item text-center";
            li3.textContent = `Air date: ${airdate}`;

            //Episode
            let li4 = document.createElement("li");
            li4.classList = "list-group-item text-center";
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

