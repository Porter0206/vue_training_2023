import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

let productModal = null;
let delProductModal = null;

createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "porter0206_vue",
      products: [],
      detailProduct: {
        imagesUrl: [],
      },
      isNew: false,
    };
  },
  methods: {
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios
        .post(url)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        });
    },
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
      axios
        .get(url)
        .then((response) => {
          //console.log(response.data);
          //console.log(response.data.products);
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },

    openModal(isNew, item) {
      if (isNew === "new") {
        this.detailProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      } else if (isNew === "edit") {
        this.detailProduct = { ...item };
        this.isNew = false;
        productModal.show();
      } else if (isNew === "delete") {
        this.detailProduct = { ...item };
        delProductModal.show();
      }
    },
    createImages() {
      this.detailProduct.imagesUrl = [];
      this.detailProduct.imagesUrl.push("");
    },
    updateProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let http = "post";

      if (!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.detailProduct.id}`;
        http = "put";
      }

      axios[http](url, { data: this.detailProduct })
        .then((response) => {
          alert(response.data.message);
          productModal.hide();
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    delProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.detailProduct.id}`;

      axios
        .delete(url)
        .then((response) => {
          alert(response.data.message);
          delProductModal.hide();
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();

    // 初始化彈跳視窗
    productModal = new bootstrap.Modal(
      document.getElementById("productModal"),
      { Keyboard: false }
    );
    delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal"),
      { Keyboard: false }
    );
  },
}).mount("#app");
