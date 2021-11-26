import ProjectComponent from "./pages/project/project.component";
import HomeComponent from "./pages/home.component";
import "./style/main.css";

window.customElements.define("page-home", HomeComponent);
window.customElements.define("page-project", ProjectComponent);

const app = document.querySelector("#app");
const homePath = "#/";

const routes = [
  {
    path: homePath,
    math: (hash: string, path: string) => hash === path,
    selector: "<page-home></page-home>",
  },
  {
    path: "#/",
    math: (hash: string, path: string) => hash.search(path) !== -1,
    selector: "<page-project></page-project>",
  },
];

const locationHashChanged = async () => {
  const component = routes.find((e) => e.math(location.hash, e.path));
  if (app && component) {
    app.innerHTML = component.selector;
  } else if (!component) {
    window.location.hash = homePath;
  }
};
window.onhashchange = locationHashChanged;
locationHashChanged();
