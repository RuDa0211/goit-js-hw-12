import { fetchImages } from './js/pixabay-api';
import {
  renderImages,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;
const perPage = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = event.target.elements['search-text'].value.trim();
  if (!query) {
    iziToast.warning({ title: 'Warning', message: 'Enter a search query!' });
    return;
  }

  clearGallery(gallery);
  loadMoreBtn.style.display = 'none';
  showLoader();

  try {
    page = 1;
    const { images, totalHits: fetchedTotalHits } = await fetchImages(
      query,
      page
    );
    totalHits = fetchedTotalHits;
    renderImages(images, gallery);

    if (images.length >= perPage) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const { images } = await fetchImages(query, page);
    renderImages(images, gallery, true);

    const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (images.length < perPage || page * perPage >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoader();
  }
});
