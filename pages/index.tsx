import indexStyles from '../styles/index.module.css';
import db from '../pg_db/db';
import Head from 'next/head';
import Link from 'next/link';
import {
  useEffect,
  useState,
} from 'react';

//REDUX
import { useSelector, useDispatch} from 'react-redux';
//

// ICONS
import StoreIcon from "@material-ui/icons/Store";
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';
//

export default function Home({ products }) {

  const { count, increment, decrement, clear } = useCounter();
  const [year, setYear] = useState<string>('');

  console.log(products);
  useEffect(() => {
    let date: string = new Date().getFullYear().toString();
    setYear(date);
  })

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
                <SearchIcon
                  aria-label="Search store" />
              </button>
            </form>
          </li>

          <li className={indexStyles.NavCart}>
            <button
              onClick={openCart}
              className={indexStyles.NavCartButton}>
              <LocalGroceryStoreIcon
                aria-label="Your cart" />
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

      <main className={indexStyles.Main}>
        <h2 className={indexStyles.MainTitle}>
          Tell your customers who you are.
        </h2>

        <article className={indexStyles.ProductsAndServices}>
          <section className={indexStyles.ProductHero}>
            <div className={indexStyles.ProductDescHero}>
              <h4>Flagship Product</h4>
              <p>Tell your customers about the product(s) you typically offer. They've come to you for a reason, now it's time to close the sale.</p>
            </div>
            <div className={indexStyles.ProductCardHero}>
              <div className={indexStyles.ProductCardImgHero}>
                <img src="https://via.placeholder.com/150" alt="" />
              </div>
              <div className={indexStyles.ProductCardInfoHero}>
                <div>Product: {products[0].item}</div>
                <div>Price: {products[0].price}</div>
                <div>In stock: {products[0].qty}</div>
                <Link href="/products"><a>More info</a></Link>
              </div>
            </div>
          </section>

          <section className={indexStyles.Product}>
            <div className={indexStyles.ProductDesc}>
              <h4>Standard Product</h4>
              <p>Add more products to your landing page help your customer quickly find what they need.</p>
            </div>
            <div className={indexStyles.ProductCard}>
              <div className={indexStyles.ProductCardImg}>
                <img src="https://via.placeholder.com/150" alt="" />
              </div>
              <div className={indexStyles.ProductCardInfo}>
                <div>Product: {products[1].item}</div>
                <div>Price: {products[1].price}</div>
                <div>In stock: {products[1].qty}</div>
                <Link href="/products"><a>More info</a></Link>
              </div>
            </div>
          </section>
          <section className={indexStyles.Services}>
            <div className={indexStyles.ServicesDesc}>
              <h4>Services</h4>
              <p>Place company details here.</p>
            </div>
          </section>
        </article>
      </main>

      <footer className={indexStyles.Footer}>
        <h4>footer</h4>
        <code>EndePointe</code>
        <p>&copy;{year}</p>
        <div>
          <p>Redux testing btns</p> 
          <div>
              <AddIcon 
                onClick={increment}
                component="button">Add</AddIcon>
              <RemoveIcon
                onClick={decrement}
                component="button">Rem</RemoveIcon>
              <ClearIcon
                onClick={() => clear}
                component="button">Clr</ClearIcon>
              <button
                onClick={count}
                type="button">
                Get Count
              </button>
          </div>
        </div>
      </footer>
    </>
  )
}

const useCounter = () => {
  const count = useSelector((state) => state.count);

  const dispatch = useDispatch();

  const increment = () => {
    dispatch({
      type: 'INCREMENT', 
    });
  }

  const decrement = () => {
    dispatch({
      type: 'DECREMENT', 
    });
  }

  const clear = () => {
    dispatch({
      type: 'CLEAR', 
    });
  }

  return { count, increment, decrement, clear};
}

export async function getStaticProps() {

  const products = await db.manyOrNone(`select * from products;`);

  return {
    props: {
      products,
    }
  }
}