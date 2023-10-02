import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const breedContainer = document.querySelector('.breed-select');
const textLoader = document.querySelector('.loader');
const textError = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

textLoader.style.display = 'none';
textError.style.display = 'none';

function breedSelected() {
  fetchBreeds()
    .then(breeds => {
      const breedOptions = breeds.map(breed => {
        const breedOption = document.createElement('option');
        breedOption.value = breed.id;
        breedOption.text = breed.name;
        return breedOption;
      });
      breedContainer.append(...breedOptions);
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

breedSelected();

function breedSelectedById(breedId) {
  breedContainer.style.display = 'none';
  textLoader.style.display = 'block';
  catInfo.style.display = 'none';

  fetchCatByBreed(breedId)
    .then(data => {
      const [breed] = data;
      const catsDescr = breed.breeds[0];
      console.log(breed.breeds[0]);
      catInfo.innerHTML = `
      <img src="${breed.url}" alt="${catsDescr.name}"/>
    <h2>${catsDescr.name}</h2>
    <p>${catsDescr.description}</p>
    <p><strong>Tempetament: </strong>${catsDescr.temperament}</p>
    
    `;
      catInfo.style.display = 'block';
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      catInfo.style.display = 'none';
    })
    .finally(() => {
      textLoader.style.display = 'none';
      textError.style.display = 'none';
      breedContainer.style.display = 'block';
    });
}

breedContainer.addEventListener('change', () => {
  const breedId = breedContainer.value;
  breedSelectedById(breedId);
});
