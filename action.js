const obj = {
  data: {
    baseURL: 'https://course-ec-api.hexschool.io/api/',
    profile: {
      uuid: 'd191d308-9c29-486a-ab7d-35afd78c1b41',
    },
    products: [],
  },
  getProducts() {
    const vm = this;
    const getProductsURL = `${this.data.baseURL}${this.data.profile.uuid}/ec/products`;

    axios.get(getProductsURL)
      .then(function (response) {
        vm.data.products = response.data.data;
        vm.data.products.forEach((item, index) => {
          vm.getProduct(item.id, index)
        })

      })
  },
  getProduct(productID, index) {
    const vm = this;
    const getProductURL = `${this.data.baseURL}${this.data.profile.uuid}/ec/product/${productID}`;

    axios.get(getProductURL)
      .then(function (response) {
        vm.data.products[index] = {
          ...vm.data.products[index],
          "description": response.data.data.description
        }
        vm.render();
      })
  },
  render() {
    const app = document.getElementById('app');
    const products = this.data.products;
    let str = '';
    products.forEach(item => {
      console.log(item)
      str += `
      <div class="card">
        <div class="box">
          <img src="${item.imageUrl[0]}" class="card-img-top">
          <div class="text-block">
            <span>特價中</span>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.content}</p>
          <p class="card-text">${item.description}</p>
          <span class="badge badge-primary mr-3">特價: ${item.price}</span>
          <span class="original-price">原價: ${item.origin_price}</span>
          <a href="#" class="btn btn-outline-success mt-4 add-cart" style="display: block;margin:10px auto;">加入購物車</a>
        </div>
      </div>`;
    });
    app.innerHTML = str;
  }
}

obj.getProducts();