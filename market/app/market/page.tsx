import { Card } from "../components/product-card/Card";
import styles from "./market.module.css"

const cardData = {
  name: "Test Card",
  date: "12/12/12",
  author: "Author",
  description: "this is a description",
  url: "/"
}

const testArray = [cardData, cardData, cardData, cardData, cardData, cardData, cardData, cardData, cardData]

function MarketGrid() {
  return (
    <div className={styles.market_grid}>
      {
        testArray.map((item) => <Card {...item} />)
      }
    </div>
  )
}

export default function Market() {
  return (
    <div className={styles.market}>
      <br />
      <h1>Market</h1>
      <br />
      <MarketGrid />
    </div>

  )
}