"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const welcomeDiv = document.getElementById('welcome');
const artistInput = document.getElementById('artist-input');
const titleInput = document.getElementById('title-input');
const lyricOutput = document.getElementById('lyrics');
const searchBtn = document.getElementById('search-btn');
const errorDiv = document.getElementById('error');
const loadingSpinner = document.getElementById('spinner');
// API call
const fetchLyrics = (artist, title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        if (!res.ok)
            throw new Error('Failed to fetch lyrics');
        const data = yield res.json();
        return data.lyrics;
    }
    catch (error) {
        console.error('Error fetching lyrics:', error);
    }
});
// Fetch lyrics on search
const search = () => __awaiter(void 0, void 0, void 0, function* () {
    loadingSpinner.classList.remove('hide');
    const artist = artistInput.value.trim();
    const title = titleInput.value.trim();
    if (!artist || !title) {
        alert('Please enter an artist and song title.');
        loadingSpinner.classList.add('hide');
        return;
    }
    try {
        const lyrics = yield fetchLyrics(artist, title);
        loadingSpinner.classList.add('hide');
        if (lyrics) {
            printLyrics(lyrics);
        }
        else {
            showError('Lyrics not found. Please try your search again.');
        }
    }
    catch (error) {
        showError('An error occurred while fetching the lyrics. Please try again.');
    }
    finally {
        artistInput.value = '';
        titleInput.value = '';
        welcomeDiv.remove();
    }
});
// Display lyrics to DOM
const printLyrics = (lyrics) => {
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
const showError = (msg) => {
    lyricOutput.innerHTML = '';
    errorDiv.innerHTML = '';
    const errorMsg = document.createElement('p');
    errorMsg.textContent = msg;
    errorDiv.appendChild(errorMsg);
};
searchBtn.addEventListener('click', search);
