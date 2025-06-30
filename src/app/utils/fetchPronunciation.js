const axios = require('axios');

async function fetchPronunciation(word) {
    try {
        const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
        const data = res.data[0];
        const phonetic = data.phonetic || (data.phonetics.find(p => p.text) || {}).text || '';
        const audioObj = data.phonetics.find(p => p.audio && p.audio.trim() !== '');
        const audio = audioObj ? audioObj.audio : '';
        return { phonetic, audio };
    } catch (error) {
        console.warn(`Không tìm thấy phiên âm/audio cho từ "${word}"`);
        return { phonetic: '', audio: '' };
    }
}

module.exports = fetchPronunciation;
