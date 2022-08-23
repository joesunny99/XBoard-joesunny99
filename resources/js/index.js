


async function fetchNews(news) {
    try{
        let url = "https://api.rss2json.com/v1/api.json?rss_url="+news;
        //console.log(url);
        let res = await fetch(url);
        return await res.json();
        }catch(err){
          return null;
        }
}


function addAccordian(index, mag) {
    //console.log(index, mag.feed.title, mag.items);
    let parent = document.getElementById("accordionExample");
    let accordianChild = document.createElement("div");
    accordianChild.setAttribute("class", "accordion-item");
    accordianChild.innerHTML = `
            <h2 class="accordion-header" id="${"heading" + index}">
            <button class="accordion-button ${index === 0? "":"collapsed" }" type="button" data-bs-toggle="collapse" data-bs-target="${"#collapse" + index}" aria-expanded="${index === 0? "true":"false" }" aria-controls="collapseOne">
                ${mag.feed.title}
            </button>
            </h2>
            <div id="${"collapse" + index}" class="accordion-collapse collapse ${index === 0? "show":"" }" aria-labelledby="${"heading" + index}" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <div id= "${"carouselExampleControls"+index}" class="carousel slide" data-bs-ride="carousel"> 
                        <div class="carousel-inner" id ="${"car"+index}">
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="${"#carouselExampleControls"+index}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="${"#carouselExampleControls"+index}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>                    
                    </div>
                </div>
            </div>  
    `
    
    parent.append(accordianChild);
    let b = "car"+index;
    let carouselItems = document.getElementById(b);
    //console.log(carouselItems);
    
    addCarousel(carouselItems, mag.items, mag.feed.title);
    
}

function addCarousel(parent, items, title) {
    console.log(parent, items, title);
    items.forEach((x,idx) => {
        let child = document.createElement("div");
        if (idx === 0){
            child.className = "carousel-item active";
        }else{
            child.className = "carousel-item";
        }
        child.innerHTML = `
         <a href = "${x.link}" target="_blank">   
            <div class="image-holder">
                <img
                src="${x.enclosure.link}"
                class="d-block w-90"
                alt="..."
                />
            </div>
            <h3>${x.title}</h3>
            <div>
                <span>${x.author}</span>
                <span class="dot"></span>
                <span>${x.pubDate.substr(0,10)}</span>
            </div>
            <p>
                ${x.content}
            </p> 
        </a>      
        `
        parent.append(child);
    })

}

