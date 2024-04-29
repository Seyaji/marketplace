import styles from "./card.module.css"
import Image from "next/image";
export interface CardProps {
  name: string;
  url: string;
  date: string;
  author: string;
  description: string;
}


export function Card({ name, url, date, author, description }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.card_image}>
        <Image
          src={url}
          alt=""
          width={160}
          height={160}
        />
      </div>

      <div className={styles.card_header}>
        <h5 className={styles.underline}>{name}</h5>
        <h5>{author}</h5>
      </div>
    </div>
  )
}