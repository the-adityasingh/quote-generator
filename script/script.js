const card = document.querySelector('.card');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const twitterBtn = document.querySelector('.twitter');
const newBtn = document.querySelector('.new');
const loader = document.querySelector('.loader');

function loadingInProgress() {
    loader.hidden = false;
    card.hidden = true;
}

function loadingComplete() {
    if(!loader.hidden) {
        loader.hidden = true;
        card.hidden = false;
    }
}

async function getQuote() {
    
    loadingInProgress();

    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        if(data.quoteAuthor === '') {
            author.innerText = 'Unknown';
        }
        else {
            author.innerText = data.quoteAuthor;            
        }

        quote.innerText = data.quoteText;

        loadingComplete();
    }
    catch(error) {
        getQuote();
        console.log('An error occured!', error);
    }
}

function tweetQuote() {
    const quoteText = quote.innerText;
    const authorText = author.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorText}`;

    window.open(twitterUrl, '_blank');
}

newBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();