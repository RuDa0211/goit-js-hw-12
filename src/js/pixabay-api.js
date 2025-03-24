import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49423547-3925a10a81c3177a913fbde2f';
const PER_PAGE = 15; // Количество изображений на странице

export async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: PER_PAGE,
        page,
        safesearch: true,
      },
    });

    if (response.data.hits.length === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }

    return { images: response.data.hits, totalHits: response.data.totalHits };
  } catch (error) {
    throw new Error(error.message);
  }
}
