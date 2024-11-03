import TradingView from '@mathieuc/tradingview';
// Example of wrapping WebSocket to log data

let gold_price = 0;
const client = new TradingView.Client(); // Creates a websocket client

const getGold = () => {
  console.log('Fetching gold price');

  const chart = new client.Session.Chart(); // Init a Chart session

  chart.setMarket('GLDRUB_TOM', {
    // Set the market
    timeframe: '1H',
    range: 1,
  });

  chart.onError((...err: any) => {
    // Listen for errors (can avoid crash)
    console.error('Chart error:', ...err);
    // Do something...
  });

  chart.onSymbolLoaded(() => {
    // When the symbol is successfully loaded
    console.log(`Market "${chart.infos.description}" loaded !`);
  });

  chart.onUpdate(() => {
    // When price changes
    console.log(chart.periods);
    if (!chart.periods[0]) return;
    console.log(
      `[${chart.infos.description}]: ${chart.periods[0].close} ${chart.infos.currency_id}`
    );

    gold_price = chart.periods[0].close;
    // Do something...
  });
};

getGold();
setInterval(getGold, 1000 * 10);

Deno.serve(() => Response.json({ price: gold_price }));
