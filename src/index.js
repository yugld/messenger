// src/index.js

import {sum} from './modules/sum';

const root = document.querySelector('id');
root.textContent = sum(6, -1).toString();