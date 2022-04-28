import { Coin, CoinId } from "../types/coin";
import { useEffect, useState } from "react";
import { getCoins } from "../api";
import { DEFAULT_CURRENCY_CRYPTO, WEBSERVICE_URL } from "../enum";
import { List, showToast, Toast } from "@raycast/api";
import { FormatDate, FormatPrice } from "./index";

export function FetchCoinDetails(props: CoinId) {
  const [markdown, setMarkdown] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCoinDetails() {
      try {
        const coin: Coin = await getCoins.getCoinDetails(props.coinId);
        const markdown = `
  ## ${coin.name} | ${coin.symbol.toUpperCase()}
 
  **Price**
  
  ${FormatPrice(coin.quotes.USD.price)} | ${FormatPrice(
          coin.quotes[DEFAULT_CURRENCY_CRYPTO].price,
          DEFAULT_CURRENCY_CRYPTO
        )}
  
  
  **Marketcap**
  
  ${FormatPrice(coin.quotes.USD.market_cap)} | ${FormatPrice(
          coin.quotes[DEFAULT_CURRENCY_CRYPTO].market_cap,
          DEFAULT_CURRENCY_CRYPTO
        )} 

  ---
  **Trend USD | BTC**       
  * 1 Day:      ${coin.quotes.USD.percent_change_24h}% | ${coin.quotes[DEFAULT_CURRENCY_CRYPTO].percent_change_24h}%
  * 7 Days:     ${coin.quotes.USD.percent_change_7d}% | ${coin.quotes[DEFAULT_CURRENCY_CRYPTO].percent_change_7d}% 
  * 30 Days:    ${coin.quotes.USD.percent_change_30d}% | ${coin.quotes[DEFAULT_CURRENCY_CRYPTO].percent_change_30d}%
  * YTD:        ${coin.quotes.USD.percent_change_1y}% | ${coin.quotes[DEFAULT_CURRENCY_CRYPTO].percent_change_1y}% 
  
  **All Time High USD | BTC**
  * %:      ${coin.quotes.USD.percent_from_price_ath}% | ${coin.quotes[DEFAULT_CURRENCY_CRYPTO].percent_from_price_ath}%
  * Price:  ${FormatPrice(coin.quotes.USD.price)} | ${FormatPrice(
          coin.quotes[DEFAULT_CURRENCY_CRYPTO].price,
          DEFAULT_CURRENCY_CRYPTO
        )}
  * Date:   ${FormatDate(coin.quotes.USD.ath_date)} | ${FormatDate(coin.quotes[DEFAULT_CURRENCY_CRYPTO].ath_date)}
  
  
  ---
  **Visit Coin**
  [Coingecko -> ${coin.symbol}](${WEBSERVICE_URL + coin.id} )

      `;
        setMarkdown(markdown);
      } catch (e) {
        await showToast({
          style: Toast.Style.Failure,
          title: "Failed to fetch the coin details",
        });
      }

      setIsLoading(false);
    }

    fetchCoinDetails();
  }, []);

  return <List.Item.Detail isLoading={isLoading} markdown={markdown} />;
}
