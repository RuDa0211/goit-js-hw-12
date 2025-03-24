import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a');

export function renderImages(images, gallery) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
          <a href="${largeImageURL}" target="_blank">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p><b>Likes</b> ${likes}</p>
            <p><b>Views</b> ${views}</p>
            <p><b>Comments</b> ${comments}</p>
            <p><b>Downloads</b> ${downloads}</p>
          </div>
        </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery(gallery) {
  gallery.innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader').style.display = 'flex';
}

export function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
}
