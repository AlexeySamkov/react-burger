import styles from './NotFoundPage.module.css';
import ufo from '../../images/ufo.svg';
const NotFoundPage = () => {
  return (
    <section className={styles.section}>
      <h1 className={styles.header}>
        Ошибка 404
      </h1>
      <img src={ufo} alt="stolen by aliens" />
      <p>
        Страницу украл зеленый инопланентянин 
      </p>
    </section>
  )
}

export default NotFoundPage;