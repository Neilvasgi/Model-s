export const cart = (function(){
  const KEY = 'localshop_cart_v1';
  let state = {items:[]};
  const listeners = new Set();
  function load(){
    try{ state = JSON.parse(localStorage.getItem(KEY))||{items:[]}; }catch(e){ state={items:[]}; }
  }
  function save(){ localStorage.setItem(KEY, JSON.stringify(state)); trigger(); }
  function trigger(){ for(const l of listeners) l(state); }
  function getTotalQuantity(){ return state.items.reduce((s,i)=>s+i.quantity,0); }
  function getSubtotal(){ return state.items.reduce((s,i)=>s+i.quantity*i.price,0); }
  function add(item){ // item: {id,title,price,quantity}
    const existing = state.items.find(i=>i.id===item.id);
    if(existing){ existing.quantity += item.quantity; }
    else state.items.push({...item});
    save();
  }
  function update(id,quantity){ const it = state.items.find(i=>i.id===id); if(!it) return; it.quantity = quantity; if(it.quantity<=0) state.items = state.items.filter(i=>i.id!==id); save(); }
  function remove(id){ state.items = state.items.filter(i=>i.id!==id); save(); }
  function clear(){ state.items = []; save(); }
  function get(){ return state; }
  function onChange(cb){ listeners.add(cb); return ()=>listeners.delete(cb); }
  load();
  return {getTotalQuantity,getSubtotal,add,update,remove,clear,get,onChange};
})();
