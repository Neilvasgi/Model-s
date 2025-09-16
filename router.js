import { renderHome } from './views/home.js';
import { renderList } from './views/list.js';
import { renderProduct } from './views/product.js';
import { renderCartView } from './views/cartView.js';
import { renderCheckout } from './views/checkout.js';
import { renderAccount } from './views/account.js';
import { renderAdmin } from './views/admin.js';

export function initRouter(container){
  async function route(){
    const hash = location.hash || '#/';
    container.innerHTML = '';
    if(hash.startsWith('#/product/')){
      const id = hash.split('/')[2];
      await renderProduct(container,id);
    } else if(hash.startsWith('#/category/')){
      const cat = decodeURIComponent(hash.split('/')[2]||'');
      await renderList(container,{category:cat});
    } else if(hash.startsWith('#/search/')){
      const q = decodeURIComponent(hash.split('/')[2]||'');
      await renderList(container,{q});
    } else if(hash.startsWith('#/cart')){
      await renderCartView(container);
    } else if(hash.startsWith('#/checkout')){
      await renderCheckout(container);
    } else if(hash.startsWith('#/account')){
      await renderAccount(container);
    } else if(hash.startsWith('#/admin')){
      await renderAdmin(container);
    } else {
      await renderHome(container);
    }
  }
  window.addEventListener('hashchange', route);
  route();
}
