const artistInput = document.getElementById('artist-input') as HTMLInputElement;
const titleInput = document.getElementById('title-input') as HTMLInputElement;
const artistOutput = document.getElementById('artist') as HTMLDivElement;
const titleOutput = document.getElementById('title') as HTMLDivElement;
const lyricOutput = document.getElementById('lyrics') as HTMLDivElement;
const searchBtn = document.getElementById('search-btn') as HTMLButtonElement;

// API call to fetch lyrics
const fetchLyrics = async (artist: string, title: string) => {
  try {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await res.json();

    if (data.error) {
      console.log('Lyrics not found. Please try your search again.');
      return;
    }

    return data.lyrics;
  } catch (error) {
    console.log(error);
    return;
  }
};

// Fetch lyrics on search
const search = async () => {
  const artist = artistInput.value;
  const title = titleInput.value;

  if (!artist && !title) {
    alert('Please enter an artist and song title.');
    return;
  }

  try {
    const lyrics = await fetchLyrics(artist, title);
    printLyrics(lyrics);

    artistInput.value = '';
    titleInput.value = '';
  } catch (error) {
    console.log(error);
  }
};

// Display lyrics to DOM
const printLyrics = (lyrics: string) => {
  if (lyrics.length > 0) {
    lyricOutput.innerHTML = '';

    lyrics.split('\n').forEach((line) => {
      if (!line.startsWith('Paroles de la chanson')) {
        const p = document.createElement('p');
        p.textContent = line;
        lyricOutput.appendChild(p);
      }
    });
  }
};

searchBtn.addEventListener('click', search);
