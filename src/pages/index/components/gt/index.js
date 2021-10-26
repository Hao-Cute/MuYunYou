import './gt.css';

import render from './items.art';
import { URL } from './config';
import { getData } from 'api/getData';

const layoutEl = document.querySelector('.gt .bd');
getData(URL).then(data => {
  layoutEl.innerHTML = render(data);
});