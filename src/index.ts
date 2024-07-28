const welcomeDiv = document.getElementById('welcome') as HTMLDivElement;
const artistInput = document.getElementById('artist-input') as HTMLInputElement;
const titleInput = document.getElementById('title-input') as HTMLInputElement;
const lyricOutput = document.getElementById('lyrics') as HTMLDivElement;
const searchBtn = document.getElementById('search-btn') as HTMLButtonElement;
const errorDiv = document.getElementById('error') as HTMLInputElement;
const loadingSpinner = document.getElementById('spinner') as HTMLDivElement;

type LyricsData = {
  lyrics: string;
};

// API call
const fetchLyrics = async (
  artist: string,
  title: string
): Promise<string | undefined> => {
  try {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    if (!res.ok) throw new Error('Failed to fetch lyrics');
    const data: LyricsData = await res.json();
    return data.lyrics;
  } catch (error) {
    console.error('Error fetching lyrics:', error);
  }
};

// Fetch lyrics on search
const search = async (): Promise<void> => {
  loadingSpinner.classList.remove('hide');

  const artist = artistInput.value.trim();
  const title = titleInput.value.trim();

  if (!artist || !title) {
    alert('Please enter an artist and song title.');
    loadingSpinner.classList.add('hide');
    return;
  }

  try {
    const lyrics = await fetchLyrics(artist, title);
    loadingSpinner.classList.add('hide');
    if (lyrics) {
      printLyrics(lyrics);
    } else {
      showError('Lyrics not found. Please try your search again.');
    }
  } catch (error) {
    showError('An error occurred while fetching the lyrics. Please try again.');
  } finally {
    welcomeDiv.remove();
  }
};

// Display lyrics to DOM
const printLyrics = (lyrics: string): void => {
  lyricOutput.innerHTML = '';
  errorDiv.innerHTML = '';

  lyrics.split('\n').forEach((line) => {
    // Remove the text 'Paroles de la chanson' at the beginning of the line
    if (!line.startsWith('Paroles de la chanson')) {
      const p = document.createElement('p');
      p.textContent = line;
      lyricOutput.appendChild(p);
    }
  });
};

// Display error message
const showError = (msg: string): void => {
  lyricOutput.innerHTML = '';
  errorDiv.innerHTML = '';

  const errorMsg = document.createElement('p');
  errorMsg.textContent = msg;
  errorDiv.appendChild(errorMsg);
};

searchBtn.addEventListener('click', search);
