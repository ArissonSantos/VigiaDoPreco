let currentTab = 'inicio';
    let selectedIndex = 0;
    let selectedMarketIndex = 0;
    let simulatorCart = {}; 
    let currentCategoryFilter = 'Todos';
    let marketSortOrder = 'asc';
    let globalSearchTerm = '';
    let currentRegionFilter = 'Todas'; 
    
    let userCoords = null; 

    let currentUser = null;
    let userAlerts = [
      { id: 1, productId: 1, name: "Arroz Agulhinha Tipo 1", size: "5 kg", targetPrice: 25.00, escopoText: "🌍 Todos os Estados (Centro-Oeste)", rawEstado: "todos", rawCidade: "todas_cidades", rawRede: "todas" },
      { id: 2, productId: 7, name: "Café Tradicional Torrado", size: "500 g", targetPrice: 15.00, escopoText: "📍 Estado: DF (Brasília e Entorno)", rawEstado: "DF", rawCidade: "Brasília e Entorno", rawRede: "todas" }
    ];

    const coMarkets = [
      { id: 1, name: "Atacadão (Asa Norte)", state: "DF", network: "Atacadão", region: "Brasília - DF", emoji: "🛒", lat: -15.7801, lng: -47.8842 },
      { id: 2, name: "Assaí Atacadista (Taguatinga)", state: "DF", network: "Assaí", region: "Taguatinga - DF", emoji: "🏬", lat: -15.8322, lng: -48.0567 },
      { id: 3, name: "Super Adega (SIA)", state: "DF", network: "Super Adega", region: "SIA / Brasília - DF", emoji: "🍷", lat: -15.8115, lng: -47.9421 },
      { id: 4, name: "Atacadão (Goiânia - Campinas)", state: "GO", network: "Atacadão", region: "Goiânia - GO", emoji: "🛒", lat: -16.6664, lng: -49.2576 },
      { id: 5, name: "Comper Supermercados (Goiânia)", state: "GO", network: "Comper", region: "Goiânia - GO", emoji: "🛍️", lat: -16.6869, lng: -49.2648 },
      { id: 6, name: "Assaí Atacadista (Anápolis)", state: "GO", network: "Assaí", region: "Anápolis - GO", emoji: "🏬", lat: -16.3281, lng: -48.9534 },
      { id: 7, name: "Comper (Cuiabá - CPA)", state: "MT", network: "Comper", region: "Cuiabá - MT", emoji: "🛍️", lat: -15.5989, lng: -56.0949 },
      { id: 8, name: "Atacadão (Várzea Grande)", state: "MT", network: "Atacadão", region: "Várzea Grande - MT", emoji: "🛒", lat: -15.6456, lng: -56.1321 },
      { id: 9, name: "Fort Atacadista (Rondonópolis)", state: "MT", network: "Fort Atacadista", region: "Rondonópolis - MT", emoji: "📦", lat: -16.4675, lng: -54.6372 },
      { id: 10, name: "Comper (Campo Grande - Centro)", state: "MS", network: "Comper", region: "Campo Grande - MS", emoji: "🛍️", lat: -20.4428, lng: -54.646 },
      { id: 11, name: "Fort Atacadista (Dourados)", state: "MS", network: "Fort Atacadista", region: "Dourados - MS", emoji: "📦", lat: -22.2211, lng: -54.8056 },
      { id: 12, name: "Atacadão (Campo Grande)", state: "MS", network: "Atacadão", region: "Campo Grande - MS", emoji: "🛒", lat: -20.4697, lng: -54.6201 }
    ];

    let products = [];
    
    function generateProductsDatabase() {
      const baseNames = [
        { name: "Arroz Agulhinha Tipo 1", cat: "Cesta Básica", emoji: "🍚", size: "5 kg", price: 27.50 },
        { name: "Feijão Carioca", cat: "Cesta Básica", emoji: "🫘", size: "1 kg", price: 6.90 },
        { name: "Açúcar Cristal", cat: "Cesta Básica", emoji: "🍬", size: "5 kg", price: 17.80 },
        { name: "Óleo de Soja", cat: "Cesta Básica", emoji: "🫗", size: "900 ml", price: 5.90 },
        { name: "Macarrão Espaguete", cat: "Cesta Básica", emoji: "🍝", size: "500 g", price: 3.90 },
        { name: "Farinha de Trigo", cat: "Cesta Básica", emoji: "🌾", size: "1 kg", price: 4.80 },
        { name: "Café Tradicional Torrado", cat: "Mercearia", emoji: "☕", size: "500 g", price: 15.90 },
        { name: "Café Gourmet Grãos", cat: "Mercearia", emoji: "☕", size: "500 g", price: 28.90, premium: true },
        { name: "Leite Condensado", cat: "Mercearia", emoji: "🍮", size: "395 g", price: 5.50 },
        { name: "Azeite de Oliva Ext. Virgem", cat: "Mercearia", emoji: "🫒", size: "500 ml", price: 37.90 },
        { name: "Molho de Tomate", cat: "Mercearia", emoji: "🍅", size: "340 g", price: 2.60 },
        { name: "Tomate Carmem", cat: "Hortifrúti", emoji: "🍅", size: "1 kg", price: 6.50 },
        { name: "Cebola Pera", cat: "Hortifrúti", emoji: "🧅", size: "1 kg", price: 4.50 },
        { name: "Batata Inglesa", cat: "Hortifrúti", emoji: "🥔", size: "1 kg", price: 5.50 },
        { name: "Banana Nanica", cat: "Hortifrúti", emoji: "🍌", size: "1 kg", price: 3.90 },
        { name: "Peito de Frango Resfriado", cat: "Carnes & Peixes", emoji: "🍗", size: "1 kg", price: 13.90 },
        { name: "Carne Moída Bovina", cat: "Carnes & Peixes", emoji: "🥩", size: "1 kg", price: 24.90 },
        { name: "Picanha Bovina Fatiada", cat: "Carnes & Peixes", emoji: "🥩", size: "1 kg", price: 57.90, premium: true },
        { name: "Linguiça Toscana", cat: "Carnes & Peixes", emoji: "🌭", size: "1 kg", price: 17.50 },
        { name: "Leite UHT Integral", cat: "Laticínios & Frios", emoji: "🥛", size: "1 L", price: 4.90 },
        { name: "Manteiga com Sal", cat: "Laticínios & Frios", emoji: "🧈", size: "200 g", price: 10.90 },
        { name: "Queijo Mussarela Fatiado", cat: "Laticínios & Frios", emoji: "🧀", size: "100 g", price: 4.50 },
        { name: "Ovos Brancos Grandes", cat: "Laticínios & Frios", emoji: "🥚", size: "30 Un.", price: 15.90 },
        { name: "Água Mineral Sem Gás", cat: "Bebidas", emoji: "💧", size: "1.5 L", price: 2.50 },
        { name: "Refrigerante Cola", cat: "Bebidas", emoji: "🥤", size: "2 L", price: 8.50 },
        { name: "Cerveja Pilsen Lata", cat: "Bebidas", emoji: "🍺", size: "350 ml", price: 3.00 },
        { name: "Vinho Seco Importado", cat: "Bebidas", emoji: "🍷", size: "750 ml", price: 42.00, premium: true },
        { name: "Detergente Líquido", cat: "Limpeza", emoji: "🧴", size: "500 ml", price: 1.90 },
        { name: "Sabão em Pó Multiuso", cat: "Limpeza", emoji: "🧼", size: "1 kg", price: 9.90 },
        { name: "Papel Higiênico Folha Dupla", cat: "Higiene Pessoal", emoji: "🧻", size: "12 Rolos", price: 17.90 },
        { name: "Creme Dental Anti-cárie", cat: "Higiene Pessoal", emoji: "🦷", size: "90 g", price: 3.50 },
        { name: "Fralda Infantil Jumbo (M)", cat: "Higiene Pessoal", emoji: "👶", size: "70 Un.", price: 62.00 }
      ];

      let prodId = 1;
      const fullList = [...baseNames, ...baseNames.map(b => ({...b, name: b.name + ' Premium'}))];
      
      fullList.forEach((itemInfo) => {
        let priceVariation = (Math.sin(prodId * 11) * 0.22); 
        let currentPrice = Number((itemInfo.price * (1 + priceVariation)).toFixed(2));
        let change = Number((priceVariation * 100).toFixed(1));
        let status = change < -5 ? 'low' : change > 5 ? 'high' : 'normal';

        let marketOffers = [];
        coMarkets.forEach((m, mIdx) => {
          let hasItem = true;
          const redesPremium = ["Comper", "Fort Atacadista"];
          if (itemInfo.premium && !redesPremium.includes(m.network) && Math.random() < 0.3) hasItem = false;
          if (hasItem && Math.random() < 0.1) hasItem = false;

          if (hasItem) {
            let factor = 1 + ((mIdx - 6) * 0.012) + (Math.sin(prodId + mIdx) * 0.04);
            let mPrice = Number((currentPrice * Math.max(0.82, factor)).toFixed(2));
            let unitStr = itemInfo.size;
            let displayUnit = unitStr.includes("kg") ? `R$ ${(mPrice/parseFloat(unitStr)).toFixed(2)} / kg` : `R$ ${mPrice.toFixed(2)} / un`;

            marketOffers.push({ 
              market: m.name, 
              state: m.state,
              network: m.network,
              region: m.region,
              price: mPrice, 
              unit: displayUnit, 
              date: `Há ${Math.floor(Math.random() * 24) + 1}h` 
            });
          }
        });

        if (marketOffers.length === 0) {
           marketOffers.push({ market: coMarkets[0].name, state: coMarkets[0].state, network: coMarkets[0].network, region: coMarkets[0].region, price: currentPrice, unit: `R$ ${currentPrice.toFixed(2)}`, date: `Há 1h` });
        }

        marketOffers.sort((a, b) => a.price - b.price);
        let bestFilteredOffers = currentRegionFilter === 'Todas' ? marketOffers : marketOffers.filter(mo => mo.state === currentRegionFilter);
        if(bestFilteredOffers.length === 0) bestFilteredOffers = marketOffers; 
        let bestOffer = bestFilteredOffers[0];

        products.push({
          id: prodId,
          name: itemInfo.name,
          size: itemInfo.size,
          emoji: itemInfo.emoji,
          category: itemInfo.cat,
          price: bestOffer.price,
          market: bestOffer.market,
          state: bestOffer.state,
          status: status,
          change: change,
          unit: bestOffer.unit,
          markets: marketOffers
        });

        prodId++;
      });
    }
    
    generateProductsDatabase();
    const brl = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    function showPopup(title, message, icon = "🦉", actionsHtml = '<button class="btn-pri" onclick="closeCustomAlert()">OK</button>') {
      document.getElementById('custom-alert-title').textContent = title;
      document.getElementById('custom-alert-message').textContent = message;
      document.getElementById('custom-alert-icon').textContent = icon;
      document.getElementById('custom-alert-actions').innerHTML = actionsHtml;
      document.getElementById('customAlertModal').classList.add('active');
    }

    function closeCustomAlert() {
      document.getElementById('customAlertModal').classList.remove('active');
    }

    function openGoogleMaps(marketName, productName) {
      const query = encodeURIComponent(`${marketName} ${productName} Centro-Oeste`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    }

    function initUserGeolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            userCoords = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            if (currentTab === 'mercados') render();
          },
          (error) => {
            userCoords = { lat: -15.7801, lng: -47.8842 }; // Brasília como padrão
          },
          { timeout: 5000 }
        );
      } else {
        userCoords = { lat: -15.7801, lng: -47.8842 };
      }
    }

    function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
      const R = 6371; 
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    }

    function gerarRotaOtimizadaMaps() {
      const keys = Object.keys(simulatorCart);
      if (keys.length === 0) {
        showPopup('Cesta Vazia', 'Adicione produtos à sua cesta no simulador antes de gerar a rota de compras.', '🛒');
        return;
      }

      let marketCounts = {};
      keys.forEach(id => {
        const p = products.find(prod => prod.id == id);
        if (p && p.markets.length > 0) {
          const cheapestMarket = p.markets[0].market;
          marketCounts[cheapestMarket] = (marketCounts[cheapestMarket] || 0) + 1;
        }
      });

      let sortedMarkets = Object.keys(marketCounts).sort((a, b) => marketCounts[b] - marketCounts[a]);
      let stops = sortedMarkets.slice(0, 3);
      
      if (stops.length === 0) {
        showPopup('Atenção', 'Nenhum mercado encontrado para os itens da cesta.', '⚠️');
        return;
      }

      let destination = stops[stops.length - 1];
      let waypoints = stops.slice(0, stops.length - 1);

      if (userCoords) {
        let mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userCoords.lat},${userCoords.lng}&destination=${encodeURIComponent(destination)}`;
        if (waypoints.length > 0) {
          mapsUrl += `&waypoints=${waypoints.map(w => encodeURIComponent(w)).join('|')}`;
        }
        window.open(mapsUrl, '_blank');
      } else {
        fallbackMapsRoute(destination, waypoints);
      }
    }

    function fallbackMapsRoute(destination, waypoints) {
      let mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
      if (waypoints.length > 0) {
        mapsUrl += `&waypoints=${waypoints.map(w => encodeURIComponent(w)).join('|')}`;
      }
      window.open(mapsUrl, '_blank');
    }

    function changeGlobalRegion(regionCode) {
      currentRegionFilter = regionCode;
      products.forEach(p => {
        let available = currentRegionFilter === 'Todas' ? p.markets : p.markets.filter(m => m.state === currentRegionFilter);
        if(available.length === 0) available = p.markets;
        available.sort((a,b) => a.price - b.price);
        p.price = available[0].price;
        p.market = available[0].market;
        p.state = available[0].state;
      });
      render();
    }

    function switchTab(tab) {
      currentTab = tab;
      const tabs = ['inicio', 'produtos', 'historico', 'mercados', 'alertas', 'config'];

      document.querySelectorAll('.sidebar .nav').forEach((btn, idx) => {
        if (tabs[idx] === tab) btn.classList.add('active');
        else btn.classList.remove('active');
      });

      tabs.forEach(t => {
        const drawerBtn = document.getElementById(`drawer-nav-${t}`);
        if (drawerBtn) {
          if (t === tab) drawerBtn.classList.add('active');
          else drawerBtn.classList.remove('active');
        }
      });

      render();
    }

    function toggleMobileMenu() {
      const drawer = document.getElementById('mobileMenuDrawer');
      drawer.classList.toggle('active');
    }

    function calculateSimulatorTotal() {
      let total = 0;
      for (const id in simulatorCart) {
        const qty = simulatorCart[id];
        const prod = products.find(p => p.id == id);
        if (prod) total += prod.price * qty;
      }
      return total;
    }

    function updateSimulatorStatDisplay() {
      const total = calculateSimulatorTotal();
      const el = document.getElementById('simulator-modal-total');
      const topbarEl = document.getElementById('cart-total-header');
      if (el) el.textContent = brl(total);
      if (topbarEl) topbarEl.textContent = brl(total);
    }

    function updateAuthUI() {
      const authBtn = document.getElementById('topbar-auth-btn');
      if (currentUser) {
        if (authBtn) {
          authBtn.innerHTML = "🔓 Sair";
          authBtn.onclick = handleLogout;
        }
      } else {
        if (authBtn) {
          authBtn.innerHTML = "🔒 Entrar";
          authBtn.onclick = openLoginModal;
        }
      }
      if (currentTab === 'alertas' || currentTab === 'config') render();
    }

    function adjustQuantity(id, delta, event) {
      if (event) event.stopPropagation();
      if (!simulatorCart[id]) simulatorCart[id] = 0;
      simulatorCart[id] += delta;
      if (simulatorCart[id] <= 0) delete simulatorCart[id];

      updateSimulatorStatDisplay();
      if (currentTab === 'produtos') renderProductsList(globalSearchTerm);
      
      if (document.getElementById('simulatorModal').classList.contains('active')) {
         openSimulatorModal();
      }
    }

    function setCategoryFilter(cat) {
      currentCategoryFilter = cat;
      document.querySelectorAll('.cat-btn').forEach(btn => {
        if (btn.textContent.trim() === cat || (cat === 'Todos' && btn.textContent === 'Todos')) btn.classList.add('active');
        else btn.classList.remove('active');
      });
      renderProductsList(globalSearchTerm);
    }

    function drawGreenChart(canvasId, currentPrice) {
      const c = document.getElementById(canvasId);
      if (!c) return;
      const ctx = c.getContext("2d"), dpr = window.devicePixelRatio || 1, w = c.clientWidth, h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr; ctx.scale(dpr, dpr);

      let labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
      const base = currentPrice * 0.95;
      const pointsCount = labels.length;

      let series = Array.from({ length: pointsCount }, (_, i) => i === pointsCount - 1 ? currentPrice : base * (1 + Math.sin(i + currentPrice) * 0.08));

      const pad = { l: 24, r: 12, t: 8, b: 20 };
      const min = Math.min(...series) * 0.9;
      const max = Math.max(...series) * 1.1;
      const x = i => pad.l + i * (w - pad.l - pad.r) / (pointsCount - 1 || 1);
      const y = v => pad.t + (max - v) * (h - pad.t - pad.b) / (max - min);

      ctx.clearRect(0, 0, w, h);
      ctx.font = "9px Inter, sans-serif"; ctx.fillStyle = "#9ca3af";

      if (h > 90) {
        ctx.strokeStyle = "#f3f4f6"; ctx.lineWidth = 1;
        for (let i = 0; i <= 3; i++) {
          let val = min + (max - min) * (i / 3);
          ctx.beginPath(); ctx.moveTo(pad.l, y(val)); ctx.lineTo(w - pad.r, y(val)); ctx.stroke();
          ctx.fillText("R$ " + val.toFixed(1), 2, y(val) + 3);
        }
      }

      labels.forEach((m, i) => {
        ctx.fillText(m, x(i) - 8, h - 4);
      });

      let gradient = ctx.createLinearGradient(0, pad.t, 0, h - pad.b);
      gradient.addColorStop(0, "rgba(5, 150, 105, 0.25)");
      gradient.addColorStop(1, "rgba(5, 150, 105, 0.0)");

      ctx.beginPath();
      ctx.moveTo(x(0), y(series[0]));
      series.forEach((v, i) => ctx.lineTo(x(i), y(v)));
      ctx.lineTo(x(pointsCount - 1), h - pad.b);
      ctx.lineTo(x(0), h - pad.b);
      ctx.fillStyle = gradient;
      ctx.fill();

      const color = "#059669";
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2;
      series.forEach((v, i) => i ? ctx.lineTo(x(i), y(v)) : ctx.moveTo(x(i), y(v)));
      ctx.stroke();
      
      series.forEach((v, i) => {
        ctx.beginPath(); ctx.fillStyle = "#111827"; ctx.arc(x(i), y(v), 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.fillStyle = color; ctx.arc(x(i), y(v), 1.5, 0, Math.PI * 2); ctx.fill();
      });
    }

    function render() {
      const container = document.getElementById('main-content');
      
      const regionSelect = document.getElementById('global-region-select');
      if (regionSelect) regionSelect.value = currentRegionFilter;
      
      if (currentTab === 'inicio') {
        container.className = "content"; // Duas colunas para Ranking e Melhores Ofertas Globais

        // 1. Ranking de Redes
        let rankingMap = {};
        coMarkets.forEach(m => { rankingMap[m.name] = { ...m, lowestCount: 0 }; });
        products.forEach(p => {
          if (p.market && rankingMap[p.market]) rankingMap[p.market].lowestCount++;
        });
        let sortedRanking = Object.values(rankingMap).sort((a, b) => b.lowestCount - a.lowestCount);

        // 2. Melhores Ofertas do Site
        let topDiscounts = [...products].sort((a, b) => a.change - b.change).slice(0, 10);

        container.innerHTML = `
          <!-- LADO ESQUERDO: RANKING GERAL DE REDES -->
          <div class="panel" style="padding: 20px;">
            <h2 style="color:var(--brand-dark); font-size:18px; margin-top:0;">⇄ Ranking de Redes</h2>
            <p style="color:var(--muted); font-size:13px; margin-bottom:16px">Redes com mais menores preços no Centro-Oeste.</p>
            <div style="display:grid; gap:12px; max-height: 550px; overflow-y:auto; padding-right:4px;">
              ${sortedRanking.map((m, idx) => `
                <div style="display:flex; align-items:center; justify-content:space-between; padding:12px; background:var(--bg); border-radius:12px; border:1px solid var(--line); gap:8px;">
                  <div style="display:flex; gap:10px; align-items:center;">
                    <span style="font-size:22px">${m.emoji}</span>
                    <div>
                      <b style="font-size:14px; color:var(--brand-dark)">#${idx + 1}${m.name}</b>
                      <div style="font-size:11px; color:var(--muted); margin-top:1px">${m.state} •${m.region}</div>
                    </div>
                  </div>
                  <div style="text-align:right;">
                    <span class="badge low" style="font-size:10px; padding:4px 6px;">★ ${m.lowestCount} Baratos</span>
                    <div style="margin-top:4px;"><button class="offer" style="padding:4px 8px; font-size:10px;" onclick="openGoogleMaps('${m.name}', 'Supermercado')">Maps ↗</button></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- LADO DIREITO: MELHORES OFERTAS CADASTRADAS NO SITE -->
          <div class="panel" style="padding: 20px; border-top: 4px solid var(--brand-accent);">
            <h2 style="color:var(--brand-dark); font-size:18px; margin-top:0; display:flex; align-items:center; gap:6px;">
              🔥 Melhores Ofertas do Site
            </h2>
            <p style="color:var(--muted); font-size:13px; margin-bottom:16px">Produtos com as maiores quedas de preço registradas:</p>
            
            <div style="display:grid; gap:12px; max-height: 550px; overflow-y:auto; padding-right:4px;">
              ${topDiscounts.map(p => `
                <div style="display:flex; align-items:center; justify-content:space-between; padding:12px; background:var(--bg); border-radius:12px; border:1px solid var(--line); gap:8px; cursor:pointer;" onclick="switchTab('produtos'); setTimeout(()=>selectProduct(${products.indexOf(p)}, 0), 100);">
                  <div style="display:flex; gap:10px; align-items:center;">
                    <span style="font-size:22px">${p.emoji}</span>
                    <div>
                      <b style="font-size:13px; color:var(--brand-dark); display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden;">${p.name}</b>
                      <div style="font-size:11px; color:var(--muted); margin-top:1px">🏪 ${p.market} •${brl(p.price)}</div>
                    </div>
                  </div>
                  <div style="text-align:right;">
                    <span class="badge low" style="font-size:11px; padding:4px 6px;">${p.change.toFixed(1)}%</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      } else if (currentTab === 'produtos') {
        container.className = "content";
        container.innerHTML = `
          <div class="panel">
            <div class="panel-head">
              <div class="panel-search">
                ⌕ <input id="comparator-search" placeholder="Pesquisar produto ou mercado..." value="${globalSearchTerm}">
              </div>
              <select id="sort-select" onchange="sortProducts(this.value)">
                <option value="menor">Menor Preço</option>
                <option value="desconto">Maior Queda</option>
                <option value="recente">Recentes</option>
              </select>
            </div>
            <div class="cat-filters">
              <button class="cat-btn ${currentCategoryFilter === 'Todos' ? 'active' : ''}" onclick="setCategoryFilter('Todos')">Todos</button>
              <button class="cat-btn ${currentCategoryFilter === 'Cesta Básica' ? 'active' : ''}" onclick="setCategoryFilter('Cesta Básica')">Cesta Básica</button>
              <button class="cat-btn ${currentCategoryFilter === 'Mercearia' ? 'active' : ''}" onclick="setCategoryFilter('Mercearia')">Mercearia</button>
              <button class="cat-btn ${currentCategoryFilter === 'Hortifrúti' ? 'active' : ''}" onclick="setCategoryFilter('Hortifrúti')">Hortifrúti</button>
              <button class="cat-btn ${currentCategoryFilter === 'Carnes & Peixes' ? 'active' : ''}" onclick="setCategoryFilter('Carnes & Peixes')">Carnes</button>
              <button class="cat-btn ${currentCategoryFilter === 'Laticínios & Frios' ? 'active' : ''}" onclick="setCategoryFilter('Laticínios & Frios')">Laticínios</button>
              <button class="cat-btn ${currentCategoryFilter === 'Bebidas' ? 'active' : ''}" onclick="setCategoryFilter('Bebidas')">Bebidas</button>
              <button class="cat-btn ${currentCategoryFilter === 'Limpeza' ? 'active' : ''}" onclick="setCategoryFilter('Limpeza')">Limpeza</button>
            </div>
            <div class="products" id="products-list"></div>
          </div>
          
          <!-- COLUNA DIREITA: CARD DE DETALHES + 6 ANÚNCIOS EXTERNOS -->
          <div class="right-column-wrapper">
            <div class="panel detail" id="detail-panel"></div>
            
            <div class="ads-grid-6">
              <!-- Anúncio 1 -->
              <div class="ad-card-item">
                <div class="ad-card-video-box">
                  <div style="position:absolute; inset:0; background:radial-gradient(circle, #334155, #0f172a); display:grid; place-items:center; font-size:16px;">🥩</div>
                  <div class="ad-card-play" onclick="showPopup('Anúncio', 'Reproduzindo anúncio: Festival do Churrasco Centro-Oeste!', '🥩')">▶</div>
                </div>
                <div>
                  <div style="font-size:9px; font-weight:700; color:var(--brand-accent); text-transform:uppercase;">Patrocínio • Carnes</div>
                  <div style="font-size:11px; font-weight:700; color:#f8fafc; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Festival do Churrasco CO</div>
                </div>
              </div>

              <!-- Anúncio 2 -->
              <div class="ad-card-item">
                <div class="ad-card-video-box">
                  <div style="position:absolute; inset:0; background:radial-gradient(circle, #047857, #065f46); display:grid; place-items:center; font-size:16px;">🥗</div>
                  <div class="ad-card-play" onclick="showPopup('Anúncio', 'Reproduzindo anúncio: Hortifrúti Regional!', '🥗')">▶</div>
                </div>
                <div>
                  <div style="font-size:9px; font-weight:700; color:#34d399; text-transform:uppercase;">Patrocínio • Hortifrúti</div>
                  <div style="font-size:11px; font-weight:700; color:#f8fafc; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Direto do Campo GO/MT</div>
                </div>
              </div>

              <!-- Anúncio 3 -->
              <div class="ad-card-item">
                <div class="ad-card-video-box">
                  <div style="position:absolute; inset:0; background:radial-gradient(circle, #b45309, #78350f); display:grid; place-items:center; font-size:16px;">🍷</div>
                  <div class="ad-card-play" onclick="showPopup('Anúncio', 'Reproduzindo anúncio: Vinhos & Destilados CO!', '🍷')">▶</div>
                </div>
                <div>
                  <div style="font-size:9px; font-weight:700; color:#fbbf24; text-transform:uppercase;">Patrocínio • Adega</div>
                  <div style="font-size:11px; font-weight:700; color:#f8fafc; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Vinhos & Destilados CO</div>
                </div>
              </div>

              <!-- Anúncio 4 -->
              <div class="ad-card-item">
                <div class="ad-card-video-box">
                  <div style="position:absolute; inset:0; background:radial-gradient(circle, #1d4ed8, #1e40af); display:grid; place-items:center; font-size:16px;">🧼</div>
                  <div class="ad-card-play" onclick="showPopup('Anúncio', 'Reproduzindo anúncio: Super Feirão Limpeza!', '🧼')">▶</div>
                </div>
                <div>
                  <div style="font-size:9px; font-weight:700; color:#60a5fa; text-transform:uppercase;">Patrocínio • Limpeza</div>
                  <div style="font-size:11px; font-weight:700; color:#f8fafc; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Super Feirão Limpeza</div>
                </div>
              </div>

              <!-- Anúncio 5 -->
              <div class="ad-card-item">
                <div class="ad-card-video-box">
                  <div style="position:absolute; inset:0; background:radial-gradient(circle, #7c3aed, #5b21b6); display:grid; place-items:center; font-size:16px;">🥖</div>
                  <div class="ad-card-play" onclick="showPopup('Anúncio', 'Reproduzindo anúncio: Pão Quentinho Centro-Oeste!', '🥖')">▶</div>
                </div>
                <div>
                  <div style="font-size:9px; font-weight:700; color:#a78bfa; text-transform:uppercase;">Patrocínio • Padaria</div>
                  <div style="font-size:11px; font-weight:700; color:#f8fafc; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Pão Quentinho Centro-Oeste</div>
                </div>
              </div>

              <!-- Anúncio 6 -->
              <div class="ad-card-item">
                <div class="ad-card-video-box">
                  <div style="position:absolute; inset:0; background:radial-gradient(circle, #db2777, #9d174d); display:grid; place-items:center; font-size:16px;">👶</div>
                  <div class="ad-card-play" onclick="showPopup('Anúncio', 'Reproduzindo anúncio: Clube do Bebê CO!', '👶')">▶</div>
                </div>
                <div>
                  <div style="font-size:9px; font-weight:700; color:#f472b6; text-transform:uppercase;">Patrocínio • Infantil</div>
                  <div style="font-size:11px; font-weight:700; color:#f8fafc; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Clube do Bebê CO</div>
                </div>
              </div>
            </div>
          </div>
        `;
        renderProductsList(globalSearchTerm);
        if (products.length > 0) selectProduct(selectedIndex, 0);

      } else if (currentTab === 'historico') {
        container.className = "content single-col";
        container.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:20px;">
            <div class="panel" style="padding: 24px; border-left: 4px solid var(--brand-accent);">
              <h2 style="margin:0 0 8px 0; color:var(--brand-dark); display:flex; align-items:center; gap:8px;">
                📊 Relatórios de Preços e Novidades no Centro-Oeste
              </h2>
              <p style="color:var(--muted); font-size:14px; margin:0; line-height:1.6;">
                Análises semanais consolidadas pelo Vigia do Preço para GO, DF, MT e MS. Acompanhe as principais oscilações de custos nas redes atacadistas regionais.
              </p>
            </div>

            <div class="report-card">
              <h3>🛒 Comportamento da Cesta Básica & Grãos</h3>
              <p style="color:var(--muted); font-size:13px; margin-top:4px;">Resumo do impacto nos bolsos dos consumidores em Goiânia, Cuiabá, Campo Grande e Brasília.</p>
              <div class="report-grid">
                <div class="report-box">
                  <h4>Safra de Grãos e Atacarejos</h4>
                  <p>O arroz e o milho registraram recuo de 5% nas principais redes de Goiás e Mato Grosso, impulsionados pela proximidade com os grandes centros produtores da região.</p>
                </div>
                <div class="report-box">
                  <h4>Ajuste no Café e Laticínios</h4>
                  <p>Produtos derivados de leite e café torrado mantiveram leve pressão de alta em Mato Grosso do Sul, com variação compensada por campanhas promocionais de fim de semana nos hipermercados.</p>
                </div>
              </div>
            </div>

            <div class="report-card">
              <h3>🥩 Setor de Proteínas & Hortifrúti</h3>
              <p style="color:var(--muted); font-size:13px; margin-top:4px;">Variações regionalizadas em açougues e redes atacadistas monitoradas.</p>
              <div class="report-grid">
                <div class="report-box">
                  <h4>Cortes Bovinos em Destaque</h4>
                  <p>A força pecuária de Goiás e Mato Grosso garante preços médios de carne moída e cortes de frango até 10% mais competitivos em relação a outras capitais brasileiras.</p>
                </div>
                <div class="report-box">
                  <h4>Hortaliças e Clima</h4>
                  <p>O regime de chuvas no Cerrado provocou oscilações pontuais em folhosas e tomates, com rápida normalização graças ao abastecimento direto do cinturão verde regional.</p>
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (currentTab === 'mercados') {
        container.className = "content single-col";

        // MERCADOS PERTO DE MIM + MELHORES OFERTAS DESSES MERCADOS (Calculado por % de desconto frente à média geral)
        let marketsWithDistance = coMarkets.map(m => {
          let dist = userCoords ? calcularDistanciaKm(userCoords.lat, userCoords.lng, m.lat, m.lng) : 0;
          return { ...m, distance: dist };
        });
        marketsWithDistance.sort((a, b) => a.distance - b.distance);

        // Pegar os 3 mercados mais próximos
        let closestMarkets = marketsWithDistance.slice(0, 3);

        container.innerHTML = `
          <div class="panel" style="padding: 24px; border-left: 4px solid var(--brand-accent);">
            <h2 style="color:var(--brand-dark); margin-top:0; display:flex; align-items:center; gap:8px;">
              📍 Mercados Perto de Mim & Melhores Ofertas
            </h2>
            <p style="color:var(--muted); font-size:14px; margin-bottom:24px">
              Unidades mais próximas da sua localização atual com produtos que possuem as maiores porcentagens de desconto em relação à média dos outros mercados.
            </p>

            <div style="display:grid; gap:20px;">
              ${closestMarkets.map(m => {
                // Encontrar ofertas deste mercado e calcular % de desconto vs média geral do produto
                let offersOfThisMarket = [];
                products.forEach(p => {
                  let foundInMarket = p.markets.find(mo => mo.market === m.name);
                  if (foundInMarket) {
                    // Média de preço do produto nos outros mercados
                    let sumOthers = 0, countOthers = 0;
                    p.markets.forEach(mo => {
                      if (mo.market !== m.name) { sumOthers += mo.price; countOthers++; }
                    });
                    let avgOtherPrice = countOthers > 0 ? sumOthers / countOthers : foundInMarket.price;
                    let discountPercent = ((avgOtherPrice - foundInMarket.price) / avgOtherPrice) * 100;

                    if (discountPercent > 0) {
                      offersOfThisMarket.push({
                        productName: p.name,
                        emoji: p.emoji,
                        size: p.size,
                        price: foundInMarket.price,
                        discount: discountPercent
                      });
                    }
                  }
                });

                // Ordenar por maior desconto
                offersOfThisMarket.sort((a, b) => b.discount - a.discount);
                let topOffers = offersOfThisMarket.slice(0, 3);

                return `
                  <div style="background:var(--bg); border:1px solid var(--line); border-radius:16px; padding:20px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px; border-bottom:1px solid var(--line); padding-bottom:12px;">
                      <div style="display:flex; gap:12px; align-items:center;">
                        <span style="font-size:32px">${m.emoji}</span>
                        <div>
                          <b style="font-size:16px; color:var(--brand-dark);">${m.name}</b>
                          <div style="font-size:12px; color:var(--muted); margin-top:2px">Distância: <b>${m.distance.toFixed(1)} km</b> •${m.region}</div>
                        </div>
                      </div>
                      <button class="offer" style="padding:8px 16px; background:var(--brand-accent);" onclick="openGoogleMaps('${m.name}', 'Supermercado')">Traçar Rota Maps ↗</button>
                    </div>

                    <h4 style="margin:0 0 10px 0; font-size:13px; color:var(--muted); text-transform:uppercase;">Top Ofertas (Maior Desconto vs Média Geral):</h4>
                    
                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:10px;">
                      ${topOffers.length === 0 ? `<div style="color:var(--muted); font-size:13px;">Nenhum destaque promocional no momento nesta unidade.</div>` :
                        topOffers.map(o => `
                          <div style="background:#fff; border:1px solid var(--line); border-radius:10px; padding:10px; display:flex; justify-content:space-between; align-items:center;">
                            <div style="display:flex; gap:8px; align-items:center;">
                              <span style="font-size:20px">${o.emoji}</span>
                              <div>
                                <b style="font-size:12px; color:var(--brand-dark); display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden;">${o.productName}</b>
                                <div style="font-size:11px; color:var(--green); font-weight:800;">${brl(o.price)}</div>
                              </div>
                            </div>
                            <span class="badge low" style="font-size:10px; padding:3px 6px;">-${o.discount.toFixed(0)}%</span>
                          </div>
                        `).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      } else if (currentTab === 'alertas') {
        container.className = "content single-col";
        
        if (!currentUser) {
          container.innerHTML = `
            <div class="panel" style="padding: 32px; text-align: center; max-width: 600px; margin: 20px auto;">
              <span style="font-size: 48px;">🔒</span>
              <h2 style="color:var(--brand-dark); margin-top: 16px;">Acesso Restrito a Usuários Logados</h2>
              <p style="color:var(--muted); font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
                Para gerenciar seus alertas ativos e receber notificações diretamente no seu e-mail cadastrado quando os preços caírem no Centro-Oeste, faça login na sua conta.
              </p>
              <button class="btn-pri" style="display: inline-block; width: auto; padding: 12px 32px;" onclick="openLoginModal()">Fazer Login / Criar Conta</button>
            </div>
          `;
        } else {
          container.innerHTML = `
            <div class="panel" style="padding: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
                <div>
                  <h2 style="color:var(--brand-dark); margin: 0 0 4px 0;">♧ Alertas Ativos (${userAlerts.length})</h2>
                  <p style="color:var(--muted); font-size: 13px; margin: 0;">Notificações serão enviadas para: <b>${currentUser.email}</b></p>
                </div>
                <button class="btn-pri" style="width: auto; padding: 10px 20px;" onclick="openNewAlertModal()">+ Adicionar Alerta</button>
              </div>

              <div style="display:grid; gap:12px;">
                ${userAlerts.length === 0 ? `<div style="text-align:center; color:var(--muted); padding:30px;">Você não possui alertas ativos no momento. Clique em "+ Adicionar Alerta" para começar.</div>` : 
                  userAlerts.map(a => `
                    <div class="active-alert-item">
                      <div style="display:flex; gap:12px; align-items:center; cursor:pointer; flex:1;" onclick="goToProductFromAlert(${a.productId})">
                        <span style="font-size:24px;">🎯</span>
                        <div>
                          <b style="color:var(--brand-dark); font-size:14px; display:block;">${a.name}</b>
                          <small style="color:var(--muted); font-size:12px;">Escopo: <b>${a.escopoText}</b> • Preço Alvo: <b style="color:var(--green);">${brl(a.targetPrice)}</b></small>
                        </div>
                      </div>
                      <div style="display:flex; gap:8px; align-items:center;">
                        <button class="offer" style="background:var(--brand-accent);" onclick="openEditAlertModal(${a.id})">Editar ✏️</button>
                        <button class="offer" style="background:var(--red);" onclick="confirmarExcluirAlerta(${a.id})">Excluir 🗑️</button>
                      </div>
                    </div>
                  `).join('')}
              </div>
            </div>
          `;
        }
      } else if (currentTab === 'config') {
        container.className = "content single-col";
        
        if (!currentUser) {
          container.innerHTML = `
            <div class="panel" style="padding: 32px; text-align: center; max-width: 600px; margin: 20px auto;">
              <span style="font-size: 48px;">⚙️</span>
              <h2 style="color:var(--brand-dark); margin-top: 16px;">Configurações</h2>
              <p style="color:var(--muted); font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
                Faça login para gerenciar suas preferências regionalizadas e dados de conta.
              </p>
              <button class="btn-pri" style="display: inline-block; width: auto; padding: 12px 32px;" onclick="openLoginModal()">Fazer Login</button>
            </div>
          `;
        } else {
          container.innerHTML = `
            <div class="panel" style="padding: 28px; max-width: 640px; margin: 0 auto; display: grid; gap: 24px;">
              <h2 style="color:var(--brand-dark); margin: 0;">⚙ Configurações de Conta e Região</h2>
              
              <!-- Preferência Regional -->
              <div style="background:var(--bg); padding:16px; border-radius:12px; border:1px solid var(--line);">
                <h3 style="margin:0 0 12px 0; font-size:15px; color:var(--brand-dark);">📍 Estado Principal no Centro-Oeste</h3>
                <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
                  <select id="config-estado" style="flex:1; min-width:200px; padding:10px 12px; border:1px solid var(--line); border-radius:8px; background:#fff;">
                    <option value="DF" ${currentRegionFilter === 'DF' ? 'selected' : ''}>Distrito Federal (DF)</option>
                    <option value="GO" ${currentRegionFilter === 'GO' ? 'selected' : ''}>Goiás (GO)</option>
                    <option value="MT" ${currentRegionFilter === 'MT' ? 'selected' : ''}>Mato Grosso (MT)</option>
                    <option value="MS" ${currentRegionFilter === 'MS' ? 'selected' : ''}>Mato Grosso do Sul (MS)</option>
                  </select>
                  <button class="btn-pri" style="width:auto;" onclick="salvarConfigEstado()">Salvar Região</button>
                </div>
              </div>

              <!-- Alterar Dados de Usuário e Senha -->
              <div style="background:var(--bg); padding:16px; border-radius:12px; border:1px solid var(--line);">
                <h3 style="margin:0 0 14px 0; font-size:15px; color:var(--brand-dark);">🔒 Dados de Acesso & Segurança</h3>
                <form onsubmit="atualizarCredenciaisConta(event)" style="display:grid; gap:14px;">
                  <div class="form-field" style="margin:0;">
                    <label>E-mail / Usuário</label>
                    <input type="email" id="config-user-email" value="${currentUser.email}" required>
                  </div>
                  <div class="form-field" style="margin:0;">
                    <label>Nova Senha (deixe em branco para manter a atual)</label>
                    <input type="password" id="config-user-senha" placeholder="••••••••">
                  </div>
                  <div>
                    <button type="submit" class="btn-pri" style="width:auto;">Atualizar Credenciais</button>
                  </div>
                </form>
              </div>

              <!-- Zona de Perigo: Apagar Conta -->
              <div style="background:var(--red-soft); padding:16px; border-radius:12px; border:1px solid #fca5a5;">
                <h3 style="margin:0 0 6px 0; font-size:15px; color:var(--red);">⚠️ Zona de Perigo</h3>
                <p style="font-size:13px; color:var(--muted); margin:0 0 14px 0;">Apagar sua conta removerá permanentemente todos os seus alertas ativos, histórico e preferências do Vigia do Preço.</p>
                <button type="button" class="btn-danger" style="width:auto;" onclick="confirmarApagarConta()">Apagar Minha Conta</button>
              </div>
            </div>
          `;
        }
      }
    }

    function renderProductsList(filterText = '') {
      const box = document.getElementById("products-list");
      if (!box) return;
      const filtered = products.filter(p => {
        const matchesText = p.name.toLowerCase().includes(filterText.toLowerCase()) || p.category.toLowerCase().includes(filterText.toLowerCase()) || p.market.toLowerCase().includes(filterText.toLowerCase());
        const matchesCategory = currentCategoryFilter === 'Todos' || p.category === currentCategoryFilter;
        return matchesText && matchesCategory;
      });

      if (filtered.length === 0) {
        box.innerHTML = `<div style="padding:32px;text-align:center;color:var(--muted)">O Vigia não encontrou nada com esse nome. 🦉</div>`;
        return;
      }

      box.innerHTML = filtered.map((p) => {
        const realIndex = products.indexOf(p);
        const qty = simulatorCart[p.id] || 0;
        return `
          <div class="product ${realIndex === selectedIndex ? 'selected' : ''}" onclick="selectProduct(${realIndex}, 0)">
            <div class="thumb">${p.emoji}</div>
            <div>
              <b>${p.name}</b>
              <small>${p.size} • <span style="color:var(--brand-accent);font-weight:600">${p.category}</span></small>
              <div class="price">${brl(p.price)}</div>
              <span class="market">${p.market} (${p.state})</span>
              <div class="sim-controls">
                <span style="font-size:10px;color:var(--muted);font-weight:600">CESTA:</span>
                <button class="sim-btn" onclick="adjustQuantity(${p.id}, -1, event)">-</button>
                <span style="font-size:12px;font-weight:800;min-width:16px;text-align:center;color:var(--brand-dark)">${qty}</span>
                <button class="sim-btn" onclick="adjustQuantity(${p.id}, 1, event)">+</button>
              </div>
            </div>
            <div style="text-align:right">
              <span class="badge ${p.status}">${p.status === "low" ? "↓ Queda" : p.status === "high" ? "↑ Alta" : "— Estável"}</span>
              <div class="variation ${p.change < 0 ? 'down' : p.change > 0 ? 'up' : 'stable'}">${p.change > 0 ? '+' : ''}${p.change.toFixed(1).replace('.', ',')}%</div>
            </div>
          </div>
        `;
      }).join("");
    }

    function selectProduct(index, marketIdx = 0) {
      selectedIndex = index;
      selectedMarketIndex = marketIdx;
      
      document.querySelectorAll(".product").forEach((el, i) => {
        if (i === index) el.classList.add("selected");
        else el.classList.remove("selected");
      });

      const selectedEl = document.querySelectorAll(".product")[index];
      if(selectedEl && marketIdx === 0) {
          selectedEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      renderDetail(index, marketIdx);
    }

    function toggleMarketSort() {
      marketSortOrder = marketSortOrder === 'asc' ? 'desc' : 'asc';
      renderDetail(selectedIndex, selectedMarketIndex);
    }

    function renderDetail(index, marketIdx = 0) {
      const p = products[index];
      const detail = document.getElementById("detail-panel");
      if (!detail) return;

      let availableMarkets = currentRegionFilter === 'Todas' ? p.markets : p.markets.filter(m => m.state === currentRegionFilter);
      if(availableMarkets.length === 0) availableMarkets = p.markets;

      let sortedMarkets = [...availableMarkets];
      sortedMarkets.sort((a, b) => marketSortOrder === 'asc' ? a.price - b.price : b.price - a.price);

      let activeMarket = marketIdx >= sortedMarkets.length ? sortedMarkets[0] : sortedMarkets[marketIdx];
      if(marketIdx >= sortedMarkets.length) { marketIdx = 0; selectedMarketIndex = 0; }

      const minHist = activeMarket.price * 0.92;
      const maxHist = activeMarket.price * 1.22;
      const avgHist = activeMarket.price * 1.06;

      detail.innerHTML = `
        <div class="detail-top">
          <div class="detail-thumb">${p.emoji}</div>
          <div class="detail-title">
            <h1>${p.name}</h1>
            <p>${p.size} • Unidade selecionada: <b>${activeMarket.market} (${activeMarket.state})</b></p>
          </div>
          <div class="current" title="Ver no Google Maps" onclick="openGoogleMaps('${activeMarket.market}', '${p.name}')">
            <strong>${brl(activeMarket.price)}</strong>
            <small>Preço Neste Local ↗</small>
            <div class="badge low" style="margin-top:6px; background: var(--brand-dark); color: #fff;">${activeMarket.market === p.market ? '★ Menor Preço' : 'Em Estoque'}</div>
          </div>
        </div>
        
        <div class="metrics">
          <div class="metric"><small>Menor histórico</small><strong>${brl(minHist)}</strong></div>
          <div class="metric"><small>Maior histórico</small><strong>${brl(maxHist)}</strong></div>
          <div class="metric"><small>Média 12 meses</small><strong>${brl(avgHist)}</strong></div>
          <div class="metric"><small>Preço Atual</small><strong>${brl(activeMarket.price)}</strong></div>
        </div>

        <div class="chart-wrap">
          <div class="chart-head">
            <b>Histórico do Local <span style="font-weight:500;color:var(--muted)">(Último Ano)</span></b>
            <span class="legend">● Curva Exclusiva da Unidade</span>
          </div>
          <canvas id="chart" style="height: 160px;"></canvas>
        </div>

        <div class="market-title">
          <h3>Unidades com Estoque Encontrado (${sortedMarkets.length})</h3>
          <button class="filters button" onclick="toggleMarketSort()">
            Preço: ${marketSortOrder === 'asc' ? 'Crescente ▲' : 'Decrescente ▼'}
          </button>
        </div>

        <div class="market-row header">
          <span>Supermercado</span>
          <span>Preço</span>
          <span>Unidade</span>
          <span>Atualização</span>
          <span>Mapa</span>
        </div>

        <div id="markets-rows" style="max-height:190px;overflow-y:auto;border:1px solid var(--line);border-radius:12px;background:#fff;">
          ${sortedMarkets.map((m, sIdx) => {
            const isSelected = sIdx === marketIdx;
            return `
              <div class="market-row ${isSelected ? 'active-market' : ''}" onclick="selectProduct(${index},${sIdx})">
                <span style="display:flex;align-items:center;gap:6px"><b>${m.market}</b> <span style="font-size:10px; color:var(--muted)">[${m.state}]</span></span>
                <strong>${brl(m.price)}</strong>
                <span style="color:var(--muted)">${m.unit}</span>
                <span style="color:var(--muted)">${m.date}</span>
                <button class="offer" onclick="event.stopPropagation(); openGoogleMaps('${m.market}', '${p.name}')">Ir ↗</button>
              </div>
            `;
          }).join('')}
        </div>
      `;
      drawGreenChart('chart', activeMarket.price);
    }

    function openNewAlertModal() {
      document.getElementById('modal-alerta-id').value = '';
      document.getElementById('modal-alerta-titulo').textContent = '➕ Novo Alerta de Preço';
      document.getElementById('modal-alerta-btn-submit').textContent = 'Salvar Alerta 🦉';

      const selectEl = document.getElementById('modal-alerta-produto');
      selectEl.innerHTML = products.map(p => `<option value="${p.id}">${p.name} (${p.size})</option>`).join('');
      
      document.getElementById('modal-alerta-estado').value = 'todos';
      document.getElementById('wrapper-cidades').style.display = 'none';
      document.getElementById('modal-alerta-rede').value = 'todas';
      document.getElementById('modal-alerta-preco').value = '';
      
      document.getElementById('newAlertModal').classList.add('active');
    }

    function openEditAlertModal(alertId) {
      const alerta = userAlerts.find(a => a.id === alertId);
      if (!alerta) return;

      document.getElementById('modal-alerta-id').value = alerta.id;
      document.getElementById('modal-alerta-titulo').textContent = '✏️ Editar Alerta de Preço';
      document.getElementById('modal-alerta-btn-submit').textContent = 'Atualizar Alerta 🦉';

      const selectEl = document.getElementById('modal-alerta-produto');
      selectEl.innerHTML = products.map(p => `<option value="${p.id}">${p.name} (${p.size})</option>`).join('');
      selectEl.value = alerta.productId;

      document.getElementById('modal-alerta-estado').value = alerta.rawEstado || 'todos';
      onAlertEstadoChange(alerta.rawEstado || 'todos');

      if (alerta.rawEstado && alerta.rawEstado !== 'todos') {
        document.getElementById('modal-alerta-cidade').value = alerta.rawCidade || 'todas_cidades';
      }

      document.getElementById('modal-alerta-rede').value = alerta.rawRede || 'todas';
      document.getElementById('modal-alerta-preco').value = alerta.targetPrice;

      document.getElementById('newAlertModal').classList.add('active');
    }

    function closeNewAlertModal() {
      document.getElementById('newAlertModal').classList.remove('active');
    }

    function onAlertEstadoChange(estadoVal) {
      const wrapperCidades = document.getElementById('wrapper-cidades');
      const selectCidades = document.getElementById('modal-alerta-cidade');

      if (estadoVal === 'todos') {
        wrapperCidades.style.display = 'none';
      } else {
        wrapperCidades.style.display = 'block';
        let cidadesHtml = `<option value="todas_cidades">Todas as Cidades deste Estado</option>`;
        
        if (estadoVal === 'DF') {
          cidadesHtml += `<option value="Brasília e Entorno">Brasília e Entorno</option>`;
        } else if (estadoVal === 'GO') {
          cidadesHtml += `<option value="Goiânia e Região Metropolitana">Goiânia e Região Metropolitana</option>` +
                         `<option value="Anápolis">Anápolis</option>` +
                         `<option value="Rio Verde">Rio Verde</option>`;
        } else if (estadoVal === 'MT') {
          cidadesHtml += `<option value="Cuiabá e Várzea Grande">Cuiabá e Várzea Grande</option>` +
                         `<option value="Rondonópolis">Rondonópolis</option>`;
        } else if (estadoVal === 'MS') {
          cidadesHtml += `<option value="Campo Grande">Campo Grande</option>` +
                         `<option value="Dourados">Dourados</option>`;
        }
        selectCidades.innerHTML = cidadesHtml;
      }
    }

    function salvarAlertaModal(event) {
      event.preventDefault();
      const alertId = document.getElementById('modal-alerta-id').value;
      const prodId = parseInt(document.getElementById('modal-alerta-produto').value);
      const estadoVal = document.getElementById('modal-alerta-estado').value;
      const redeVal = document.getElementById('modal-alerta-rede').value;
      const preco = parseFloat(document.getElementById('modal-alerta-preco').value);
      
      if (!preco || isNaN(preco)) { 
        showPopup('Atenção', 'Por favor, informe um preço alvo válido.', '⚠️'); 
        return; 
      }

      let escopoDesc = "";
      let cidadeVal = "todas_cidades";
      if (estadoVal === 'todos') {
        escopoDesc = "🌍 Todos os Estados (Centro-Oeste)";
      } else {
        cidadeVal = document.getElementById('modal-alerta-cidade').value;
        escopoDesc = `📍 Estado: ${estadoVal} (${cidadeVal})`;
      }

      if (redeVal !== 'todas') {
        escopoDesc += ` • Rede: ${redeVal}`;
      }

      const prodObj = products.find(p => p.id === prodId);
      if (prodObj) {
        if (alertId) {
          const index = userAlerts.findIndex(a => a.id == alertId);
          if (index !== -1) {
            userAlerts[index] = {
              id: parseInt(alertId),
              productId: prodObj.id,
              name: prodObj.name,
              size: prodObj.size,
              targetPrice: preco,
              escopoText: escopoDesc,
              rawEstado: estadoVal,
              rawCidade: cidadeVal,
              rawRede: redeVal
            };
            showPopup('Sucesso', `Alerta atualizado com sucesso para ${prodObj.name}!`, '🎯');
          }
        } else {
          userAlerts.push({
            id: Date.now(),
            productId: prodObj.id,
            name: prodObj.name,
            size: prodObj.size,
            targetPrice: preco,
            escopoText: escopoDesc,
            rawEstado: estadoVal,
            rawCidade: cidadeVal,
            rawRede: redeVal
          });
          showPopup('Sucesso', `Alerta criado com sucesso para ${prodObj.name}! Notificações serão enviadas para ${currentUser.email}.`, '🦉');
        }
        closeNewAlertModal();
        render();
      }
    }

    function confirmarExcluirAlerta(alertId) {
      showPopup('Excluir Alerta', 'Tem certeza que deseja excluir este alerta?', '🗑️', `
        <button class="btn-pri" style="background:var(--red);" onclick="executarExcluirAlerta(${alertId})">Sim, Excluir</button>
        <button class="btn-pri" style="background:var(--muted);" onclick="closeCustomAlert()">Cancelar</button>
      `);
    }

    function executarExcluirAlerta(alertId) {
      userAlerts = userAlerts.filter(a => a.id !== alertId);
      closeCustomAlert();
      render();
      showPopup('Excluído', 'O alerta foi removido com sucesso.', '🗑️');
    }

    function goToProductFromAlert(productId) {
      const targetIndex = products.findIndex(p => p.id === productId);
      if (targetIndex !== -1) {
        switchTab('produtos');
        setTimeout(() => {
          selectProduct(targetIndex, 0);
        }, 80);
      }
    }

    function salvarConfigEstado() {
      const estado = document.getElementById('config-estado').value;
      changeGlobalRegion(estado);
      showPopup('Sucesso', `Preferências atualizadas para o estado ${estado}!`, '📍');
    }

    function atualizarCredenciaisConta(event) {
      event.preventDefault();
      const novoEmail = document.getElementById('config-user-email').value;
      const novaSenha = document.getElementById('config-user-senha').value;
      
      currentUser.email = novoEmail;
      updateAuthUI();
      
      showPopup('Sucesso', 'Dados de acesso alterados com sucesso!', '🔒');
      if(novaSenha) {
        setTimeout(() => { document.getElementById('config-user-senha').value = ''; }, 1000);
      }
    }

    function confirmarApagarConta() {
      showPopup('Apagar Conta', 'Tem certeza que deseja apagar sua conta permanentemente? Esta ação não pode ser desfeita.', '⚠️', `
        <button class="btn-pri" style="background:var(--red);" onclick="executarApagarConta()">Sim, Apagar</button>
        <button class="btn-pri" style="background:var(--muted);" onclick="closeCustomAlert()">Cancelar</button>
      `);
    }

    function executarApagarConta() {
      currentUser = null;
      userAlerts = [];
      updateAuthUI();
      switchTab('inicio');
      closeCustomAlert();
      showPopup('Conta Removida', 'Sua conta foi apagada com sucesso.', '🦉');
    }

    function sortProducts(criteria) {
      if (criteria === 'menor') products.sort((a, b) => a.price - b.price);
      if (criteria === 'desconto') products.sort((a, b) => a.change - b.change);
      if (criteria === 'recente') products.sort((a, b) => b.id - a.id);
      renderProductsList(globalSearchTerm);
    }

    function openSimulatorModal() {
      const listEl = document.getElementById('simulator-items-list');
      const keys = Object.keys(simulatorCart);

      if (keys.length === 0) {
        listEl.innerHTML = `<div style="text-align:center;color:var(--muted);padding:30px">Sua cesta está vazia. Adicione itens clicando nos botões <b>[+]</b> ao lado de cada produto.</div>`;
      } else {
        let html = '';
        keys.forEach(id => {
          const qty = simulatorCart[id];
          const p = products.find(prod => prod.id == id);
          if (p) {
            const subtotal = p.price * qty;
            html += `
              <div style="display:flex;justify-content:space-between;align-items:center;background:var(--bg);padding:12px 14px;border:1px solid var(--line);border-radius:12px;gap:8px">
                <div style="display:flex;gap:12px;align-items:center">
                  <span style="font-size:22px">${p.emoji}</span>
                  <div>
                    <b style="color:var(--brand-dark);font-size:13px">${p.name}</b>
                    <div style="font-size:11px;color:var(--muted);margin-top:2px">${qty}x ${brl(p.price)} (${p.size}) • ${p.market}</div>
                  </div>
                </div>
                <div style="text-align:right">
                  <strong style="color:var(--brand-dark);font-size:15px">${brl(subtotal)}</strong>
                  <div><button onclick="adjustQuantity(${p.id}, -1); setTimeout(openSimulatorModal, 50);" style="font-size:11px;background:none;border:0;color:var(--red);cursor:pointer;font-weight:600;margin-top:2px">Remover 1</button></div>
                </div>
              </div>
            `;
          }
        });
        listEl.innerHTML = html;
      }
      
      updateSimulatorStatDisplay();
      document.getElementById('simulatorModal').classList.add('active');
    }

    function closeSimulatorModal() {
      document.getElementById('simulatorModal').classList.remove('active');
    }

    function openLoginModal() {
      document.getElementById('loginModal').classList.add('active');
    }

    function closeLoginModal() {
      document.getElementById('loginModal').classList.remove('active');
    }

    function handleLogin(event) {
      event.preventDefault();
      const email = document.getElementById('login-email').value;
      currentUser = { email: email };
      updateAuthUI();
      closeLoginModal();
      showPopup('Bem-vindo', `Você entrou com sucesso como ${email}!`, '🦉');
    }

    function handleGoogleLogin() {
      currentUser = { email: "usuario.google@gmail.com" };
      updateAuthUI();
      closeLoginModal();
      showPopup('Bem-vindo', 'Você entrou com sucesso via Google!', '🦉');
    }

    function handleLogout() {
      currentUser = null;
      updateAuthUI();
      showPopup('Sessão Encerrada', 'Você saiu da sua conta com sucesso.', '🦉');
    }

    document.addEventListener("input", e => {
      if (e.target && e.target.id === 'comparator-search') {
        globalSearchTerm = e.target.value;
        renderProductsList(globalSearchTerm);
      }
    });

    function checkMobileView() {
      const bottomNav = document.getElementById('mobile-bottom-nav');
      if (window.innerWidth <= 900) {
        if(bottomNav) bottomNav.style.display = 'flex';
      } else {
        if(bottomNav) {
          bottomNav.style.display = 'none';
          document.getElementById('mobileMenuDrawer').classList.remove('active');
        }
      }
    }
    window.addEventListener('resize', checkMobileView);

    window.onload = () => { 
        initUserGeolocation();
        render(); 
        updateSimulatorStatDisplay(); 
        updateAuthUI();
        checkMobileView();
    };