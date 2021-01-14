import {
  LitElement,
  html,
} from 'https://unpkg.com/lit-element/lit-element.js?module';

export default class FavoritesList extends LitElement {
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
        .favorites {
          max-width: 800px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 20px;
        }
        h2 {
          color: #3e4162;
          font-weight: 300;
          grid-column: 1/4;
        }
        .card {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          color: #3d4060;
          border-radius: 10px;
          transition: all 0.4s ease-in-out;
          cursor: pointer;
          padding: 15px 0 0;
          -webkit-box-shadow: 0px 4px 5px 0px rgba(153, 153, 153, 0.15);
          -moz-box-shadow: 0px 4px 5px 0px rgba(153, 153, 153, 0.15);
          box-shadow: 0px 4px 5px 0px rgba(153, 153, 153, 0.15);
        }
        .card .user-img {
          background-image: url('https://uifaces.co/our-content/donated/NY9hnAbp.jpg');
          height: 80px;
          width: 80px;
          background-size: cover;
          background-position: center center;
          border-radius: 50%;
          align-self: center;
          justify-self: center;
          grid-column: 1/3;
        }
        .card:hover {
          -webkit-box-shadow: 0px 4px 5px 0px rgba(153, 153, 153, 0.15);
          -moz-box-shadow: 0px 4px 5px 0px rgba(153, 153, 153, 0.15);
          box-shadow: 0px 4px 5px 0px rgba(153, 153, 153, 0.15);
        }
        .card .fullname {
          color: #3d4060;
          font-weight: 700;
          text-transform: capitalize;
          grid-column: 1/3;
          padding: 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        .text {
          display: block;
          text-align: center;
        }
        .number {
          font-weight: 500;
          grid-column: 1/3;
          padding: 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        .category {
          /* grid-column: 1/3; */
          border-left: 1px solid rgba(0, 0, 0, 0.1);
        }
        .category .fullname .user-img .state .number {
          font-size: 1.5rem;
          font-weight: 500;
          padding: 15px;
        }
        .sub {
          display: block;
          color: #b4b5c4;
          font-weight: 300;
          font-size: 0.8rem;
          text-align: center;
          margin: 5px 0;
        }
      </style>
      <section class="favorites">
        <h2>Favorites</h2>
        <div class="card">
          <div class="user-img"></div>
          <div class="fullname">
            <span class="text">Manuel Rodriguez</span>
            <span class="sub">Full Name</span>
          </div>
          <div class="number">
            <span class="text">+79656052283</span>
            <span class="sub">Phone number</span>
          </div>
          <div class="state">
            <span class="text">Kazan</span>
            <span class="sub">City</span>
          </div>
          <div class="category">
            <span class="text">Family</span>
            <span class="sub">Category</span>
          </div>
        </div>
        <div class="card">
          <div class="user-img"></div>
          <div class="fullname">
            <span class="text">Manuel Rodriguez</span>
            <span class="sub">Full Name</span>
          </div>
          <div class="number">
            <span class="text">+79656052283</span>
            <span class="sub">Phone number</span>
          </div>
          <div class="state">
            <span class="text">Kazan</span>
            <span class="sub">City</span>
          </div>
          <div class="category">
            <span class="text">Family</span>
            <span class="sub">Category</span>
          </div>
        </div>
        <div class="card">
          <div class="user-img"></div>
          <div class="fullname">
            <span class="text">Manuel Rodriguez</span>
            <span class="sub">Full Name</span>
          </div>
          <div class="number">
            <span class="text">+79656052283</span>
            <span class="sub">Phone number</span>
          </div>
          <div class="state">
            <span class="text">Kazan</span>
            <span class="sub">City</span>
          </div>
          <div class="category">
            <span class="text">Family</span>
            <span class="sub">Category</span>
          </div>
        </div>
      </section>
    `;
  }
}

//   Here goes another element

customElements.define('favorites-list', FavoritesList);
