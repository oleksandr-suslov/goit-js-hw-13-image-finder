import './sass/main.scss';
import imagesCardTpl from './templates/photo-card.hbs';
import ImageApiService from './js/api-service';
import getRefs from './js/get-refs';
import { onOpenModal } from './js/modal';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

var debounce = require('lodash.debounce');

const refs = getRefs();
const imagesApiService = new ImageApiService();

refs.gallery.addEventListener('click', onOpenModal);
refs.searchInput.addEventListener('input', debounce(onSearch, 1000));

function onSearch(e) {
     e.preventDefault();

    imagesApiService.query = e.target.value;
    
    if (imagesApiService.query === '') {
        return error({ text: 'Enter the word' })
    }
    
    imagesApiService.resetPage();
    clearHits();
    imagesApiService.fetchImages()
    .then(hits => {
        renderPhotoCard(hits); imagesApiService.incrementPage();
        }
    );
};

function renderPhotoCard(hits){
    refs.gallery.insertAdjacentHTML('beforeend', imagesCardTpl(hits));  
};

function clearHits(){
    refs.gallery.innerHTML = '';
}

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && imagesApiService.query !== '') {
            imagesApiService.fetchImages()
        .then(hits => {
        renderPhotoCard(hits); imagesApiService.incrementPage();
        });
        }
    });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '300px',
});
observer.observe(refs.scroll);