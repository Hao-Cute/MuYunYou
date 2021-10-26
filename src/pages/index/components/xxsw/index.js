import './xxsw.css';

import render from './items.art';
import { URL } from './config';
import { getData } from 'api/getData';

const layoutEl = document.querySelector('.xxsw .bd');
getData(URL).then(data => {
    layoutEl.innerHTML = render(data);
});