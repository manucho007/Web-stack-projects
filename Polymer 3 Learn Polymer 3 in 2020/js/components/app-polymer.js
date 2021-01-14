import {
  LitElement,
  html,
} from 'https://unpkg.com/lit-element/lit-element.js?module';
import SideMenu from './SideMenu.js';
import ContentArea from './ContentArea.js';

class CounterComp extends LitElement {
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
        .main-page {
          display: grid;
          grid-template-columns: 250px 1fr;
        }
      </style>

      <div class="main-page">
        <side-menu></side-menu>
        <content-area></content-area>
      </div>
    `;
  }
}

//   Here goes another element

customElements.define('app-polymer', CounterComp);
