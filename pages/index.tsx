import indexStyles from '../styles/index.module.css';
import db from '../pg_db/db';
import Head from 'next/head';
import Link from 'next/link';

export default function Home({ products }) {

  console.log(products);

  const openCart = (e: any) => {
    e.preventDefault();
    console.log(e.target.textContent + ' clicked');
  }

  const searchStore = (e: any) => {
    e.preventDefault();
    console.log(e.target.textContent + ' clicked');
  }

  return (
    <>
      <Head>
        <title>Clerk</title>
      </Head>
      <nav className={indexStyles.Nav}>
        <ul className={indexStyles.NavLinks}>
          <Link href="/products">
            <a className={indexStyles.NavLink}>Products</a></Link>
          <Link href="/about">
            <a className={indexStyles.NavLink}>About</a></Link>
          <Link href="/contact">
            <a className={indexStyles.NavLink}>Contact</a></Link>
        </ul>
        <ul className={indexStyles.NavSearchAndCart}>
          <li className={indexStyles.NavSearch}>
            <form
              className={indexStyles.NavSearchForm}
              onSubmit={searchStore}>
              <label htmlFor="search"></label>
              <input
                name="search"
                className={indexStyles.NavSearchFormInput}
                type="text" />
              <button
                className={indexStyles.NavSearchFormButton}>
                Search
            </button>
            </form>
          </li>
          <li className={indexStyles.NavCart}>
            <button
              onClick={openCart}
              className={indexStyles.NavCartButton}>
              Cart
            </button>
          </li>
        </ul>
      </nav>
      <header
        className={indexStyles.Header}>
        <div className={indexStyles.HeaderHL}>
          <h3 className={indexStyles.HeaderHLMessage}>Manage your store from one location.</h3>
          <Link href="/account/create"><a
            className={indexStyles.HeaderHLSignupLink}>Sign up now</a></Link>
        </div>
      </header>
      <main
        className={indexStyles.Main}>
        <article>
          <h2>Products List:</h2>
          {products.map((product, key) =>
            <div key={key}>
              <div>name: {product.name}</div>
              <div>price: {product.price}</div>
              <div>qty: {product.qty}</div>
            </div>
          )}
          <section>
            <h3>section</h3>
          </section>
        </article>
      </main>
      <footer>
        <h4>footer</h4>
      </footer>
    </>
  )
}

export async function getStaticProps() {

  const products = await db.manyOrNone(`select * from products;`);

  return {
    props: {
      products,
    }
  }
}