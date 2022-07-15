import Notiflix from 'notiflix';
import InfiniteScroll from  "infinite-scroll"

let page =1;
let searchName = "";

const refs = {
    gallery : document.querySelector(".gallery"),
    btn:document.querySelector("button[type=submit]"),
    input :document.querySelector("input"),
    form:document.querySelector(".search-form"),
    load:document.querySelector(".load-more")
}


const API_KEY = '28643311-9e0ce007077315ffa397e3b9e';



function fetchPhotos(name){
   
    return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`).then((response) => {
       return response.json()})            
}

// fetchPhotos("cat").then(data => createMarkup(data))


function createMarkup (data) {   
    
    
    if (data.hits.length === 0){
        refs.form.reset()
        refs.load.classList.add("hidenn")
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }


    data.hits.map(photo =>{
    let markup = `<div class="photo-card">
    <img src=${photo.webformatURL} alt=${photo.tags} loading="lazy" class="image"/>
    <div class="info">
      <p class="info-item">
        <b>Likes</b></br>${photo.likes }
      </p>
      <p class="info-item">
        <b>Views</b> </br>${photo.views  }
      </p>
      <p class="info-item">
        <b>Comments</b></br> ${photo.comments }
      </p>
      <p class="info-item">
        <b>Downloads</b>  </br> ${photo.downloads }
      </p>
    </div>
  </div>`
    refs.gallery.insertAdjacentHTML("beforeEnd",markup)

})
}




const  onSubmit = (event) =>{
 event.preventDefault();
 page=1;
 refs.gallery.innerHTML="";
  searchName = refs.input.value;
  refs.load.classList.remove("hidenn")
 fetchPhotos(searchName)
 .then(data => { 
    if (data.hits.length === 0){
        refs.form.reset()
        refs.load.classList.add(" hidenn")
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    } createMarkup(data); console.log(data)}).catch( error => console.log(error) );

 console.log(searchName);
return searchName;

}

refs.form.addEventListener("submit", onSubmit )


const loadMore = (event) => {
    page++;
    fetchPhotos(searchName)
    .then(data => {
        if (data.hits.length === 0){
        refs.load.classList.add("hidenn")
        return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.") } ;
        createMarkup(data)}).catch( error => console.log(error) );
}

refs.load.addEventListener("click", loadMore)


