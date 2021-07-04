import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '22309735-f1ff37d55971be81fb077216b';

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
            const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;
        return fetch(url)
            .then(response => { 
                    return response.json();
                }
            )
            .then(data => { 
                if (data.total !== 0) {
                   return  data.hits;
                } else { error({text: 'Photo cannot be found!'})};
            });
    }
    incrementPage(){
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery; 
    }

}