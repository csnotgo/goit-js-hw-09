// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector('.gallery');
function createMarkup(items) {
  return items
    .map(
      item => `
  <a class="gallery__item" href="${item.original}">
  <img class="gallery__image" src="${item.preview}" alt="${item.description}" width="800" height="600"/>
</a>
`
    )
    .join('');
}
const addMarkup = createMarkup(galleryItems);
gallery.innerHTML = addMarkup;

gallery.addEventListener('click', onGalleryShow);

function onGalleryShow(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const newGallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
  });
}
