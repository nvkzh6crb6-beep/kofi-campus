import { useEffect, useMemo, useRef, useState, useCallback } from "react";

function Fonts() {
  useEffect(() => {
    if (document.getElementById("kf-fonts")) return;
    const l = document.createElement("link");
    l.id = "kf-fonts"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,700;0,900;1,900&family=Barlow:wght@300;400;500&display=swap";
    document.head.appendChild(l);
  }, []);
  return null;
}

function CSS() {
  useEffect(() => {
    if (document.getElementById("kf-css")) return;
    const s = document.createElement("style");
    s.id = "kf-css";
    s.innerHTML = [
      "*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }",
      ":root {",
      "  --black: #0a0a08; --off-black: #111109; --surface: #161612; --surface2: #1e1e18;",
      "  --cream: #f0e8d6; --cdim: rgba(240,232,214,0.55); --cghost: rgba(240,232,214,0.1);",
      "  --pink: #e8749a; --pink2: #d45a82; --red: #c94a2e; --green: #4a7c59;",
      "  --border: rgba(240,232,214,0.1); --bs: rgba(240,232,214,0.22);",
      "  --FD: 'Barlow Condensed','Arial Narrow',sans-serif;",
      "  --FB: 'Barlow',system-ui,sans-serif;",
      "}",
      "html,body { background:var(--black); color:var(--cream); font-family:var(--FB); -webkit-font-smoothing:antialiased; overflow-x:hidden; }",
      "input,button,select { font-family:var(--FB); }",
      "input { background:none; border:none; color:var(--cream); outline:none; width:100%; }",
      "input::placeholder { color:rgba(240,232,214,0.3); }",
      "::-webkit-scrollbar { width:3px; height:3px; }",
      "::-webkit-scrollbar-thumb { background:var(--bs); border-radius:2px; }",
      "@keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }",
      "@keyframes pop    { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }",
      "@keyframes spin   { to{transform:rotate(360deg)} }",
      "@keyframes mq     { from{transform:translateX(0)} to{transform:translateX(-50%)} }",
      "@keyframes cfall  { 0%{transform:translateY(-20px) rotate(0);opacity:1} 100%{transform:translateY(200px) rotate(360deg);opacity:0} }",
      "@keyframes slideU { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }",
      "@keyframes slideI { from{transform:translateX(100%)} to{transform:translateX(0)} }",
      "@keyframes pulse  { 0%,100%{opacity:.3} 50%{opacity:1} }",
      ".fu  { animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both }",
      ".pop { animation:pop   .3s cubic-bezier(.22,1,.36,1) both }",
      ".su  { animation:slideU .4s cubic-bezier(.22,1,.36,1) both }",
      ".bp:active { transform:scale(.97)!important; }",
      ".mtrack { display:flex; overflow:hidden; white-space:nowrap; }",
      ".minner { display:flex; animation:mq 18s linear infinite; }",
      "html, body { overflow-x: hidden; max-width: 100vw; }",
      "@media(max-width:768px){",
      "  .hide-m{display:none!important}",
      "  .grid-m{grid-template-columns:1fr!important}",
      "  .grid-4{grid-template-columns:1fr 1fr!important}",
      "  .grid-2{grid-template-columns:1fr!important}",
      "  .grid-footer{grid-template-columns:1fr 1fr!important}",
      "  .hero-title{font-size:clamp(52px,16vw,100px)!important}",
      "  .nav-tabs{display:none!important}",
      "  .nav-mobile{display:flex!important}",
      "}",
    ].join("\n");
    document.head.appendChild(s);
  }, []);
  return null;
}

const r2 = n => Math.round(n * 100) / 100;
const wait = ms => new Promise(r => setTimeout(r, ms));
const fmt = s => String(Math.floor(s/60)).padStart(2,"0") + ":" + String(s%60).padStart(2,"0");
const mkCode = () => {
  const A = "ABCDEFGHJKLMNPQRSTUVWXYZ", N = "23456789";
  const p = x => x[~~(Math.random()*x.length)];
  return p(A)+p(A)+"-"+p(N)+p(N)+p(N);
};
const pCat = c => ({boisson:"BOISSON",snack:"SNACK",repas:"REPAS",extra:"EXTRAS",topping:"TOPPINGS"}[c] || c.toUpperCase());
const makeSlots = () => {
  const base = new Date(Date.now()+10*60*1000);
  return Array.from({length:5}, (_,i) => {
    const d = new Date(base.getTime()+i*10*60*1000);
    return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
  });
};
const LR = 10, LS = 100;

const MENUS = [
  {
    id:"campus-base", name:"CAMPUS BASE", price:3.0, emoji:"☕",
    tag:"POPULAIRE", tagColor:"var(--pink)",
    stock:12, restockAt:"14:00",
    gradient:"linear-gradient(160deg,#2a1a08,#0a0a08)",
    options:{
      boisson:[
        {id:"esp",label:"Espresso",extra:0},{id:"ame",label:"Americano",extra:0},
        {id:"lat",label:"Latte",extra:.5},{id:"ice",label:"Iced Coffee",extra:.5},
        {id:"tea",label:"Thé",extra:0},{id:"cho",label:"Chocolat chaud",extra:.6},
      ],
      snack:[
        {id:"coo",label:"Cookie",extra:.9},{id:"muf",label:"Muffin",extra:1.2},
        {id:"ban",label:"Banane",extra:.6},{id:"mad",label:"Madeleine",extra:.7},
      ],
      extra:[
        {id:"sho",label:"+1 Shake",extra:.7},{id:"sir",label:"Sirop",extra:.5},
        {id:"avo",label:"Lait d'avoine",extra:.6},
      ],
    },
  },
  {
    id:"kofi-classic", name:"KŌFI CLASSIC", price:4.5, emoji:"🥐",
    tag:"BEST SELLER", tagColor:"#5fb888",
    stock:8, restockAt:"14:00",
    gradient:"linear-gradient(160deg,#1a1208,#0a0a08)",
    options:{
      boisson:[
        {id:"van",label:"Vanilla Latte",extra:0},{id:"car",label:"Caramel Latte",extra:0},
        {id:"moc",label:"Mocha",extra:.3},{id:"icl",label:"Iced Latte",extra:.5},
        {id:"mat",label:"Matcha Light",extra:.6},{id:"col",label:"Cold Brew",extra:.7},
      ],
      snack:[
        {id:"bro",label:"Brownie",extra:0},{id:"cro",label:"Croissant",extra:.6},
        {id:"bar",label:"Barre céréales",extra:.4},{id:"yao",label:"Yaourt",extra:.7},
      ],
      topping:[
        {id:"cha",label:"Chantilly",extra:.4},{id:"cac",label:"Cacao",extra:.2},
        {id:"can",label:"Cannelle",extra:.2},
      ],
    },
  },
  {
    id:"kofi-boost", name:"KŌFI BOOST", price:6.5, emoji:"⚡",
    tag:"NOUVEAU", tagColor:"#7eb4f0",
    stock:3, restockAt:"14:00",
    gradient:"linear-gradient(160deg,#0f1820,#0a0a08)",
    options:{
      boisson:[
        {id:"maf",label:"Matcha",extra:.8},{id:"cha2",label:"Chai Latte",extra:.5},
        {id:"pro",label:"Protein Coffee",extra:1.2},{id:"dbl",label:"Double Shot",extra:.7},
      ],
      snack:[
        {id:"ene",label:"Energy Bar",extra:.9},{id:"nut",label:"Mix Nuts",extra:1.0},
        {id:"fru",label:"Fruit Cup",extra:.9},
      ],
      extra:[
        {id:"sh2",label:"+1 Shake",extra:.7},{id:"si2",label:"Sirop",extra:.5},
        {id:"av2",label:"Lait d'avoine",extra:.6},
      ],
    },
  },
  {
    id:"kofi-max", name:"KŌFI MAX", price:7.99, emoji:"🍱",
    tag:"GROSSE FAIM", tagColor:"var(--red)",
    stock:1, restockAt:"14:00",
    gradient:"linear-gradient(160deg,#1a0808,#0a0a08)",
    options:{
      repas:[
        {id:"wch",label:"Wrap Poulet",extra:0},{id:"wve",label:"Wrap Veggie",extra:0},
        {id:"wtu",label:"Wrap Thon",extra:0},{id:"sal",label:"Salade",extra:.5},
      ],
      boisson:[
        {id:"eau",label:"Eau",extra:0},{id:"sod",label:"Soda",extra:.6},
        {id:"ite",label:"Iced Tea",extra:.6},{id:"jus",label:"Jus",extra:.8},
      ],
      snack:[
        {id:"co2",label:"Cookie",extra:.7},{id:"fr2",label:"Fruit",extra:.7},
        {id:"chi",label:"Chips",extra:.8},
      ],
    },
  },
];

export default function Kofi() {
  const [menus, setMenus]             = useState(MENUS);
  const [view, setView]               = useState("home");
  const [expandedId, setExpandedId]   = useState(null);
  const [selOpt, setSelOpt]           = useState({});
  const [favs, setFavs]               = useState({});
  const [cart, setCart]               = useState([]);
  const [cartOpen, setCartOpen]       = useState(false);
  const [loyaltyPts, setLoyaltyPts]   = useState(240);
  const [redeemPts, setRedeemPts]     = useState(false);
  const [history, setHistory]         = useState([]);
  const [firstName, setFirstName]     = useState("");
  const [lastName, setLastName]       = useState("");
  const [note, setNote]               = useState("");
  const pickupSlots                   = useMemo(makeSlots, []);
  const [pickup, setPickup]           = useState(pickupSlots[1] || "");
  const [payMethod, setPayMethod]     = useState("");
  const [depMethod, setDepMethod]     = useState("");
  const [depPct, setDepPct]           = useState(30);
  const [cardNum, setCardNum]         = useState("");
  const [cardExp, setCardExp]         = useState("");
  const [cardCvc, setCardCvc]         = useState("");
  const [wOpen, setWOpen]             = useState(false);
  const [wStage, setWStage]           = useState("confirm");
  const [wAuth, setWAuth]             = useState(false);
  const [wLabel, setWLabel]           = useState("");
  const [paying, setPaying]           = useState(false);
  const [tracking, setTracking]       = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showAbout, setShowAbout]     = useState(false);
  const [toast, setToast]             = useState(null);
  const [banner, setBanner]           = useState(null);
  const [confetti, setConfetti]       = useState(false);
  const [cartBounce, setCartBounce]   = useState(false);

  const menuById    = useMemo(() => new Map(menus.map(m => [m.id, m])), [menus]);
  const cartTotal   = useMemo(() => r2(cart.reduce((s,it) => s + it.price*it.qty, 0)), [cart]);
  const loyaltyDisc = redeemPts ? r2(Math.floor(loyaltyPts/LS)) : 0;
  const finalTotal  = r2(Math.max(0, cartTotal - loyaltyDisc));
  const depAmt      = r2(finalTotal * depPct / 100);
  const remAmt      = r2(finalTotal - depAmt);
  const cartQty     = cart.reduce((s,it) => s + it.qty, 0);
  const qtyOf       = id => cart.reduce((s,it) => s + (it.baseId===id ? it.qty : 0), 0);

  useEffect(() => {
    setSelOpt(prev => {
      const n = {...prev};
      menus.forEach(m => {
        if (!n[m.id]) n[m.id] = {};
        Object.entries(m.options||{}).forEach(([cat,opts]) => {
          if (!n[m.id][cat] && opts?.length) n[m.id][cat] = opts[0].id;
        });
      });
      return n;
    });
  }, [menus]);

  useEffect(() => {
    if (!tracking || tracking.status==="ready") return;
    if (tracking.leftSec<=0) { setTracking(t => ({...t, status:"ready"})); return; }
    const id = setInterval(() => setTracking(t => t ? {...t, leftSec:Math.max(0,t.leftSec-1)} : t), 1000);
    return () => clearInterval(id);
  }, [tracking]);

  const showT = useCallback(msg => { setToast(msg); setTimeout(() => setToast(null), 1400); }, []);
  const showB = useCallback((type, msg, ms=2400) => { setBanner({type,msg}); setTimeout(() => setBanner(null), ms); }, []);

  function getChosen(menu) {
    const sel = selOpt[menu.id]||{};
    const parts = []; let extra = 0;
    Object.entries(menu.options||{}).forEach(([cat,opts]) => {
      const opt = opts?.find(o => o.id===sel[cat]);
      if (opt) { parts.push(pCat(cat)+": "+opt.label); extra += opt.extra||0; }
    });
    return { label:parts.join(" · "), extra:r2(extra), sig:Object.entries(sel).sort().map(([c,i])=>c+":"+i).join("|") };
  }

  function urgency(m) {
    if (m.stock<=0) return {text:"RUPTURE · RÉASSORT "+m.restockAt, tone:"danger"};
    if (m.stock===1) return {text:"DERNIÈRE UNITÉ", tone:"warn"};
    if (m.stock<=3) return {text:"TRÈS DEMANDÉ", tone:"hot"};
    return null;
  }

  function addToCart(menu) {
    if (menu.stock<=0) return showT("Rupture ❌");
    if (qtyOf(menu.id)>=menu.stock) return showT("Stock max atteint");
    const ch = getChosen(menu);
    if (!ch.label) return showT("Choisis tes options");
    const cid = menu.id+"__"+ch.sig;
    setCart(prev => {
      const f = prev.find(x => x.id===cid);
      if (f) return prev.map(x => x.id===cid ? {...x, qty:x.qty+1} : x);
      return [...prev, {id:cid, baseId:menu.id, name:menu.name+" — "+ch.label, price:r2(menu.price+ch.extra), qty:1}];
    });
    setCartBounce(true); setTimeout(() => setCartBounce(false), 240);
    showT("Ajouté ✓");
  }

  function removeOne(cid) {
    setCart(prev => {
      const f = prev.find(x => x.id===cid);
      if (!f) return prev;
      if (f.qty<=1) return prev.filter(x => x.id!==cid);
      return prev.map(x => x.id===cid ? {...x, qty:x.qty-1} : x);
    });
  }

  function resetPay() {
    setPayMethod(""); setDepMethod(""); setWAuth(false);
    setWOpen(false); setWStage("confirm");
    setCardNum(""); setCardExp(""); setCardCvc("");
  }

  function choosePay(m) {
    if (paying) return;
    setPayMethod(m); setDepMethod(""); setWAuth(false); setWStage("confirm");
    setCardNum(""); setCardExp(""); setCardCvc("");
    if (m==="applepay"||m==="googlepay") openW(m==="applepay" ? "Apple Pay" : "Google Pay");
  }

  function chooseDepPay(m) {
    if (paying) return;
    setDepMethod(m); setWAuth(false); setWStage("confirm");
    if (m==="applepay"||m==="googlepay") openW(m==="applepay" ? "Apple Pay" : "Google Pay");
  }

  function openW(label) { setWLabel(label); setWStage(wAuth ? "authorized" : "confirm"); setWOpen(true); }

  async function walletConfirm() {
    setWStage("scanning"); await wait(900);
    setWStage("authorized"); setWAuth(true); showT("Autorisé ✅");
  }

  async function validateOrder() {
    if (!firstName.trim()||!lastName.trim()) return showB("error","Prénom + Nom requis.",2000);
    if (!pickup) return showB("error","Choisis un créneau.",2000);
    if (!payMethod) return showB("error","Choisis un mode de paiement.",2000);
    const needCard = () => !cardNum.trim()||!cardExp.trim()||!cardCvc.trim();
    if (payMethod==="card"&&needCard()) return showB("error","Remplis les champs carte.",2000);
    if ((payMethod==="applepay"||payMethod==="googlepay")&&!wAuth) {
      openW(payMethod==="applepay"?"Apple Pay":"Google Pay");
      return showB("error","Confirme le wallet.",2000);
    }
    if (payMethod==="deposit") {
      if (!depMethod) return showB("error","Choisis comment payer l'acompte.",2000);
      if (depMethod==="card"&&needCard()) return showB("error","Remplis la carte.",2000);
      if ((depMethod==="applepay"||depMethod==="googlepay")&&!wAuth) {
        openW(depMethod==="applepay"?"Apple Pay":"Google Pay");
        return showB("error","Confirme le wallet.",2000);
      }
    }
    const nbBase = {};
    cart.forEach(it => { nbBase[it.baseId] = (nbBase[it.baseId]||0) + it.qty; });
    for (const bid of Object.keys(nbBase)) {
      const m = menuById.get(bid);
      if (m&&nbBase[bid]>m.stock) return showB("error","Stock insuffisant — "+m.name, 2400);
    }
    setPaying(true); showT("Traitement…");
    await wait(2200); setPaying(false);
    setMenus(prev => prev.map(m => { const d=nbBase[m.id]||0; return d ? {...m, stock:Math.max(0,m.stock-d)} : m; }));
    const ptsEarned = Math.floor(finalTotal*LR);
    const ptsUsed   = redeemPts ? Math.min(loyaltyPts, loyaltyDisc*LS) : 0;
    setLoyaltyPts(p => p - ptsUsed + ptsEarned);
    const oCode    = mkCode();
    const payLabel = payMethod==="card" ? "Carte" : payMethod==="applepay" ? "Apple Pay" : payMethod==="googlepay" ? "Google Pay" : payMethod==="cash" ? "Sur place" : "Acompte "+depPct+"%";
    const paidNow  = payMethod==="deposit" ? depAmt : payMethod==="cash" ? 0 : finalTotal;
    const remaining = payMethod==="deposit" ? remAmt : payMethod==="cash" ? finalTotal : 0;
    const order = {
      code:oCode, date:new Date().toISOString(), pickup,
      name:firstName.trim()+" "+lastName.trim(), note:note.trim(),
      paymentLabel:payLabel,
      items:cart.map(it => ({name:it.name, qty:it.qty, unit:it.price, line:r2(it.qty*it.price)})),
      total:cartTotal, discount:loyaltyDisc, finalTotal,
      paidNow:r2(paidNow), remaining:r2(remaining), ptsEarned, ptsUsed,
    };
    const totalSec = Math.max(4*60, 7*60 + ~~(Math.random()*70) - 20);
    setTracking({code:oCode, pickup, status:"preparing", leftSec:totalSec, totalSec, order});
    setHistory(p => [order, ...p]);
    setConfetti(true); setTimeout(() => setConfetti(false), 2000);
    setCart([]); setView("menu"); setFirstName(""); setLastName(""); setNote("");
    resetPay(); setRedeemPts(false); setDepPct(30);
    showB("success","COMMANDE "+oCode+" CONFIRMÉE — +"+ptsEarned+" pts", 3000);
  }

  return (
    <div>
      <Fonts /><CSS />
      {confetti && <Confetti />}
      {toast && <Toast msg={toast} />}
      {banner && <Banner banner={banner} />}

      <div style={{minHeight:"100vh", background:"var(--black)", overflowX:"hidden", maxWidth:"100vw", width:"100%"}}>
        <Nav view={view} setView={setView} cartQty={cartQty} cartTotal={cartTotal} cartBounce={cartBounce} loyaltyPts={loyaltyPts} onCartOpen={() => setCartOpen(true)} />

        {tracking && (
          <TrackingStrip tracking={tracking} onViewReceipt={() => setShowReceipt(true)} onClose={() => setTracking(null)} />
        )}

        {view==="home" && <HomeView onGoMenu={() => setView("menu")} onAbout={() => setShowAbout(true)} />}

        {view==="menu" && (
          <div className="grid-m" style={{maxWidth:1200, margin:"0 auto", padding:"0 12px 80px", display:"grid", gridTemplateColumns:"1fr 380px", gap:32, alignItems:"start"}}>
            <div>
              <SL style={{margin:"32px 0 24px"}}>NOTRE MENU</SL>
              <div style={{display:"flex", flexDirection:"column", gap:2}}>
                {menus.map((m,i) => (
                  <MenuRow key={m.id} menu={m} expanded={expandedId===m.id}
                    onToggle={() => setExpandedId(p => p===m.id ? null : m.id)}
                    selOpt={selOpt}
                    onSelOpt={(cat,id) => setSelOpt(p => ({...p, [m.id]:{...(p[m.id]||{}), [cat]:id}}))}
                    onAdd={() => addToCart(m)}
                    isFav={favs[m.id]||false}
                    onFav={() => { setFavs(p => ({...p, [m.id]:!p[m.id]})); showT(favs[m.id]?"Retiré":"Favori ♥"); }}
                    qtyInCart={qtyOf(m.id)} urgency={urgency(m)}
                    getChosen={() => getChosen(m)}
                    showT={showT} delay={i*80}
                  />
                ))}
              </div>
              <AboutBlock />
              <ReviewsBlock />
              <FAQBlock />
              <FooterBlock />
            </div>
            <div style={{position:"sticky", top:80}} className="hide-m">
              <CartPanel cart={cart} cartTotal={cartTotal} finalTotal={finalTotal} loyaltyPts={loyaltyPts} redeemPts={redeemPts} onToggleRedeem={() => setRedeemPts(p => !p)} loyaltyDisc={loyaltyDisc} menuById={menuById} qtyOf={qtyOf} onRemoveOne={removeOne} onAddOne={bid => { const b=menuById.get(bid); if(b) addToCart(b); }} onClear={() => { setCart([]); showT("Panier vidé"); }} onCheckout={() => setView("checkout")} />
            </div>
          </div>
        )}

        {view==="checkout" && (
          <Checkout cart={cart} cartTotal={cartTotal} finalTotal={finalTotal} loyaltyPts={loyaltyPts} redeemPts={redeemPts} onToggleRedeem={() => setRedeemPts(p => !p)} loyaltyDisc={loyaltyDisc} pickupSlots={pickupSlots} pickup={pickup} setPickup={setPickup} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} note={note} setNote={setNote} payMethod={payMethod} onChoosePay={choosePay} depMethod={depMethod} onChooseDepPay={chooseDepPay} depPct={depPct} setDepPct={setDepPct} depAmt={depAmt} remAmt={remAmt} cardNum={cardNum} setCardNum={setCardNum} cardExp={cardExp} setCardExp={setCardExp} cardCvc={cardCvc} setCardCvc={setCardCvc} wAuth={wAuth} openW={openW} paying={paying} onValidate={validateOrder} onBack={() => setView("menu")} onResetPay={resetPay} />
        )}

        {view==="loyalty"  && <LoyaltyView pts={loyaltyPts} history={history} />}
        {view==="history"  && <HistoryView history={history} />}
      </div>

      {cartOpen && (
        <div style={{position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,.8)"}} onClick={() => setCartOpen(false)}>
          <div className="pop" onClick={e => e.stopPropagation()} style={{position:"absolute", right:0, top:0, bottom:0, width:"min(420px,100%)", background:"var(--surface)", borderLeft:"1px solid var(--bs)", overflowY:"auto", padding:24, animation:"slideI .35s cubic-bezier(.22,1,.36,1) both"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24}}>
              <SL>TON PANIER</SL>
              <GhostBtn onClick={() => setCartOpen(false)}>✕</GhostBtn>
            </div>
            <CartPanel cart={cart} cartTotal={cartTotal} finalTotal={finalTotal} loyaltyPts={loyaltyPts} redeemPts={redeemPts} onToggleRedeem={() => setRedeemPts(p => !p)} loyaltyDisc={loyaltyDisc} menuById={menuById} qtyOf={qtyOf} onRemoveOne={removeOne} onAddOne={bid => { const b=menuById.get(bid); if(b) addToCart(b); }} onClear={() => { setCart([]); showT("Panier vidé"); }} onCheckout={() => { setCartOpen(false); setView("checkout"); }} />
          </div>
        </div>
      )}

      {wOpen && (
        <Modal onClose={() => setWOpen(false)} title={wLabel}>
          <WalletFlow stage={wStage} amount={payMethod==="deposit" ? depAmt : finalTotal} onConfirm={walletConfirm} onClose={() => setWOpen(false)} />
        </Modal>
      )}

      {showReceipt && tracking && tracking.order && (
        <Modal onClose={() => setShowReceipt(false)} title={"REÇU — "+tracking.order.code} wide>
          <ReceiptView order={tracking.order} onClose={() => setShowReceipt(false)} />
        </Modal>
      )}

      {showAbout && (
        <Modal onClose={() => setShowAbout(false)} title="ABOUT US" wide>
          <AboutModal onClose={() => setShowAbout(false)} />
        </Modal>
      )}
    </div>
  );
}

function Nav({view, setView, cartQty, cartTotal, cartBounce, loyaltyPts, onCartOpen}) {
  return (
    <nav style={{position:"sticky", top:0, zIndex:100, background:"rgba(10,10,8,0.94)", backdropFilter:"blur(16px)", borderBottom:"1px solid var(--border)", padding:"0 12px"}}>
      <div style={{maxWidth:1200, margin:"0 auto", height:56, display:"flex", alignItems:"center", justifyContent:"space-between", gap:8}}>
        <button type="button" onClick={() => setView("home")} style={{background:"none", border:"none", cursor:"pointer", fontFamily:"var(--FD)", fontSize:24, fontWeight:900, color:"var(--cream)", letterSpacing:3, lineHeight:1, flexShrink:0}}>KŌFI</button>
        <div style={{display:"flex", flex:1, justifyContent:"center"}}>
          {[["menu","MENU"],["loyalty","FIDÉLITÉ"],["history","HISTORIQUE"]].map(([v,l]) => (
            <button key={v} type="button" onClick={() => setView(v)} style={{background:"none", border:"none", cursor:"pointer", padding:"0 10px", height:56, fontFamily:"var(--FD)", fontSize:12, fontWeight:700, letterSpacing:1, color:view===v?"var(--cream)":"rgba(240,232,214,.4)", borderBottom:view===v?"2px solid var(--pink)":"2px solid transparent", transition:"all .18s ease", whiteSpace:"nowrap"}}>{l}</button>
          ))}
        </div>
        <div style={{display:"flex", alignItems:"center", gap:8, flexShrink:0}}>
          <div className="hide-m" style={{fontFamily:"var(--FD)", fontSize:12, fontWeight:700, letterSpacing:1, color:"var(--pink)"}}>✦ {loyaltyPts.toLocaleString()} PTS</div>
          <button type="button" className="bp" onClick={onCartOpen} style={{background:"var(--cream)", border:"none", cursor:"pointer", padding:"9px 14px", fontFamily:"var(--FD)", fontSize:14, fontWeight:900, letterSpacing:1, color:"var(--black)", transform:cartBounce?"scale(1.08)":"scale(1)", transition:"transform .2s ease"}}>
            🛒{cartQty>0 && " "+cartQty}
          </button>
        </div>
      </div>
    </nav>
  );
}

function HomeView({onGoMenu, onAbout}) {
  return (
    <div>
      <div style={{position:"relative", minHeight:"90vh", display:"flex", flexDirection:"column", justifyContent:"flex-end", overflow:"hidden", background:"var(--black)"}}>
        <div style={{position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 50% 100%, rgba(232,116,154,.06) 0%, transparent 70%)"}} />
        <div style={{position:"relative", zIndex:2, padding:"0 20px 60px", maxWidth:1200, margin:"0 auto", width:"100%"}}>
          <div className="fu" style={{fontFamily:"var(--FD)", fontSize:"clamp(72px,14vw,180px)", fontWeight:900, lineHeight:.88, letterSpacing:-2, color:"var(--cream)"}}>
            YOUR<br />
            <span style={{fontStyle:"italic", color:"var(--pink)"}}>BREAK,</span><br />
            UPGRADED.
          </div>
          <div className="fu" style={{animationDelay:".15s", marginTop:32, display:"flex", gap:12, flexWrap:"wrap"}}>
            <button type="button" className="bp" onClick={onGoMenu} style={{background:"var(--cream)", border:"none", cursor:"pointer", padding:"18px 40px", fontFamily:"var(--FD)", fontSize:18, fontWeight:900, letterSpacing:2, color:"var(--black)"}}>VOIR LE MENU</button>
            <button type="button" className="bp" onClick={onAbout} style={{background:"none", border:"2px solid rgba(240,232,214,.2)", cursor:"pointer", padding:"18px 40px", fontFamily:"var(--FD)", fontSize:18, fontWeight:700, letterSpacing:2, color:"var(--cream)"}}>NOTRE HISTOIRE</button>
          </div>
        </div>
        <div style={{position:"absolute", right:0, top:0, bottom:0, width:"40%", background:"linear-gradient(135deg,transparent 40%,rgba(240,232,214,.02) 100%)", borderLeft:"1px solid var(--border)"}}>
          <div style={{position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--FD)", fontSize:"22vw", fontWeight:900, color:"rgba(240,232,214,.03)", letterSpacing:-8, lineHeight:1, userSelect:"none"}}>☕</div>
        </div>
      </div>

      <div style={{background:"var(--cream)", padding:"14px 0", overflow:"hidden"}}>
        <div className="mtrack">
          <div className="minner" style={{fontFamily:"var(--FD)", fontSize:15, fontWeight:900, letterSpacing:3, color:"var(--black)"}}>
            {Array(8).fill("KŌFI — YOUR BREAK, UPGRADED — CAMPUS VAN — CLICK & COLLECT — ").join("")}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200, margin:"80px auto 0", padding:"0 20px"}}>
        <SL style={{marginBottom:40}}>NOS MENUS PHARES</SL>
        <div className="grid-4" style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:2}}>
          {MENUS.map((m,i) => (
            <div key={m.id} onClick={onGoMenu} style={{cursor:"pointer", position:"relative", paddingTop:"130%", overflow:"hidden", background:m.gradient}}>
              <div style={{position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"20px 16px"}}>
                <div style={{fontFamily:"var(--FD)", fontSize:64, fontWeight:900, lineHeight:1, color:"rgba(240,232,214,.07)", position:"absolute", top:16, left:12, userSelect:"none"}}>{String(i+1).padStart(2,"0")}</div>
                <div style={{fontSize:32, marginBottom:10}}>{m.emoji}</div>
                <div style={{fontFamily:"var(--FD)", fontSize:"clamp(18px,2.2vw,28px)", fontWeight:900, letterSpacing:1, color:"var(--cream)", lineHeight:1.1, marginBottom:14}}>{m.name}</div>
                <div style={{fontFamily:"var(--FD)", fontSize:24, fontWeight:700, color:"var(--pink)"}}>{m.price.toFixed(2)}€</div>
              </div>
              <div style={{position:"absolute", top:12, left:12, padding:"4px 10px", background:"var(--cream)", fontFamily:"var(--FD)", fontSize:11, fontWeight:900, letterSpacing:2, color:"var(--black)"}}>{m.tag}</div>
            </div>
          ))}
        </div>
        <button type="button" className="bp" onClick={onGoMenu} style={{width:"100%", padding:"22px", background:"var(--surface)", border:"none", borderTop:"1px solid var(--border)", cursor:"pointer", fontFamily:"var(--FD)", fontSize:20, fontWeight:900, letterSpacing:3, color:"var(--cream)"}}>VOIR TOUT LE MENU →</button>
      </div>

      <div className="home-loyalty" style={{maxWidth:1200, margin:"80px auto 80px", padding:"0 20px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:2}}>
        <div style={{background:"var(--cream)", padding:"48px 40px"}}>
          <div style={{fontFamily:"var(--FD)", fontSize:"clamp(40px,5vw,72px)", fontWeight:900, color:"var(--black)", lineHeight:.9, letterSpacing:-1, marginBottom:20}}>
            FIDÉLITÉ<br /><span style={{fontStyle:"italic"}}>RÉCOMPENSÉE.</span>
          </div>
          <div style={{fontSize:15, color:"rgba(10,10,8,.65)", lineHeight:1.6, marginBottom:24}}>
            {LR} pts par euro. {LS} pts = 1€ de réduction. Cumulés automatiquement.
          </div>
          <div onClick={onAbout} style={{fontFamily:"var(--FD)", fontSize:13, fontWeight:900, letterSpacing:2, color:"var(--black)", borderBottom:"2px solid var(--black)", display:"inline-block", paddingBottom:2, cursor:"pointer"}}>EN SAVOIR PLUS →</div>
        </div>
        <div style={{background:"var(--surface2)", padding:"48px 40px", borderLeft:"1px solid var(--border)", display:"flex", flexDirection:"column", justifyContent:"center"}}>
          <div style={{display:"flex", gap:4, marginBottom:24, flexWrap:"wrap"}}>
            {["Bronze","Silver","Gold","Platinum"].map((l,i) => {
              const colors = ["#cd7f32","#aaa","var(--pink)","#e5e4e2"];
              return (
                <div key={l} style={{flex:1, minWidth:80, padding:"16px 12px", border:"1px solid rgba(232,116,154,.25)", textAlign:"center"}}>
                  <div style={{fontFamily:"var(--FD)", fontSize:11, fontWeight:900, letterSpacing:2, color:colors[i]}}>{l}</div>
                  <div style={{fontSize:11, color:"var(--cdim)", marginTop:4}}>{[0,500,1500,3000][i]}+ pts</div>
                </div>
              );
            })}
          </div>
          <div style={{fontSize:13, color:"rgba(240,232,214,.45)", lineHeight:1.6}}>Plus tu commandes, plus tu montes. Chaque niveau débloque des avantages exclusifs.</div>
        </div>
      </div>
    </div>
  );
}

function MenuRow({menu, expanded, onToggle, selOpt, onSelOpt, onAdd, isFav, onFav, qtyInCart, urgency, getChosen, showT, delay}) {
  const disabled = menu.stock===0;
  const chosen   = getChosen();
  const ug       = urgency;
  const ref      = useRef(null);

  return (
    <div className="fu" style={{animationDelay:delay+"ms"}}>
      <button type="button" disabled={disabled} onClick={onToggle} style={{width:"100%", background:expanded?"var(--surface2)":"var(--surface)", border:"none", borderTop:"1px solid var(--border)", padding:"16px 12px", cursor:disabled?"not-allowed":"pointer", display:"flex", alignItems:"center", gap:20, transition:"background .2s ease", color:"var(--cream)"}}>
        <div style={{fontFamily:"var(--FD)", fontSize:40, fontWeight:900, color:expanded?"var(--pink)":"rgba(240,232,214,.12)", lineHeight:1, minWidth:48, textAlign:"center", transition:"color .2s ease"}}>
          {MENUS.findIndex(m => m.id===menu.id)+1}
        </div>
        <div style={{flex:1, textAlign:"left"}}>
          <div style={{display:"flex", alignItems:"center", gap:12, flexWrap:"wrap"}}>
            <span style={{fontFamily:"var(--FD)", fontSize:24, fontWeight:900, letterSpacing:1}}>{menu.name}</span>
            <span style={{padding:"3px 10px", border:"1px solid "+menu.tagColor+"60", fontFamily:"var(--FD)", fontSize:11, fontWeight:900, letterSpacing:2, color:menu.tagColor}}>{menu.tag}</span>
            {ug && (
              <span style={{padding:"3px 10px", background:ug.tone==="danger"?"rgba(201,74,46,.12)":"rgba(232,116,154,.1)", border:"1px solid "+(ug.tone==="danger"?"rgba(201,74,46,.4)":"rgba(232,116,154,.4)"), fontFamily:"var(--FD)", fontSize:11, fontWeight:900, letterSpacing:1, color:ug.tone==="danger"?"var(--red)":"var(--pink)"}}>{ug.text}</span>
            )}
          </div>
        </div>
        <div style={{display:"flex", alignItems:"center", gap:12, flexShrink:0, flexWrap:"wrap", justifyContent:"flex-end"}}>
          {qtyInCart>0 && <span style={{fontFamily:"var(--FD)", fontSize:13, fontWeight:900, letterSpacing:1, color:"var(--pink)"}}>×{qtyInCart} PANIER</span>}
          <button type="button" onClick={e => { e.stopPropagation(); onFav(); }} style={{background:"none", border:"none", cursor:"pointer", fontSize:18, color:isFav?"#e05a5a":"rgba(240,232,214,.3)", transition:"color .2s, transform .2s", transform:isFav?"scale(1.2)":"scale(1)"}}>♥</button>
          <div style={{fontFamily:"var(--FD)", fontSize:28, fontWeight:900, color:disabled?"rgba(240,232,214,.2)":"var(--cream)"}}>{menu.price.toFixed(2)}€</div>
          <div style={{fontFamily:"var(--FD)", fontSize:20, fontWeight:700, color:"rgba(240,232,214,.4)", transform:expanded?"rotate(180deg)":"rotate(0)", transition:"transform .25s ease"}}>↓</div>
        </div>
      </button>

      <div style={{maxHeight:expanded?(ref.current ? ref.current.scrollHeight+24 : 800):0, overflow:"hidden", transition:"max-height .38s cubic-bezier(.22,1,.36,1)", background:"var(--surface2)", borderTop:expanded?"1px solid var(--border)":"none"}}>
        <div ref={ref} style={{padding:"24px 24px 28px"}}>
          <div style={{display:"grid", gap:16}}>
            {Object.entries(menu.options||{}).map(([cat,opts]) => (
              <div key={cat}>
                <div style={{fontFamily:"var(--FD)", fontSize:12, fontWeight:900, letterSpacing:3, color:"rgba(240,232,214,.4)", marginBottom:10}}>{pCat(cat)}</div>
                <div style={{display:"flex", gap:6, flexWrap:"wrap", paddingBottom:4}}>
                  {opts.map(o => {
                    const active = selOpt && selOpt[menu.id] && selOpt[menu.id][cat]===o.id;
                    return (
                      <button key={o.id} type="button" className="bp" onClick={() => { onSelOpt(cat,o.id); showT(o.label); }} style={{flexShrink:0, padding:"10px 16px", cursor:"pointer", background:active?"var(--cream)":"none", border:"1px solid "+(active?"var(--cream)":"var(--bs)"), color:active?"var(--black)":"var(--cream)", fontFamily:"var(--FD)", fontSize:14, fontWeight:active?900:400, letterSpacing:1, transition:"all .16s ease", display:"flex", alignItems:"center", gap:8}}>
                        {o.label}
                        {o.extra>0 && <span style={{fontSize:12, opacity:.65, fontWeight:700}}>+{o.extra.toFixed(2)}€</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:20, paddingTop:20, borderTop:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap"}}>
            <div>
              <div style={{fontSize:11, fontFamily:"var(--FD)", fontWeight:700, letterSpacing:2, color:"rgba(240,232,214,.4)", marginBottom:4}}>TON CHOIX</div>
              <div style={{fontSize:13, color:"rgba(240,232,214,.7)", lineHeight:1.5}}>
                {chosen.label}
                {chosen.extra>0 && <span style={{marginLeft:8, color:"var(--pink)", fontFamily:"var(--FD)", fontWeight:700}}> +{chosen.extra.toFixed(2)}€</span>}
              </div>
            </div>
            <button type="button" className="bp" onClick={onAdd} disabled={disabled} style={{padding:"14px 32px", cursor:disabled?"not-allowed":"pointer", background:disabled?"var(--surface)":"var(--cream)", border:"none", fontFamily:"var(--FD)", fontSize:16, fontWeight:900, letterSpacing:2, color:disabled?"rgba(240,232,214,.3)":"var(--black)"}}>
              AJOUTER {!disabled && "— "+r2(menu.price+(chosen.extra||0)).toFixed(2)+"€"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartPanel({cart, cartTotal, finalTotal, loyaltyPts, redeemPts, onToggleRedeem, loyaltyDisc, menuById, qtyOf, onRemoveOne, onAddOne, onClear, onCheckout}) {
  return (
    <div style={{background:"var(--surface)", border:"1px solid var(--border)"}}>
      <div style={{padding:"20px 20px 16px", borderBottom:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <SL>PANIER</SL>
        <button onClick={onClear} style={{background:"none", border:"none", cursor:"pointer", fontSize:12, color:"rgba(240,232,214,.4)", fontFamily:"var(--FD)", letterSpacing:1}}>VIDER</button>
      </div>
      {cart.length===0 ? (
        <div style={{padding:"48px 20px", textAlign:"center", color:"rgba(240,232,214,.3)"}}>
          <div style={{fontSize:40, marginBottom:12}}>☕</div>
          <div style={{fontFamily:"var(--FD)", fontSize:16, fontWeight:700, letterSpacing:2}}>PANIER VIDE</div>
        </div>
      ) : (
        <div style={{padding:"16px 20px", display:"flex", flexDirection:"column", gap:12}}>
          {cart.map(it => (
            <div key={it.id} style={{display:"flex", alignItems:"flex-start", gap:12}}>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, fontWeight:500, lineHeight:1.35}}>{it.name}</div>
                <div style={{fontSize:12, color:"var(--pink)", fontFamily:"var(--FD)", fontWeight:700, marginTop:2}}>{it.qty}×{it.price.toFixed(2)}€ = {(it.qty*it.price).toFixed(2)}€</div>
              </div>
              <div style={{display:"flex", alignItems:"center", gap:6, flexShrink:0}}>
                <QBtn onClick={() => onRemoveOne(it.id)}>−</QBtn>
                <span style={{minWidth:18, textAlign:"center", fontSize:14, fontWeight:700, fontFamily:"var(--FD)"}}>{it.qty}</span>
                <QBtn onClick={() => onAddOne(it.baseId)} disabled={qtyOf(it.baseId)>=(menuById.get(it.baseId) ? menuById.get(it.baseId).stock : 0)}>+</QBtn>
              </div>
            </div>
          ))}
        </div>
      )}
      {loyaltyPts>=LS && (
        <div onClick={onToggleRedeem} style={{margin:"0 20px 16px", padding:"12px 14px", cursor:"pointer", background:redeemPts?"rgba(232,116,154,.1)":"none", border:"1px solid "+(redeemPts?"var(--pink)":"var(--border)"), display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>
            <div style={{fontFamily:"var(--FD)", fontSize:13, fontWeight:900, letterSpacing:1, color:redeemPts?"var(--pink)":"var(--cdim)"}}>✦ UTILISER MES POINTS</div>
            <div style={{fontSize:11, color:"rgba(240,232,214,.4)", marginTop:2}}>{loyaltyPts} pts → −{Math.floor(loyaltyPts/LS)}€</div>
          </div>
          <div style={{width:20, height:20, border:"1px solid var(--bs)", background:redeemPts?"var(--pink)":"none", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--black)", fontSize:11, fontWeight:900}}>{redeemPts?"✓":""}</div>
        </div>
      )}
      {cart.length>0 && (
        <div style={{padding:"0 20px 20px"}}>
          <div style={{borderTop:"1px solid var(--border)", paddingTop:14, marginBottom:14}}>
            {loyaltyDisc>0 && (
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:6, fontSize:13, color:"var(--pink)", fontFamily:"var(--FD)", fontWeight:700}}>
                <span>✦ FIDÉLITÉ</span><span>−{loyaltyDisc.toFixed(2)}€</span>
              </div>
            )}
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
              <span style={{fontFamily:"var(--FD)", fontSize:18, fontWeight:900, letterSpacing:1}}>TOTAL</span>
              <span style={{fontFamily:"var(--FD)", fontSize:28, fontWeight:900, color:"var(--cream)"}}>{finalTotal.toFixed(2)}€</span>
            </div>
          </div>
          <BigBtn onClick={onCheckout}>COMMANDER →</BigBtn>
        </div>
      )}
    </div>
  );
}

function Checkout({cart, cartTotal, finalTotal, loyaltyPts, redeemPts, onToggleRedeem, loyaltyDisc, pickupSlots, pickup, setPickup, firstName, setFirstName, lastName, setLastName, note, setNote, payMethod, onChoosePay, depMethod, onChooseDepPay, depPct, setDepPct, depAmt, remAmt, cardNum, setCardNum, cardExp, setCardExp, cardCvc, setCardCvc, wAuth, openW, paying, onValidate, onBack, onResetPay}) {
  return (
    <div style={{maxWidth:820, margin:"0 auto", padding:"40px 20px 120px"}} className="fu">
      <div style={{display:"flex", alignItems:"center", gap:16, marginBottom:40}}>
        <GhostBtn onClick={onBack}>← RETOUR</GhostBtn>
        <h1 style={{fontFamily:"var(--FD)", fontSize:"clamp(32px,5vw,56px)", fontWeight:900, letterSpacing:-1}}>FINALISER</h1>
      </div>
      <div style={{display:"grid", gap:2}}>
        <Block title="01 — CRÉNEAU DE RETRAIT">
          <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
            {pickupSlots.map(s => (
              <button key={s} type="button" className="bp" onClick={() => setPickup(s)} style={{padding:"12px 20px", cursor:"pointer", background:pickup===s?"var(--cream)":"none", border:"1px solid "+(pickup===s?"var(--cream)":"var(--bs)"), color:pickup===s?"var(--black)":"var(--cream)", fontFamily:"var(--FD)", fontSize:16, fontWeight:900, letterSpacing:1}}>{s}</button>
            ))}
          </div>
        </Block>
        <Block title="02 — INFORMATIONS">
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
            <IField label="PRÉNOM" value={firstName} onChange={e => setFirstName(e.target.value)} ph="Abigael" />
            <IField label="NOM" value={lastName} onChange={e => setLastName(e.target.value)} ph="Kere" />
          </div>
          <IField label="NOTE (optionnel)" value={note} onChange={e => setNote(e.target.value)} ph="Sans sucre, allergies…" style={{marginTop:12}} />
        </Block>
        <Block title="03 — RÉCAPITULATIF">
          {cart.map(it => (
            <div key={it.id} style={{display:"flex", justifyContent:"space-between", paddingBottom:10, borderBottom:"1px solid var(--border)", marginBottom:10, fontSize:13}}>
              <span style={{color:"rgba(240,232,214,.65)"}}>{it.qty}× {it.name}</span>
              <span style={{fontFamily:"var(--FD)", fontWeight:700}}>{(it.qty*it.price).toFixed(2)}€</span>
            </div>
          ))}
          {loyaltyPts>=LS && (
            <div onClick={onToggleRedeem} style={{cursor:"pointer", padding:"10px 12px", border:"1px solid "+(redeemPts?"var(--pink)":"var(--border)"), marginBottom:12, display:"flex", justifyContent:"space-between", background:redeemPts?"rgba(232,116,154,.08)":"none"}}>
              <span style={{fontFamily:"var(--FD)", fontSize:13, fontWeight:900, letterSpacing:1, color:redeemPts?"var(--pink)":"var(--cdim)"}}>✦ UTILISER POINTS ({loyaltyPts})</span>
              <span style={{fontFamily:"var(--FD)", fontSize:13, color:"var(--pink)"}}>{redeemPts ? "−"+loyaltyDisc.toFixed(2)+"€" : "ACTIVER"}</span>
            </div>
          )}
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
            <span style={{fontFamily:"var(--FD)", fontSize:16, fontWeight:900, letterSpacing:1}}>TOTAL</span>
            <span style={{fontFamily:"var(--FD)", fontSize:28, fontWeight:900}}>{finalTotal.toFixed(2)}€</span>
          </div>
        </Block>
        <Block title="04 — PAIEMENT">
          {!payMethod ? (
            <div className="checkout-pay-grid" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:2}}>
              {[{id:"applepay",l:"APPLE PAY",s:"Touch / Face ID"},{id:"googlepay",l:"GOOGLE PAY",s:"NFC wallet"},{id:"card",l:"CARTE",s:"CB · Visa · Mastercard"},{id:"deposit",l:"ACOMPTE",s:"Paye une partie maintenant"},{id:"cash",l:"SUR PLACE",s:"Paiement au van"}].map(p => (
                <button key={p.id} type="button" className="bp" onClick={() => onChoosePay(p.id)} style={{padding:"20px 18px", cursor:"pointer", textAlign:"left", background:"var(--surface)", border:"1px solid var(--border)", color:"var(--cream)"}}>
                  <div style={{fontFamily:"var(--FD)", fontSize:16, fontWeight:900, letterSpacing:1}}>{p.l}</div>
                  <div style={{fontSize:12, color:"rgba(240,232,214,.4)", marginTop:4}}>{p.s}</div>
                </button>
              ))}
            </div>
          ) : (
            <div style={{border:"1px solid var(--bs)", padding:20}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:16}}>
                <div style={{fontFamily:"var(--FD)", fontSize:16, fontWeight:900, letterSpacing:1}}>
                  {payMethod==="applepay"?"APPLE PAY":payMethod==="googlepay"?"GOOGLE PAY":payMethod==="card"?"CARTE":payMethod==="deposit"?"ACOMPTE":"SUR PLACE"}
                </div>
                <button onClick={onResetPay} style={{background:"none", border:"none", cursor:"pointer", fontSize:12, color:"rgba(240,232,214,.4)", fontFamily:"var(--FD)", letterSpacing:1, textDecoration:"underline"}}>CHANGER</button>
              </div>
              {payMethod==="card" && <CardFields cardNum={cardNum} setCardNum={setCardNum} cardExp={cardExp} setCardExp={setCardExp} cardCvc={cardCvc} setCardCvc={setCardCvc} />}
              {(payMethod==="applepay"||payMethod==="googlepay") && <WalletRow label={payMethod==="applepay"?"Apple Pay":"Google Pay"} auth={wAuth} onOpen={() => openW(payMethod==="applepay"?"Apple Pay":"Google Pay")} />}
              {payMethod==="cash" && <div style={{fontSize:13, color:"rgba(240,232,214,.5)", padding:"8px 0"}}>Paiement directement au van Kōfi lors du retrait. ✓</div>}
              {payMethod==="deposit" && <DepositBlock depPct={depPct} setDepPct={setDepPct} depAmt={depAmt} remAmt={remAmt} depMethod={depMethod} onChooseDepPay={onChooseDepPay} cardNum={cardNum} setCardNum={setCardNum} cardExp={cardExp} setCardExp={setCardExp} cardCvc={cardCvc} setCardCvc={setCardCvc} wAuth={wAuth} openW={openW} />}
            </div>
          )}
        </Block>
      </div>
      <button type="button" className="bp" onClick={onValidate} disabled={paying} style={{width:"100%", marginTop:20, padding:"22px", cursor:paying?"not-allowed":"pointer", background:paying?"var(--surface)":"var(--cream)", border:"none", fontFamily:"var(--FD)", fontSize:20, fontWeight:900, letterSpacing:3, color:paying?"rgba(240,232,214,.3)":"var(--black)"}}>
        {paying ? (
          <span style={{display:"flex", alignItems:"center", justifyContent:"center", gap:12}}>
            <span style={{width:16, height:16, borderRadius:"50%", border:"2px solid rgba(10,10,8,.2)", borderTopColor:"var(--black)", animation:"spin .7s linear infinite", display:"inline-block"}} />
            TRAITEMENT EN COURS…
          </span>
        ) : payMethod==="deposit" ? "PAYER L'ACOMPTE — "+depAmt.toFixed(2)+"€" : "CONFIRMER — "+finalTotal.toFixed(2)+"€"}
      </button>
      <div style={{textAlign:"center", fontSize:11, color:"rgba(240,232,214,.25)", marginTop:10, fontFamily:"var(--FD)", letterSpacing:1}}>PROTOTYPE · PAIEMENT SIMULÉ · AUCUNE DONNÉE RÉELLE</div>
    </div>
  );
}

function DepositBlock({depPct, setDepPct, depAmt, remAmt, depMethod, onChooseDepPay, cardNum, setCardNum, cardExp, setCardExp, cardCvc, setCardCvc, wAuth, openW}) {
  return (
    <div>
      <div style={{fontSize:13, color:"rgba(240,232,214,.5)", marginBottom:16}}>Tu paies un acompte maintenant, le reste à l'arrivée.</div>
      <div style={{marginBottom:16}}>
        <div style={{display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:8}}>
          <span style={{color:"rgba(240,232,214,.5)", fontFamily:"var(--FD)", letterSpacing:1}}>POURCENTAGE</span>
          <span style={{fontFamily:"var(--FD)", fontWeight:900, color:"var(--pink)"}}>{depPct}%</span>
        </div>
        <input type="range" min={10} max={70} step={5} value={depPct} onChange={e => setDepPct(Number(e.target.value))} style={{width:"100%", accentColor:"var(--pink)"}} />
        <div style={{display:"flex", justifyContent:"space-between", fontSize:12, marginTop:6}}>
          <span style={{color:"var(--cdim)"}}>Acompte <strong style={{color:"var(--cream)"}}>{depAmt.toFixed(2)}€</strong></span>
          <span style={{color:"var(--cdim)"}}>Reste <strong style={{color:"var(--cream)"}}>{remAmt.toFixed(2)}€</strong></span>
        </div>
      </div>
      <div style={{fontFamily:"var(--FD)", fontSize:12, letterSpacing:2, color:"rgba(240,232,214,.4)", marginBottom:10}}>PAYER L'ACOMPTE AVEC</div>
      {!depMethod ? (
        <div style={{display:"flex", gap:8}}>
          {["applepay","googlepay","card"].map(m => (
            <button key={m} type="button" className="bp" onClick={() => onChooseDepPay(m)} style={{flex:1, padding:"12px 8px", cursor:"pointer", background:"var(--surface)", border:"1px solid var(--border)", color:"var(--cream)", fontFamily:"var(--FD)", fontSize:13, fontWeight:700, letterSpacing:1}}>{m==="applepay"?"Apple Pay":m==="googlepay"?"Google Pay":"Carte"}</button>
          ))}
        </div>
      ) : (
        <div style={{border:"1px solid var(--border)", padding:14}}>
          {depMethod==="card" && <CardFields cardNum={cardNum} setCardNum={setCardNum} cardExp={cardExp} setCardExp={setCardExp} cardCvc={cardCvc} setCardCvc={setCardCvc} />}
          {(depMethod==="applepay"||depMethod==="googlepay") && <WalletRow label={depMethod==="applepay"?"Apple Pay":"Google Pay"} auth={wAuth} onOpen={() => openW(depMethod==="applepay"?"Apple Pay":"Google Pay")} />}
        </div>
      )}
    </div>
  );
}

function CardFields({cardNum, setCardNum, cardExp, setCardExp, cardCvc, setCardCvc}) {
  return (
    <div style={{display:"grid", gap:10}}>
      <IField label="NUMÉRO" value={cardNum} onChange={e => setCardNum(e.target.value)} ph="1234 5678 9012 3456" />
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
        <IField label="EXPIRATION" value={cardExp} onChange={e => setCardExp(e.target.value)} ph="MM/AA" />
        <IField label="CVC" value={cardCvc} onChange={e => setCardCvc(e.target.value)} ph="123" />
      </div>
    </div>
  );
}

function WalletRow({label, auth, onOpen}) {
  return (
    <div style={{display:"flex", alignItems:"center", gap:14}}>
      <button type="button" className="bp" onClick={onOpen} style={{padding:"12px 20px", cursor:"pointer", background:"var(--surface)", border:"1px solid var(--bs)", fontFamily:"var(--FD)", fontSize:14, fontWeight:700, letterSpacing:1, color:"var(--cream)"}}>OUVRIR {label.toUpperCase()}</button>
      <span style={{fontFamily:"var(--FD)", fontSize:13, fontWeight:700, letterSpacing:1, color:auth?"var(--green)":"rgba(240,232,214,.4)"}}>{auth?"✓ AUTORISÉ":"EN ATTENTE"}</span>
    </div>
  );
}

function TrackingStrip({tracking, onViewReceipt, onClose}) {
  const pct   = Math.round(((tracking.totalSec-tracking.leftSec)/tracking.totalSec)*100);
  const ready = tracking.status==="ready";
  return (
    <div className="su" style={{background:ready?"var(--green)":"var(--surface)", borderTop:"2px solid "+(ready?"rgba(74,124,89,.6)":"var(--bs)"), padding:"14px 24px"}}>
      <div style={{maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", gap:20, flexWrap:"wrap"}}>
        <div style={{flex:1, minWidth:200}}>
          <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:ready?0:6}}>
            <span style={{fontFamily:"var(--FD)", fontSize:16, fontWeight:900, letterSpacing:2, color:ready?"var(--black)":"var(--cream)"}}>{ready?"✓ PRÊT !":"☕ EN PRÉPARATION"}</span>
            <span style={{fontFamily:"var(--FD)", fontSize:13, fontWeight:700, letterSpacing:1, padding:"2px 10px", background:ready?"rgba(0,0,0,.15)":"var(--surface2)", color:ready?"var(--black)":"var(--pink)"}}>{tracking.code}</span>
          </div>
          {!ready && (
            <div style={{display:"flex", alignItems:"center", gap:12}}>
              <div style={{flex:1, height:3, background:"rgba(240,232,214,.1)", overflow:"hidden"}}>
                <div style={{height:"100%", width:pct+"%", background:"var(--cream)", transition:"width .6s ease"}} />
              </div>
              <span style={{fontFamily:"var(--FD)", fontSize:15, fontWeight:900, color:"var(--cream)", minWidth:48}}>{fmt(tracking.leftSec)}</span>
              <span style={{fontSize:12, color:"rgba(240,232,214,.4)"}}>Retrait {tracking.pickup}</span>
            </div>
          )}
        </div>
        <div style={{display:"flex", gap:8}}>
          <button type="button" className="bp" onClick={onViewReceipt} style={{padding:"10px 18px", cursor:"pointer", background:"none", border:"1px solid "+(ready?"rgba(0,0,0,.3)":"var(--bs)"), fontFamily:"var(--FD)", fontSize:13, fontWeight:700, letterSpacing:1, color:ready?"var(--black)":"var(--cream)"}}>REÇU</button>
          <button type="button" onClick={onClose} style={{background:"none", border:"none", cursor:"pointer", color:ready?"rgba(0,0,0,.5)":"rgba(240,232,214,.4)", fontSize:18, padding:"4px 8px"}}>✕</button>
        </div>
      </div>
    </div>
  );
}

function LoyaltyView({pts, history}) {
  const earned = history.reduce((s,o) => s+(o.ptsEarned||0), 0);
  const next   = LS - (pts%LS);
  const lvl    = pts<500?"BRONZE":pts<1500?"SILVER":pts<3000?"GOLD":"PLATINUM";
  const lvlColor = {BRONZE:"#cd7f32", SILVER:"#aaa", GOLD:"var(--pink)", PLATINUM:"#e5e4e2"}[lvl];
  return (
    <div style={{maxWidth:800, margin:"0 auto", padding:"40px 20px 120px"}} className="fu">
      <SL style={{marginBottom:40}}>PROGRAMME FIDÉLITÉ</SL>
      <div style={{background:"var(--surface)", border:"1px solid var(--border)", padding:40, marginBottom:2, textAlign:"center"}}>
        <div style={{fontFamily:"var(--FD)", fontSize:"clamp(64px,12vw,120px)", fontWeight:900, lineHeight:1, color:"var(--cream)"}}>{pts.toLocaleString()}</div>
        <div style={{fontFamily:"var(--FD)", fontSize:16, fontWeight:700, letterSpacing:3, color:"rgba(240,232,214,.4)", marginBottom:24}}>POINTS</div>
        <div style={{display:"inline-block", padding:"8px 24px", border:"2px solid "+lvlColor, fontFamily:"var(--FD)", fontSize:18, fontWeight:900, letterSpacing:3, color:lvlColor, marginBottom:24}}>{lvl}</div>
        <div style={{height:4, background:"rgba(240,232,214,.1)", marginBottom:10}}>
          <div style={{height:"100%", width:((pts%LS)/LS*100)+"%", background:"var(--pink)", transition:"width .6s ease"}} />
        </div>
        <div style={{fontSize:13, color:"rgba(240,232,214,.4)", fontFamily:"var(--FD)", letterSpacing:1}}>ENCORE {next} PTS POUR +1€ DE RÉDUCTION</div>
      </div>
      <div className="grid-2" style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:2, marginBottom:2}}>
        {[{icon:"🛒",label:"COMMANDES",v:history.length},{icon:"✦",label:"PTS GAGNÉS",v:earned.toLocaleString()},{icon:"💰",label:"RÉDUCTIONS",v:Math.floor(pts/LS)+"€"}].map(s => (
          <div key={s.label} style={{background:"var(--surface)", padding:"28px 20px", textAlign:"center", border:"1px solid var(--border)"}}>
            <div style={{fontSize:28, marginBottom:10}}>{s.icon}</div>
            <div style={{fontFamily:"var(--FD)", fontSize:"clamp(24px,4vw,40px)", fontWeight:900}}>{s.v}</div>
            <div style={{fontFamily:"var(--FD)", fontSize:11, fontWeight:700, letterSpacing:2, color:"rgba(240,232,214,.4)", marginTop:4}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{background:"var(--surface)", border:"1px solid var(--border)", padding:32}}>
        <SL style={{marginBottom:24}}>COMMENT ÇA MARCHE</SL>
        {[{n:"01",t:LR+" PTS PAR EURO",s:"Accumulés automatiquement à chaque commande."},{n:"02",t:LS+" PTS = 1€ DE RÉDUCTION",s:"Activable au checkout en un clic."},{n:"03",t:"4 NIVEAUX DE STATUT",s:"Bronze → Silver → Gold → Platinum."}].map(item => (
          <div key={item.n} style={{display:"flex", gap:20, paddingBottom:20, borderBottom:"1px solid var(--border)", marginBottom:20, alignItems:"flex-start"}}>
            <div style={{fontFamily:"var(--FD)", fontSize:40, fontWeight:900, color:"rgba(240,232,214,.1)", lineHeight:1, flexShrink:0}}>{item.n}</div>
            <div>
              <div style={{fontFamily:"var(--FD)", fontSize:16, fontWeight:900, letterSpacing:2, marginBottom:4}}>{item.t}</div>
              <div style={{fontSize:13, color:"rgba(240,232,214,.5)"}}>{item.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoryView({history}) {
  if (!history.length) return (
    <div style={{textAlign:"center", padding:"80px 20px", maxWidth:600, margin:"0 auto"}} className="fu">
      <div style={{fontSize:56, marginBottom:20}}>☕</div>
      <div style={{fontFamily:"var(--FD)", fontSize:"clamp(32px,6vw,56px)", fontWeight:900, letterSpacing:-1}}>AUCUNE COMMANDE</div>
      <div style={{fontSize:14, color:"rgba(240,232,214,.4)", marginTop:12}}>Passe ta première commande pour voir l'historique ici.</div>
    </div>
  );
  return (
    <div style={{maxWidth:800, margin:"0 auto", padding:"40px 20px 120px"}} className="fu">
      <SL style={{marginBottom:40}}>HISTORIQUE</SL>
      <div style={{display:"flex", flexDirection:"column", gap:2}}>
        {history.map(o => (
          <div key={o.code} style={{background:"var(--surface)", border:"1px solid var(--border)", padding:"20px 24px"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12}}>
              <div>
                <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:4}}>
                  <span style={{fontFamily:"var(--FD)", fontSize:18, fontWeight:900, letterSpacing:2, color:"var(--pink)"}}>{o.code}</span>
                  <span style={{fontSize:12, color:"rgba(240,232,214,.4)"}}>{new Date(o.date).toLocaleDateString("fr-FR",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</span>
                </div>
                <div style={{fontSize:13, color:"rgba(240,232,214,.5)"}}>{o.name} · {o.pickup} · {o.paymentLabel}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"var(--FD)", fontSize:24, fontWeight:900}}>{o.finalTotal.toFixed(2)}€</div>
                {o.ptsEarned>0 && <div style={{fontSize:12, color:"var(--pink)", fontFamily:"var(--FD)", fontWeight:700}}>+{o.ptsEarned} pts</div>}
              </div>
            </div>
            <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
              {o.items.map((it,j) => (
                <span key={j} style={{padding:"4px 12px", border:"1px solid var(--border)", fontFamily:"var(--FD)", fontSize:11, fontWeight:700, letterSpacing:1, color:"rgba(240,232,214,.5)"}}>{it.qty}× {it.name.split(" — ")[0]}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutBlock() {
  return (
    <div style={{marginTop:40, background:"var(--surface)", border:"1px solid var(--border)", padding:40}}>
      <SL style={{marginBottom:20}}>À PROPOS</SL>
      <p style={{fontSize:15, color:"rgba(240,232,214,.65)", lineHeight:1.8, fontWeight:300, maxWidth:560}}>
        <strong style={{color:"var(--cream)", fontWeight:500}}>KŌFI</strong> est né d'un constat simple — sur le campus, tout va vite sauf les pauses.
        Un van, une app, une seule promesse : <strong style={{color:"var(--cream)"}}>zéro perte de temps.</strong>
      </p>
    </div>
  );
}

function AboutModal({onClose}) {
  return (
    <div>
      <div style={{marginBottom:32}}>
        <div style={{fontFamily:"var(--FD)", fontSize:"clamp(36px,6vw,64px)", fontWeight:900, lineHeight:.92, letterSpacing:-1, color:"var(--cream)", marginBottom:20}}>
          NÉ SUR<br />
          <span style={{color:"var(--pink)"}}>LE CAMPUS.</span><br />
          FAIT POUR TOI.
        </div>
        <div style={{width:48, height:3, background:"var(--pink)", marginBottom:20}} />
        <p style={{fontSize:15, color:"rgba(240,232,214,.65)", lineHeight:1.85, fontWeight:300, maxWidth:540}}>
          Sur le campus, tout va vite… sauf les pauses. Files d'attente, distributeurs en panne, emplois du temps sans marge.
          <br /><br />
          <strong style={{color:"var(--cream)", fontWeight:500}}>KŌFI</strong> est né de ce constat. Un van stationné sur le campus, une plateforme pour commander à l'avance, et un seul objectif : te faire gagner du temps à chaque pause.
          <br /><br />
          Tu commandes. Tu arrives. Tu repars. <strong style={{color:"var(--cream)"}}>Zéro attente.</strong>
        </p>
      </div>
      <div className="grid-2" style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:2, marginBottom:2}}>
        {[{n:"01",t:"RAPIDITÉ",s:"Commande en 30 secondes, récupère en moins."},{n:"02",t:"QUALITÉ",s:"Produits sélectionnés, options personnalisables."},{n:"03",t:"PROXIMITÉ",s:"Un van sur ton campus. Pas ailleurs."}].map(v => (
          <div key={v.n} style={{background:"var(--surface2)", border:"1px solid var(--border)", padding:"24px 20px"}}>
            <div style={{fontFamily:"var(--FD)", fontSize:40, fontWeight:900, color:"rgba(240,232,214,.07)", lineHeight:1, marginBottom:8}}>{v.n}</div>
            <div style={{fontFamily:"var(--FD)", fontSize:16, fontWeight:900, letterSpacing:2, marginBottom:8}}>{v.t}</div>
            <div style={{fontSize:12, color:"rgba(240,232,214,.45)", lineHeight:1.6}}>{v.s}</div>
          </div>
        ))}
      </div>
      <div style={{background:"var(--pink)", padding:"24px 28px", marginBottom:2}}>
        <div style={{fontFamily:"var(--FD)", fontSize:12, fontWeight:900, letterSpacing:3, color:"rgba(10,10,8,.5)", marginBottom:8}}>NOTRE MISSION</div>
        <div style={{fontFamily:"var(--FD)", fontSize:"clamp(18px,3vw,24px)", fontWeight:900, color:"var(--black)", lineHeight:1.25}}>
          Rendre les pauses campus plus simples, plus rapides, et franchement meilleures.
        </div>
      </div>
      <div className="about-grid" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, marginBottom:2}}>
        <div style={{background:"var(--surface)", border:"1px solid var(--border)", padding:"20px 24px"}}>
          <SL style={{marginBottom:12}}>HORAIRES</SL>
          <div style={{fontFamily:"var(--FD)", fontSize:18, fontWeight:700, marginBottom:4}}>Lun–Ven</div>
          <div style={{fontSize:14, color:"rgba(240,232,214,.6)", marginBottom:10}}>08:00 → 18:30</div>
          <div style={{fontFamily:"var(--FD)", fontSize:18, fontWeight:700, marginBottom:4}}>Samedi</div>
          <div style={{fontSize:14, color:"rgba(240,232,214,.6)"}}>10:00 → 15:00</div>
        </div>
        <div style={{background:"var(--surface)", border:"1px solid var(--border)", padding:"20px 24px"}}>
          <SL style={{marginBottom:12}}>NOUS TROUVER</SL>
          <div style={{fontSize:14, color:"rgba(240,232,214,.6)", lineHeight:2.2}}>
            Van KŌFI — Campus<br />
            📸 @kofi.campus<br />
            ✉️ contact@kofi-campus.com
          </div>
        </div>
      </div>
      <button type="button" className="bp" onClick={onClose} style={{width:"100%", padding:"18px", background:"var(--cream)", border:"none", cursor:"pointer", fontFamily:"var(--FD)", fontSize:16, fontWeight:900, letterSpacing:2, color:"var(--black)"}}>FERMER</button>
    </div>
  );
}

function ReviewsBlock() {
  const reviews = [
    {n:"Sara",  t:"Click&collect sur campus — récupéré en 30 secondes. Impeccable.", s:5},
    {n:"Yanis", t:"Le Boost est excellent. L'app est vraiment propre et rapide.", s:5},
    {n:"Inès",  t:"Lait d'avoine + sirop + retrait à l'heure. Tout ce qu'il faut.", s:4},
    {n:"Malo",  t:"Ce qui manquait à la fac. Moins de queue, plus de vie.", s:5},
  ];
  return (
    <div style={{marginTop:2}}>
      <div style={{background:"var(--surface)", border:"1px solid var(--border)", padding:"28px 32px", borderBottom:"none"}}><SL>AVIS CLIENTS</SL></div>
      <div className="reviews-grid" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:2}}>
        {reviews.map((r,i) => (
          <div key={i} style={{background:"var(--surface)", border:"1px solid var(--border)", padding:"20px 24px"}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:10}}>
              <span style={{fontFamily:"var(--FD)", fontSize:16, fontWeight:900, letterSpacing:1}}>{r.n.toUpperCase()}</span>
              <span style={{color:"var(--pink)", fontSize:14}}>{"★".repeat(r.s)+"☆".repeat(5-r.s)}</span>
            </div>
            <p style={{fontSize:13, color:"rgba(240,232,214,.6)", lineHeight:1.6, fontWeight:300}}>"{r.t}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQBlock() {
  const faqs = [
    {q:"C'est quoi l'acompte ?", a:"Tu paies une partie maintenant (ex: 30%), le reste à l'arrivée."},
    {q:"Peut-on annuler ?", a:"Prototype : simulation uniquement. La version finale inclura des annulations avant préparation."},
    {q:"Où récupère-t-on ?", a:"Au van Kōfi sur le campus, au créneau choisi lors de la commande."},
    {q:"Comment marche la fidélité ?", a:LR+" pts par euro. "+LS+" pts = 1€ de réduction au checkout."},
  ];
  return (
    <div style={{marginTop:2}}>
      <div style={{background:"var(--surface)", border:"1px solid var(--border)", padding:"28px 32px", borderBottom:"none"}}><SL>FAQ</SL></div>
      {faqs.map((f,i) => (
        <div key={i} style={{background:"var(--surface)", border:"1px solid var(--border)", padding:"20px 32px", marginTop:2}}>
          <div style={{fontFamily:"var(--FD)", fontSize:16, fontWeight:900, letterSpacing:1, marginBottom:8}}>{f.q.toUpperCase()}</div>
          <div style={{fontSize:13, color:"rgba(240,232,214,.55)", lineHeight:1.6, fontWeight:300}}>{f.a}</div>
        </div>
      ))}
    </div>
  );
}

function FooterBlock() {
  return (
    <footer style={{marginTop:2, background:"var(--surface)", border:"1px solid var(--border)", padding:"32px 32px 24px"}}>
      <div className="grid-footer" style={{display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:24, marginBottom:24}}>
        <div>
          <div style={{fontFamily:"var(--FD)", fontSize:32, fontWeight:900, letterSpacing:3, marginBottom:8}}>KŌFI</div>
          <div style={{fontSize:13, color:"rgba(240,232,214,.4)", fontWeight:300}}>Your break, upgraded ☕<br />Prototype étudiant</div>
        </div>
        {[{t:"HORAIRES",ls:["Lun–Ven : 08:00–18:30","Sam : 10:00–15:00"]},{t:"CONTACT",ls:["contact@kofi-campus.com","Support : DM Insta"]},{t:"INSTAGRAM",ls:["@kofi.campus","Nouveautés · Réassort"]}].map(col => (
          <div key={col.t}>
            <div style={{fontFamily:"var(--FD)", fontSize:12, fontWeight:900, letterSpacing:2, color:"rgba(240,232,214,.4)", marginBottom:12}}>{col.t}</div>
            {col.ls.map(l => <div key={l} style={{fontSize:12, color:"rgba(240,232,214,.5)", lineHeight:2, fontWeight:300}}>{l}</div>)}
          </div>
        ))}
      </div>
      <div style={{borderTop:"1px solid var(--border)", paddingTop:16, fontSize:11, color:"rgba(240,232,214,.25)", fontFamily:"var(--FD)", letterSpacing:1}}>
        © {new Date().getFullYear()} KŌFI — PROTOTYPE ÉTUDIANT · PAIEMENT SIMULÉ
      </div>
    </footer>
  );
}

function Modal({onClose, title, children, wide}) {
  return (
    <div onClick={onClose} style={{position:"fixed", inset:0, zIndex:300, background:"rgba(0,0,0,.85)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", padding:20}}>
      <div className="pop" onClick={e => e.stopPropagation()} style={{width:"min("+(wide?"780px":"460px")+",100%)", maxHeight:"90vh", overflowY:"auto", background:"var(--off-black)", border:"1px solid var(--bs)"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 24px", borderBottom:"1px solid var(--border)", position:"sticky", top:0, background:"var(--off-black)", zIndex:1}}>
          <div style={{fontFamily:"var(--FD)", fontSize:16, fontWeight:900, letterSpacing:2}}>{title}</div>
          <button onClick={onClose} style={{background:"none", border:"1px solid var(--border)", cursor:"pointer", padding:"6px 14px", color:"var(--cdim)", fontFamily:"var(--FD)", fontSize:14, fontWeight:700, letterSpacing:1}}>✕</button>
        </div>
        <div style={{padding:24}}>{children}</div>
      </div>
    </div>
  );
}

function WalletFlow({stage, amount, onConfirm, onClose}) {
  return (
    <div style={{textAlign:"center"}}>
      <div style={{fontFamily:"var(--FD)", fontSize:13, fontWeight:700, letterSpacing:2, color:"rgba(240,232,214,.4)", marginBottom:8}}>PAIEMENT SIMULÉ</div>
      <div style={{fontFamily:"var(--FD)", fontSize:48, fontWeight:900, marginBottom:24}}>{amount.toFixed(2)}€</div>
      {stage==="confirm" && (
        <div>
          <div style={{fontSize:14, color:"rgba(240,232,214,.5)", marginBottom:20}}>Confirme pour autoriser (simulation)</div>
          <BigBtn onClick={onConfirm}>CONFIRMER</BigBtn>
        </div>
      )}
      {stage==="scanning" && (
        <div>
          <div style={{width:80, height:80, border:"1px solid var(--bs)", margin:"0 auto 16px", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <div style={{width:40, height:40, border:"2px solid var(--cream)", animation:"pulse 1.2s infinite"}} />
          </div>
          <div style={{fontFamily:"var(--FD)", fontSize:13, letterSpacing:2, color:"rgba(240,232,214,.5)"}}>VÉRIFICATION…</div>
        </div>
      )}
      {stage==="authorized" && (
        <div>
          <div style={{fontFamily:"var(--FD)", fontSize:48, color:"var(--green)", marginBottom:8}}>✓</div>
          <div style={{fontFamily:"var(--FD)", fontSize:18, fontWeight:900, letterSpacing:2, marginBottom:8}}>AUTORISÉ</div>
          <div style={{fontSize:13, color:"rgba(240,232,214,.5)", marginBottom:20}}>Tu peux maintenant valider ta commande.</div>
          <BigBtn onClick={onClose}>CONTINUER</BigBtn>
        </div>
      )}
    </div>
  );
}

function ReceiptView({order, onClose}) {
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", marginBottom:24}}>
        <div>
          <div style={{fontFamily:"var(--FD)", fontSize:28, fontWeight:900, letterSpacing:3}}>KŌFI</div>
          <div style={{fontSize:12, color:"rgba(240,232,214,.4)", fontFamily:"var(--FD)", letterSpacing:1}}>YOUR BREAK, UPGRADED</div>
        </div>
        <div style={{textAlign:"right", fontSize:13, color:"rgba(240,232,214,.5)"}}>
          <div>{new Date(order.date).toLocaleString("fr-FR")}</div>
          <div>Retrait <strong style={{color:"var(--cream)"}}>{order.pickup}</strong></div>
          <div style={{fontFamily:"var(--FD)", fontWeight:900, color:"var(--pink)", marginTop:4, letterSpacing:2}}>{order.code}</div>
        </div>
      </div>
      <div style={{borderTop:"1px solid var(--border)", paddingTop:16, marginBottom:16, fontSize:13, color:"rgba(240,232,214,.5)"}}>{order.name} · {order.paymentLabel}</div>
      {order.items.map((it,i) => (
        <div key={i} style={{display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid var(--border)"}}>
          <div>
            <div style={{fontSize:13, fontWeight:500}}>{it.name}</div>
            <div style={{fontSize:11, color:"rgba(240,232,214,.4)", fontFamily:"var(--FD)", marginTop:2}}>{it.qty}×{it.unit.toFixed(2)}€</div>
          </div>
          <div style={{fontFamily:"var(--FD)", fontWeight:900}}>{it.line.toFixed(2)}€</div>
        </div>
      ))}
      <div style={{border:"1px solid var(--border)", marginTop:16, padding:16}}>
        {order.discount>0 && (
          <div style={{display:"flex", justifyContent:"space-between", fontSize:13, color:"var(--pink)", marginBottom:8, fontFamily:"var(--FD)", fontWeight:700}}>
            <span>✦ FIDÉLITÉ</span><span>−{order.discount.toFixed(2)}€</span>
          </div>
        )}
        <div style={{display:"flex", justifyContent:"space-between", marginBottom:8}}>
          <span style={{fontFamily:"var(--FD)", fontSize:18, fontWeight:900, letterSpacing:1}}>TOTAL</span>
          <span style={{fontFamily:"var(--FD)", fontSize:28, fontWeight:900}}>{order.finalTotal.toFixed(2)}€</span>
        </div>
        {order.paidNow>0 && <div style={{display:"flex", justifyContent:"space-between", fontSize:13, color:"rgba(240,232,214,.5)"}}><span>Payé maintenant</span><span style={{fontFamily:"var(--FD)", fontWeight:700}}>{order.paidNow.toFixed(2)}€</span></div>}
        {order.remaining>0 && <div style={{display:"flex", justifyContent:"space-between", fontSize:13, color:"rgba(240,232,214,.5)", marginTop:4}}><span>Reste à payer</span><span style={{fontFamily:"var(--FD)", fontWeight:700}}>{order.remaining.toFixed(2)}€</span></div>}
        {order.ptsEarned>0 && <div style={{marginTop:12, paddingTop:12, borderTop:"1px solid var(--border)", fontFamily:"var(--FD)", fontSize:13, fontWeight:900, letterSpacing:1, color:"var(--pink)"}}>✦ +{order.ptsEarned} POINTS FIDÉLITÉ</div>}
      </div>
      <button type="button" className="bp" onClick={onClose} style={{width:"100%", marginTop:16, padding:"16px", background:"none", border:"1px solid var(--bs)", cursor:"pointer", fontFamily:"var(--FD)", fontSize:15, fontWeight:900, letterSpacing:2, color:"var(--cream)"}}>FERMER</button>
    </div>
  );
}

function SL({children, style}) {
  return <div style={{fontFamily:"var(--FD)", fontSize:12, fontWeight:900, letterSpacing:4, color:"rgba(240,232,214,.4)", ...(style||{})}}>{children}</div>;
}

function Block({title, children}) {
  return (
    <div style={{background:"var(--surface)", border:"1px solid var(--border)", padding:"24px 28px", marginBottom:2}}>
      <SL style={{marginBottom:16}}>{title}</SL>
      {children}
    </div>
  );
}

function IField({label, value, onChange, ph, style}) {
  return (
    <div style={style||{}}>
      <div style={{fontFamily:"var(--FD)", fontSize:11, fontWeight:900, letterSpacing:2, color:"rgba(240,232,214,.4)", marginBottom:8}}>{label}</div>
      <div style={{borderBottom:"1px solid var(--bs)", paddingBottom:10}}>
        <input value={value} onChange={onChange} placeholder={ph} style={{fontSize:15, color:"var(--cream)", background:"none", border:"none", outline:"none", width:"100%"}} />
      </div>
    </div>
  );
}

function QBtn({onClick, disabled, children}) {
  return (
    <button type="button" className="bp" onClick={onClick} disabled={disabled} style={{width:28, height:28, flexShrink:0, background:"none", border:"1px solid var(--border)", color:disabled?"rgba(240,232,214,.2)":"var(--cream)", cursor:disabled?"not-allowed":"pointer", fontFamily:"var(--FD)", fontSize:18, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center"}}>{children}</button>
  );
}

function GhostBtn({onClick, children}) {
  return (
    <button type="button" className="bp" onClick={onClick} style={{padding:"8px 16px", cursor:"pointer", background:"none", border:"1px solid var(--border)", color:"var(--cdim)", fontFamily:"var(--FD)", fontSize:13, fontWeight:700, letterSpacing:1}}>{children}</button>
  );
}

function BigBtn({onClick, children}) {
  return (
    <button type="button" className="bp" onClick={onClick} style={{width:"100%", padding:"18px", background:"var(--cream)", border:"none", cursor:"pointer", fontFamily:"var(--FD)", fontSize:18, fontWeight:900, letterSpacing:2, color:"var(--black)"}}>{children}</button>
  );
}

function Confetti() {
  const pieces = useMemo(() => Array.from({length:24}, (_,i) => i), []);
  const colors = ["var(--cream)","var(--pink)","var(--green)","#7eb4f0","var(--red)"];
  return (
    <div style={{position:"fixed", inset:0, pointerEvents:"none", zIndex:400, overflow:"hidden"}}>
      {pieces.map(i => (
        <span key={i} style={{position:"absolute", top:0, left:(Math.random()*100)+"%", width:10, height:10, background:colors[~~(Math.random()*colors.length)], animation:"cfall "+(1+Math.random())+"s ease forwards", animationDelay:(Math.random()*.5)+"s", transform:"rotate("+(~~(Math.random()*90))+"deg)"}} />
      ))}
    </div>
  );
}

function Toast({msg}) {
  return (
    <div style={{position:"fixed", top:80, right:20, zIndex:500, padding:"10px 20px", background:"var(--cream)", color:"var(--black)", fontFamily:"var(--FD)", fontSize:14, fontWeight:900, letterSpacing:1, animation:"slideI .25s cubic-bezier(.22,1,.36,1) both"}}>{msg}</div>
  );
}

function Banner({banner}) {
  const ok = banner.type==="success";
  return (
    <div style={{position:"fixed", bottom:80, left:"50%", transform:"translateX(-50%)", zIndex:500, padding:"14px 28px", maxWidth:480, width:"calc(100% - 32px)", background:ok?"var(--green)":"var(--red)", fontFamily:"var(--FD)", fontSize:14, fontWeight:900, letterSpacing:1, color:"white", textAlign:"center", animation:"slideU .3s cubic-bezier(.22,1,.36,1) both"}}>{banner.msg}</div>
  );
}
