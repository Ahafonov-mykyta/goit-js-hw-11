import { refs } from "./refs"
import Notiflix from 'notiflix';

export function createMarkup (data) {   
    
    
    if (data.hits.length === 0){
        refs.form.reset()
        refs.load.classList.add("hidenn")
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }

   
     data.hits.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>{
    let markup = `
    <div class="photo-card"> 
    <a href=${largeImageURL}> 
    <img src=${webformatURL} alt=${tags} loading="lazy" class="image"/> </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b></br>${likes }
      </p>
      <p class="info-item">
        <b>Views</b> </br>${views  }
      </p>
      <p class="info-item">
        <b>Comments</b></br> ${comments }
      </p>
      <p class="info-item">
        <b>Downloads</b>  </br> ${downloads }
      </p>
    </div>
  </div>
 `
    refs.gallery.insertAdjacentHTML("beforeEnd",markup)
   

})
}

