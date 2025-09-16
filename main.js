import { initRouter } from './router.js';
import { fakeApi } from './fakeApi.js';
import { cart } from './cart.js';

const app = document.getElementById('app');

async function boot(){
  // seed products from JSON into localStorage via fakeApi
  await fakeApi.seedIfNeeded();

  // wire search input
  const search = document.getElementById('search');
  let debounceTimer;
  search.addEventListener('input', (e)=>{
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(()=>{
      location.hash = '#/search/' + encodeURIComponent(e.target.value);
    }, 300);
  });

  // cart count
  const cartCount = document.getElementById('cart-count');
  function updateCartCount(){ cartCount.textContent = cart.getTotalQuantity(); }
  updateCartCount();
  cart.onChange(updateCartCount);

  // init router and render
  initRouter(app);
}

boot().catch(err=>{
  console.error('Boot error',err);
});
