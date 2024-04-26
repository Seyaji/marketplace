import styles from './menuBar.module.css'

function SearchBar() {
  return (
    <div className={styles.search}>

      <div className={styles.name_div}>
        <h3>MARKET</h3>
      </div>

      <div className={styles.search_bar}>
        <input className={styles.search_box} />

        <div className={styles.search_button}>
          SEARCH
        </div>

      </div>

    </div>
  )
}

function TopBar() {
  return (
    <div className={styles.top_bar}>
      <ul>
        <li>Top</li>
        <li>Row</li>
        <li>Things</li>
      </ul>
    </div>
  )
}

function BottomBar() {
  return (
    <div className={styles.bottom_bar}>
      <ul>
        <li>Bottom</li>
        <li>Row</li>
        <li>Categories</li>
      </ul>
    </div>
  )
}

export function MenuBar() {
  return (
    <div className={styles.menu_bar}>
      <TopBar />

      <div className={styles.search}>
        <SearchBar />
      </div>

      <BottomBar />
    </div>
  )
}