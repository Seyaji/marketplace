import styles from "./new-listing.module.css"

// address: "123testADDR",
//         name: "Test Contract1",
//         author: "Author1",
//         image: "/next.svg",

function ContractForm() {
  return (
    <form className={styles.new_listing}>
      <h3>List Contract</h3>

      <div className={styles.form_group}>
        <label>Name: </label>
        <input type="text" id="name" placeholder="Contract Name" />
      </div>

      <div className={styles.form_group}>
        <label>Address: </label>
        <input type="text" id="address" placeholder="Contract Address" />
      </div>

      <div className={styles.form_group}>
        <label>Author: </label>
        <input type="text" id="author" placeholder="Contract Author/Owner" />
      </div>

      <div className={styles.form_group}>
        <label>Image: </label>
        <input type="text" id="image" placeholder="Listing Image Url" />
      </div>

      <button className={styles.form_button}>SUBMIT</button>

    </form>
  )
}

export default function ListContract() {
  return (
    <ContractForm />
  )
}