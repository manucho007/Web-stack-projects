import {
  LitElement,
  html,
} from 'https://unpkg.com/lit-element/lit-element.js?module';
import ContactsList from './ContactsList.js';
import FavoritesList from './FavoritesList.js';

export default class ContentArea extends LitElement {
  constructor() {
    super();
  }
  static get properties() {
    return {
      color: { type: String },
    };
  }

  firstUpdated() {}
  render() {
    return html`
      <style>
        #content-area {
          background: #fcfdff;
          padding: 50px 80px;
        }
      </style>
      <section id="content-area">
        <favorites-list></favorites-list>
        <contacts-list> </contacts-list>
      </section>
    `;
  }
}

//   Here goes another element

customElements.define('content-area', ContentArea);
