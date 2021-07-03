import './sass/main.scss';
import imagesCardTpl from './templates/photo-card.hbs';
// import countriesList from './templates/countries-list.hbs'
import API from './js/get-images';
import getRefs from './js/get-refs';
// import { error } from '@pnotify/core';

var debounce = require('lodash.debounce');

const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, 500),)

function onSearch() {
    // API.fetchImages(refs.input.value)
        API.fetchImages('белка')
            .then(r => {
                // console.log(r);
                    renderPhotoCard(r)  
            })
          
}


function renderPhotoCard(images){
    const markup = imagesCardTpl(images);
    refs.gallery.innerHTML = markup;   
};



