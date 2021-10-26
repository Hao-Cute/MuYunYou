import './favAd.css';

import render from './items.art';
import { URL } from './config';
import { getData } from 'api/getData';

const layoutEl = document.querySelector('.fav-ad .center-wrap');

getData(URL).then(data => {
    layoutEl.innerHTML = render(data)
});