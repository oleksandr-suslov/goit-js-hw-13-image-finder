// import error from './error';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '22309735-f1ff37d55971be81fb077216b';
let page = 1;

//pixabay.com/api/?key=22309735-f1ff37d55971be81fb077216b&q=yellow+flowers&image_type=photo
//pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ



function fetchImages(images) {
    // return fetch(`${BASE_URL}?key=${KEY}&q=${images}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`)
    return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${images}&page=${page}&per_page=12&key=${KEY}`)
    .then(response => { if (response.ok) 
        return response.json();
   response.text();

        return error();
    }
    );
};

export default { fetchImages };