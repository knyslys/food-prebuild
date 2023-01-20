import { products } from "./products.js";
const cartContainer = document.querySelector(".nav__cart__itemsincart");
const addToCartItem = document.querySelectorAll(".add-to-cart");
export let itemsInCart = [];

function updateCart() {
  if (itemsInCart.length > 0) {
    if (!document.querySelector(".nav__cart__itemsincart--count")) {
      cartContainer.insertAdjacentHTML(
        "afterbegin",
        `<div class="nav__cart__itemsincart--count"><span class='quantity'>${itemsInCart.length}</span></div>`
      );
    } else {
      let howManyItems = 0;
      itemsInCart.forEach(function (item) {
        howManyItems += item.quantity;
      });
      document.querySelector(".quantity").textContent = howManyItems;
    }
  }
}

const getItem = (item) => {
  return new Promise((resolve, reject) => {
    let target;
    products.forEach((product, i) => {
      //scrolinam per visus galimus productus
      if (item.target.classList.contains(product.id)) {
        //settinam pasirinkta producta
        target = product;
        resolve(target);
      }
    });
  });
};

const addItem = async (item) => {
  let target = await getItem(item); // nevygdom kodo toliau, kol negaunam producto id
  console.log(itemsInCart);
  if (itemsInCart.length > 0) {
    // jei krepselis nera tuscias
    for (let i of itemsInCart) {
      if (target?.id === i?.id) {
        // ir jeigu preke jau yra krepselyje
        i.quantity += 1; // addinam prie prekes kiekio
        updateCart(); // updatinam carta
        return 0; // breakinam funkcija
      }
    }
  }

  // jei virsuj kodas nebuvo breakintas, vadinasi prekes nebuvo carte, todel galim addinti
  // await writeToCart(target);
  itemsInCart.push({
    id: target?.id,
    quantity: 1,
    name: target?.name,
    img: target?.img,
    price: target?.price,
  });
  //updatinam vel carta
  updateCart();
};

addToCartItem.forEach((item) => {
  item.addEventListener("click", addItem);
});

//funkcija gauti bendro carto kaina
const getAllPrice = (cart) => {
  let Allprice = 0;
  cart.forEach((item) => {
    let productPrice = item.quantity * item.price;
    Allprice += productPrice;
  });

  return Allprice;
};

//loadinam carto itemus
const loadCartItems = (cartItems) => {
  return new Promise((resolve, reject) => {
    let cartHTML = "";

    cartItems.forEach((item) => {
      cartHTML += `<div class="cart-page__container__items__item"> <img
    src="${item?.img}"
    class="cart-img"
    alt="Products"
  />
  <span class="product-name">${item?.name}(${item?.quantity})</span>
  <span class="product-price">${item?.quantity * item?.price}$</span>
  
  
  </div>`;
    });
    let allProductPrice = getAllPrice(cartItems);
    console.log(allProductPrice);
    cartHTML += `<div class="cart-page__container__items__item">
    <span class="product-name">Price: </span>
    <span class="product-price product-price--all">${allProductPrice}$</span>

    </div>`;
    resolve(cartHTML);
  });
};

//rodom carto itemus
const showItemsInCart = async (cartItems) => {
  const cartContainer = document.querySelector(".cart-page__container__items");
  cartContainer.innerHTML = "";
  console.log(cartItems);
  if (cartItems.length > 0) {
    let cartHTML = await loadCartItems(cartItems);
    cartContainer.insertAdjacentHTML("afterbegin", cartHTML);
  } else {
    cartContainer.insertAdjacentHTML(
      "afterbegin",
      "<span class='text-align-center'>Your cart is empty.</span>"
    );
  }
};

document.querySelector(".nav__icon--cart").addEventListener("click", () => {
  document.querySelector(".cart-page").classList.toggle("cart-page--off");
  showItemsInCart(itemsInCart);
});
