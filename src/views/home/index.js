import React from "react";
import styles from "./styles";
import Nav from "nav";
import Hero from "hero";
import Heading from "heading";

const Home = (props) => {
  return(
    <div className={ styles.root } >
      <Heading />
      <Nav/>
      <Hero />
      Third eye
    </div>
  )
}

export default Home