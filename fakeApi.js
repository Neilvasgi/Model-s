export const fakeApi = (function(){
  const KEY = 'localshop_products_v2';
  async function fetchSeed(){
    const res = await fetch('/data/products.json');
    if(!res.ok) throw new Error('Failed to load product seed');
    return res.json();
  }
  function delay(ms){return new Promise(r=>setTimeout(r,ms));}
  async function seedIfNeeded(){
    if(!localStorage.getItem(KEY)){
      const data = await fetchSeed();
      localStorage.setItem(KEY, JSON.stringify(data));
    }
    return JSON.parse(localStorage.getItem(KEY));
  }
  async function list(){ await delay(200 + Math.random()*300); return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  async function get(id){ await delay(100 + Math.random()*200); const all = JSON.parse(localStorage.getItem(KEY)||'[]'); return all.find(p=>p.id===id); }
  async function save(product){ await delay(150); const all = JSON.parse(localStorage.getItem(KEY)||'[]'); const idx = all.findIndex(p=>p.id===product.id); if(idx>=0) all[idx]=product; else all.push(product); localStorage.setItem(KEY, JSON.stringify(all)); return product; }
  async function remove(id){ await delay(150); let all = JSON.parse(localStorage.getItem(KEY)||'[]'); all = all.filter(p=>p.id!==id); localStorage.setItem(KEY, JSON.stringify(all)); return true; }
  return {seedIfNeeded,list,get,save,remove};
})();
