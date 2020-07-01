const obj = {
  data: {
    profile: {
      uuid: 'd191d308-9c29-486a-ab7d-35afd78c1b41',
    },
    products: [],
  },
  getProducts() {
    const vm = this;
    const url = `https://course-ec-api.hexschool.io/api/${this.data.profile.uuid}/ec/products`;

    axios.get(url)
      .then(function (response) {
        vm.data.products = response.data.data;
        vm.render();
      })
  },
  render() {
    const app = document.getElementById('app');
    const products = this.data.products;
    let str = '';
    products.forEach(item => {
      str += `
      <div class="card">
        <img src="${item.imageUrl[0]}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.content}</p>
          <span class="badge badge-primary">特價: ${item.price}</span>
        </div>
      </div>`;
    });
    app.innerHTML = str;
  }
}

obj.getProducts();