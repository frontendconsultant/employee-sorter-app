import React, { Component } from 'react';
import Tabs from './Tabs';
import Accordion from './Accordion';
import ContactItem from './pages/ContactItem/ContactItem'

const config = require("./config.json");

class AppContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      const url = config.userUrl + '?results=' + config.numberCards + '&nat=US';
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: this.buildObject(result.results)
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    buildObject(result) {
      let sortedItems = result.sort((a, b) => (a.name.first > b.name.first ? 1 : -1));
     
      let obj = config.tabs.map(item => {
        item = this.filterItems(item, sortedItems);
        return item;
      })
      console.log(obj)
      return obj;
    }

    filterItems(alphabet, sortedObject) {
      let alphabetObject = {};
      let filterdObj = sortedObject.filter(item =>  item.name.first.charAt(0).toLowerCase() === alphabet);
      alphabetObject.alphabet = alphabet;
      alphabetObject.itemCollection = filterdObj;
      return alphabetObject;

    }
  
    render() {
      const { error, isLoaded, items } = this.state;
    
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <Tabs>
            {items.map(item => (
              <div label={item.alphabet} count={item.itemCollection.length}>
                 {
                   item.itemCollection.map( (coll, index) => (
                    <Accordion title={`${coll.name.last}, ${coll.name.first}`}>
                    <ContactItem
                      key={index}
                      name={`${coll.name.last}, ${coll.name.first.toUpperCase()}`}
                      email={coll.email}
                      pic={coll.picture.thumbnail}
                    />
                  </Accordion>
                   ))
                 }
              </div>
            ))}
          </Tabs>
        );
      }
    }
  }

  export default AppContainer;