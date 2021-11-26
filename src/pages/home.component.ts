class HomeComponent extends HTMLElement {
  list = [
    {
      hash: "2b9b43c47d5c2901e1816dbf03857932",
      title: "Luxurious and minimalist house ( white & gold )",
    },
    {
      hash: "0a3aa20fb0a552b46d48c8fcd3ea2d3b",
      title: "Small Lordly Country House",
    },
    {
      hash: "744a561e98ac380c2b0e57bb7e1de168",
      title: "Grey bedroom : Design battle contest",
    },
    {
      hash: "8c000827d276c52739c2272a5fe1f606",
      title: "Loft bathroom : Design battle contest",
    },
    {
      hash: "e1650fb8c6e3eba2209b5a26b17352fa",
      title: "Classic bathroom: Design battle contest",
    },
    {
      hash: "8c48def9266782c903b784cfc707ff27",
      title: "The new Tiny House 2021",
    },
    {
      hash: "956790cecc5f9e99156e8b41d2b54337",
      title: "Dream bathroom: Design battle contest",
    },
  ];

  constructor() {
    super();
    this.innerHTML = this.template();
  }

  template() {
    return `
        <h2>Project list:</h2>
        <ul class="project-list">${this.list
          .map((e) => {
            return `<li><a class="project-list-item" href="#/project/${e.hash}">${e.title}</a></li>`;
          })
          .join("")}</ul>`;
  }
}

export default HomeComponent;
