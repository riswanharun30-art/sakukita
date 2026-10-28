const fs=require('fs'),vm=require('vm');
const src=fs.readFileSync('app.js','utf8');
function grab(name){const i=src.indexOf('function '+name+'(');let d=0,j=src.indexOf('{',i);for(let k=j;k<src.length;k++){if(src[k]=='{')d++;if(src[k]=='}'){d--;if(!d)return src.slice(i,k+1);}}}
const store={};
const ctx={localStorage:{getItem:k=>store[k]??null,setItem:(k,v)=>store[k]=v},console,Date,JSON,Math,
 users:{user_1:{id:'user_1',name:'Saya',email:'me@x.com'}},spaces:{space_1:{id:'space_1',ownerId:'user_1'}},activeUserId:'user_1',activeSpaceId:'space_1',
 showLiveToast(){},saveUsers(){},saveSpaces(){},validateActiveSpace(){},renderUserPills(){},renderActiveUserProfile(){},updateSpaceSelectorUI(){},populateCategoryPicker(){},renderAll(){},pollSpaceFromCloud(){}};
vm.createContext(ctx);
['getSyncHash','getSyncTopicForSpace','getRevokedSpaces','addRevokedSpace','isSpaceRevoked','clearRevokedIfNewerInvite','getSpaceAliases','applyRemoteSpaceJoin'].forEach(n=>{const c=grab(n);if(!c)throw new Error('missing '+n);vm.runInContext(c,ctx);});
let pass=0,fail=0;const ok=(c,m)=>{c?pass++:fail++;console.log((c?'PASS ':'FAIL ')+m)};
const inv=(email,ts)=>({ownerId:'user_1',ownerName:'Adik',ownerEmail:email,id:'space_1',name:'Kas Adik',transactions:[],wallets:[]});
// 1. revoked 'space_1' milik pemilik lain tidak memblokir adik
ctx.addRevokedSpace('space_1','space_1','lain@x.com');
ok(!ctx.isSpaceRevoked(null,'space_1','adik@x.com'),'blokir pemilik lain tidak memblokir adik');
ok(ctx.isSpaceRevoked(null,'space_1','lain@x.com'),'pemilik yang diblokir tetap diblokir');
// 2. join adik berhasil
ok(ctx.applyRemoteSpaceJoin(inv('adik@x.com'),'t',true)===true,'join adik return true');
ok(Object.values(ctx.spaces).some(s=>s.isRemoteShared&&s.joinedAt),'space adik tersimpan + joinedAt');
// 3. join ditolak bila diblokir -> false
ok(ctx.applyRemoteSpaceJoin(inv('lain@x.com'),'t',true)===false,'join diblokir return false');
// 4. re-invite lebih baru menghapus blokir
ok(ctx.applyRemoteSpaceJoin(inv('lain@x.com'),'t',true,Date.now()+1000)===true,'re-invite baru menyambung kembali');
// 5. pemilik berbeda tak bertabrakan
ok(Object.values(ctx.spaces).filter(s=>s.isRemoteShared).length===2,'dua pemilik = dua akun pantau');
console.log(`\n${pass} lulus, ${fail} gagal`);process.exit(fail?1:0);
