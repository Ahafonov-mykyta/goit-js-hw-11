import Notiflix from 'notiflix';
import "simplelightbox/dist/simple-lightbox.min.css";
import InfiniteScroll from  "infinite-scroll"
import SimpleLightbox from "simplelightbox";





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



async function fetchPhotos(name){
   
     const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
     const photos = response.json();
     
     return photos ; 
               
}



function createMarkup (data) {   
    
    
    if (data.hits.length === 0){
        refs.form.reset()
        refs.load.classList.add("hidenn")
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }

   
    data.hits.map(photo =>{
    let markup = `
    <div class="photo-card"> 
    <a href=${photo.largeImageURL}> 
    <img src=${photo.webformatURL} alt=${photo.tags} loading="lazy" class="image"/> </a>
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
  </div>
 `
    refs.gallery.insertAdjacentHTML("beforeEnd",markup)
   

})
}



var lightbox;
const  onSubmit = (event) =>{
 event.preventDefault();
 page=1;
 refs.gallery.innerHTML="";
  searchName = refs.input.value;
  
 fetchPhotos(searchName)
 .then(data => { 
    if (data.hits.length === 0){
        refs.form.reset()
        refs.load.classList.add("hidenn")
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }  createMarkup(data); console.log(data);Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`)
    refs.load.classList.remove("hidenn");lightbox = new SimpleLightbox('.gallery a', { enableKeyboard:	true});}).catch( error => console.log(error) );

 console.log(searchName);
return searchName;

}

refs.form.addEventListener("submit", onSubmit )


const loadMore = (event) => {
    page++;
    fetchPhotos(searchName)
    .then(data => {
        if (data.hits.length === 0 || page > 12){
        refs.load.classList.add("hidenn")
        return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.") } ;
        createMarkup(data);scroll();lightbox.refresh()}).catch( error => console.log(error) );
}

refs.load.addEventListener("click", loadMore)

function scroll(){
const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}

