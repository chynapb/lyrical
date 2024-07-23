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
const artistOutput = document.getElementById('artist');
const titleOutput = document.getElementById('title');
const lyricOutput = document.getElementById('lyrics');
const searchBtn = document.getElementById('search-btn');
const errorDiv = document.getElementById('error');
// API call
const fetchLyrics = (artist, title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        const data = yield res.json();
        return data.lyrics;
    }
    catch (error) {
        console.log(error);
    }
});
// Fetch lyrics on search
const search = () => __awaiter(void 0, void 0, void 0, function* () {
    const artist = artistInput.value;
    const title = titleInput.value;
    if (!artist && !title) {
        alert('Please enter an artist and song title.');
        return;
    }
    try {
        const lyrics = yield fetchLyrics(artist, title);
        printLyrics(lyrics);
    }
    catch (error) {
        errorDiv.innerHTML = '';
        lyricOutput.innerHTML = '';
        showError('Lyrics not found. Please try your search again.');
    }
    artistInput.value = '';
    titleInput.value = '';
    welcomeDiv.classList.add('hide');
});
// Display lyrics to DOM
const printLyrics = (lyrics) => {
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
const showError = (msg) => {
    const errorMsg = document.createElement('p');
    errorMsg.innerHTML = msg;
    errorDiv.appendChild(errorMsg);
};
searchBtn.addEventListener('click', search);
