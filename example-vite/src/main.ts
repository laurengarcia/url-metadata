import urlMetadata from 'url-metadata';

import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

(async function () {
  try {
    const url = './metadata.html'
    const metadata = await urlMetadata(url, {
      mode: 'same-origin',
      includeResponseBody: true
    });
    console.log('metdata fetched:', metadata);
  } catch(err) {
    console.log(err);
  }
})();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Check the console for metadata!
    </p>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more about them
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

