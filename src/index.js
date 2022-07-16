import Notiflix from 'notiflix';
import "simplelightbox/dist/simple-lightbox.min.css";
import InfiniteScroll from  "infinite-scroll"
import SimpleLightbox from "simplelightbox";
import {fetchPhotos}  from "../js/fetchPhotos"
import { refs } from '../js/refs';
import { createMarkup } from '../js/createMarkup';
import { scroll } from '../js/scroll';


export let page =1;
let searchName = "";
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
    }  
    if (data.hits.length < 40){

      createMarkup(data);
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`)
      lightbox = new SimpleLightbox('.gallery a', { enableKeyboard:	true});
      return refs.load.classList.add("hidenn")
    }
    createMarkup(data);
    console.log(data)
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`)
    refs.load.classList.remove("hidenn");
    lightbox = new SimpleLightbox('.gallery a', { enableKeyboard:	true});
  })
  .catch( error => console.log(error) ); 

return searchName;
}

const loadMore = (event) => {
    page++;
    fetchPhotos(searchName)
    .then(data => {
      console.log(data)
        if (data.hits.length < 40|| page > 12){
        refs.load.classList.add("hidenn")
         Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
       } ;
        createMarkup(data);
        scroll(); 
        lightbox.refresh()}
        )
        .catch( error => console.log(error) );
}


refs.form.addEventListener("submit", onSubmit )
refs.load.addEventListener("click", loadMore)


