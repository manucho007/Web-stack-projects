import {
  LitElement,
  html,
} from 'https://unpkg.com/lit-element/lit-element.js?module';

export default class SideMenu extends LitElement {
  constructor() {
    super();
  }
  static get properties() {
    return {
      color: { type: String },
      togglePopup: Function,
    };
  }

  firstUpdated() {}
  render() {
    return html`
      <style>
        @import '/css/global.css';
        #side-menu {
          background: #323759;
          height: 100vh;
          padding: 50px 25px;
        }
        #side-menu nav a {
          color: #ccced7;
          text-decoration: none;
          text-transform: capitalize;
          display: block;
          padding: 10px 10px 10px 0;
        }
        .title {
          font-weight: 700;
          color: #ccced7;
          margin: 1rem 0;
        }
        #side-menu nav a span.icon {
          padding: 10px;
        }
        .logo img {
          width: 50px;
        }
        .logo {
          text-align: center;
        }
      </style>
      <section id="side-menu">
        <div class="logo">
          <img
            src="https://www.freelogoservices.com/blog/wp-content/uploads/transparent-logo.jpg"
          />
        </div>
        <div class="menu">
          <div class="title">Contacts</div>
          <nav>
            <a href="#" @click="${this.togglePopup}"
              ><span class="icon"> + </span> Add contact</a
            >
          </nav>
        </div>
      </section>
    `;
  }
}

//   Here goes another element

customElements.define('side-menu', SideMenu);
