/* ========================
Loading Products from API
======================== */

const loadProducts = () => {
  const url = `https://fakestoreapi.com/products` || `./js/api.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

/* ========================
Show all product in UI
======================== */

const showProducts = (products) => {
  const allProducts = products.map((product) => product);
  for (const product of allProducts) {
    const image = product.image;
    const { rate, count } = product.rating;
    const div = document.createElement("div");
    div.classList.add("product", "col-md-4");
    div.innerHTML = `
<div class="card h-100 py-4 px-3 shadow-lg">
<img class="product-image card-img-top d-block mx-auto img-fluid" src=${image}></img>
<h2 class="mt-4 mb-3">${product.title}</h2>
<h3 class="mb-3 text-main">Price: $${product.price}</h3>
<p class="mb-2 text-secondary text-capitalize">Category: ${product.category}</p>
<div class="d-flex justify-content-between text-secondary">
<div class="rating">
<p> Rating :  ${rate} </p>     
</div>
 <div class="review">
  <p> Reviews :  ${count} </p>        
 </div>
</div>
<div class="d-flex"> 
<button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-main">add to cart</button>
<button id="details-btn" class="btn btn-main ms-2">Details</button>
</div>
  </div>    
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// Initialize product count
let count = 0;

/* ===============================
Function for Adding and Updating the Cart
================================== */
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

/* ========================
Function for Getting Input Value
======================== */
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

/* ========================
Main Price Update Function
========================== */
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

/* ========================
Set Inner Text Function
========================== */
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

/* =======================================
Updating Delivery and Total Tax Charge Function
========================================= */
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

/* ========================
Grand Total Update Function
======================== */
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
