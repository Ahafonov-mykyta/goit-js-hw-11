import { page } from "../src/index";
const API_KEY = '28643311-9e0ce007077315ffa397e3b9e';


export async function fetchPhotos (name){
    
    const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
    const photos = response.json();
    return photos ; 
              
}

