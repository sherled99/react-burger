import React from 'react';
import {AppHeader} from '../AppHeader/AppHeader';
import {BurgerIngredients} from '../BurgerIngredients/BurgerIngredients';
import {BurgerConstructor} from '../BurgerConstructor/BurgerConstructor';
import {burgerData} from '../../utils/data.js'
import style from'./App.module.css';

class App extends React.Component {
  state = {
    burgerIngredients: burgerData,
    burgerConstructor: [],
    totalPrice: 0
  }
  
  addIngridient = ({data}) => {
    if (this.state.burgerConstructor.length === 0 && data.type !== 'bun'){
      return;
    }
    this.setState(prevState => ({
      ...prevState,
      burgerConstructor:[
        ...prevState.burgerConstructor,
        data
      ],
      totalPrice: prevState.totalPrice + data.price
    }));
  }

  render() {
    return (
      <div className={`${style.App}`}>
        <AppHeader />
        <main className={`${style.container__burger} mb-10`}>
          <BurgerIngredients burgerIngredients={this.state.burgerIngredients} addIngridient={this.addIngridient} />
          <BurgerConstructor burgerConstructor={this.state.burgerConstructor} totalPrice={this.state.totalPrice} />
        </main>
      </div>
    );
  }
}

export default App;
