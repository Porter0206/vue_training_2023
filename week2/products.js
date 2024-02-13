import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "porter0206_vue",
      products: [],
      detailProduct: {},
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
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
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
    openProduct(item) {
      this.detailProduct = item;
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
  },
}).mount("#app");
