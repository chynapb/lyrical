const welcomeDiv = document.getElementById('welcome') as HTMLDivElement;
const artistInput = document.getElementById('artist-input') as HTMLInputElement;
const titleInput = document.getElementById('title-input') as HTMLInputElement;
const artistOutput = document.getElementById('artist') as HTMLDivElement;
const titleOutput = document.getElementById('title') as HTMLDivElement;
const lyricOutput = document.getElementById('lyrics') as HTMLDivElement;
const searchBtn = document.getElementById('search-btn') as HTMLButtonElement;
const errorDiv = document.getElementById('error') as HTMLInputElement;
const loadingSpinner = document.getElementById('spinner') as HTMLDivElement;

// API call
const fetchLyrics = async (artist: string, title: string) => {
  try {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await res.json();

    return data.lyrics;
  } catch (error) {
    console.log(error);
  }
};

// Fetch lyrics on search
const search = async () => {
  loadingSpinner.classList.remove('hide');

  const artist = artistInput.value;
  const title = titleInput.value;

  if (!artist && !title) {
    alert('Please enter an artist and song title.');
    return;
  }

  try {
    const lyrics = await fetchLyrics(artist, title);
    loadingSpinner.classList.add('hide');
    printLyrics(lyrics);
  } catch (error) {
    errorDiv.innerHTML = '';
    lyricOutput.innerHTML = '';
    showError('Lyrics not found. Please try your search again.');
  }

  artistInput.value = '';
  titleInput.value = '';
  welcomeDiv.classList.add('hide');
};

// Display lyrics to DOM
const printLyrics = (lyrics: string) => {
  if (lyrics.length > 0) {
    errorDiv.innerHTML = '';

    lyrics.split('\n').forEach((line) => {
      if (!line.startsWith('Paroles de la chanson')) {
        const p = document.createElement('p');
        p.textContent = line;
        lyricOutput.appendChild(p);
      }
    });
  }
};

// Display error message
const showError = (msg: string) => {
  const errorMsg = document.createElement('p');
  errorMsg.innerHTML = msg;

  errorDiv.appendChild(errorMsg);
};

searchBtn.addEventListener('click', search);
