/* ========================
Initialize Important Elements
======================== */
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const error = document.getElementById("error");
const allProductsContainer = document.getElementById("all-products");
const productModal = document.getElementById("product-modal");
const modal = document.getElementById("details-modal");
const closeBtn = document.getElementsByClassName("close")[0];

/* ========================
Loading Products from API
======================== */

const loadProducts = () => {
  const url = `./js/api.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

/* ========================
Show all product in UI
======================== */

const showProducts = (products) => {
  const allProducts = products.map((product) => product);
  for (const product of allProducts) {
    const { rate, count } = product.rating;
    const { image, title, price, category, id } = product;

    const div = document.createElement("div");
    div.classList.add("product", "col-md-4");
    div.innerHTML = `
<div class="card h-100 px-3 py-4 shadow-lg">
<img class="product-image card-img-top d-block mx-auto img-fluid" src=${image}></img>
<h2 class="mt-4 mb-2">${title}</h2>
<h3 class="mb-2 text-main">Price: $${price}</h3>
<p class="mb-2 text-secondary text-capitalize category">Category: ${category}</p>
<div class="text-secondary">
<div class="rating mb-2">
<div> <i class="fas fa-star"></i>  ${rate} Rating </div> 
</div>
<div class="review mb-2">
  <div> <i class="fas fa-user-circle text-secondary"></i>  ${count} Reviews </div>        
 </div>
</div>
<div class="d-flex"> 
<button onclick="addToCart(${price})" id="addToCart-btn" class="buy-now btn btn-main">Add to Cart</button>
<button id="details-btn" class="btn btn-main ms-2" onclick="modalDetails(${id})">Details</button>
</div>
  </div>    
      `;
    allProductsContainer.appendChild(div);
  }
};

// Initialize product count
let count = 0;

/* ===============================
Function for Adding and Updating the Cart
================================== */
const addToCart = (price) => {
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

/* ========================
Filter Prouduct Fucntion
======================== */

const filterProducts = (searchValue) => {
  const products = document.getElementsByClassName("product");

  for (let product of products) {
    if (product.innerText.toLowerCase().includes(searchValue)) {
      error.textContent = "";
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  }
};

/* ========================
Search Button Event Listener
======================== */
searchBtn.addEventListener("click", () => {
  const productName = searchInput.value.toLowerCase();

  error.textContent = "";

  if (productName === "") {
    error.innerText = "Please give a Product Name";
  } else {
    error.textContent = "";
    filterProducts(productName);
  }

  // Clear Value
  searchInput.value = "";
});

loadProducts();

/* ========================
Modal With Javascript
======================== */

const modalDetails = (id) => {
  // clear previous modal content
  productModal.textContent = "";

  // Fetching Data
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => updateModal(data));

  modal.style.display = "block";
};

// When the user clicks on X (close) Button, the modal will close
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, modal will close
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

/* ========================
Update Modal with UI
======================== */
const updateModal = (info) => {
  const { rate, count } = info.rating;
  const { image, title, price, category, description } = info;

  const div = document.createElement("div");
  div.innerHTML = `
<div class="p-3">
<img class="d-block mx-auto modal-img" src=${image}></img>
<h2 class="mt-4 mb-2">${title}</h2>
<p class="mb-2 text-secondary">${description}</p>
<h3 class="mb-2 text-main">Price: $${price}</h3>
<p class="mb-2 text-secondary text-capitalize">Category: ${category}</p>
<div class="text-secondary">
<div class="d-flex">
<div class="rating d-flex">
<div class="icons"> 
<i class="fas fa-star"></i>
</div>
<p class="ms-1"> ${rate} </p>     
</div>
<div class="review ms-3">
<p> <i class="fas fa-user-circle text-secondary"></i>  ${count} Reviews </p>        
</div>
</div>
</div>
</div>    
    `;
  productModal.appendChild(div);
};
