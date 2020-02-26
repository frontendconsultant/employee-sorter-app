import React, { Component } from 'react';
import Tabs from './components/Tabs';
import ExpandableList from './components/ExpandableList';
import ContactItem from './pages/ContactItem/ContactItem'

const config = require("./config.json");

class AppContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        changed:false
      };
      this.onClick = this.onClick.bind(this);
      this.myRef = React.createRef();
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
      const sortedItems = result.sort((a, b) => (a.name.first > b.name.first ? 1 : -1));
      const filteredMappedItems = config.tabs.map(item => {
        item = this.filterItems(item, sortedItems);
        return item;
      });

      return filteredMappedItems;
    }

    addProperty(item) {  
      const addedPropItem = item.map(val => {
         return {...val, isOpen:false};
      });
      return addedPropItem
    }

    filterItems(alphabet, sortedObject) {
      let alphabetObject = {};
      let filterdObj = sortedObject.filter(item =>  (item.name.first).charAt(0).toLowerCase() === alphabet);
      alphabetObject.alphabet = alphabet;
      alphabetObject.itemCollection = this.addProperty(filterdObj);
      return alphabetObject;

    }
    onClick(selectedname) {
      const {items} = this.state;
      const nameKey = selectedname.split(',')[1].charAt(1).toLowerCase();

      const selectedItem =  items.filter(item => (item.alphabet === nameKey));
      const updatedItem = selectedItem[0].itemCollection.map(value => {
        if(value.name.last.toLowerCase() === this.trimString(selectedname.split(',')[0].toLowerCase()) && 
        value.name.first.toLowerCase() === this.trimString(selectedname.split(',')[1].toLowerCase()) ) {
          return {...value, isOpen:true}
        }
        return {...value, isOpen:false}
        } );
 
        const finalObj = this.state.items.map(val => {
          if(val.alphabet === nameKey) {
            return {...val, itemCollection:updatedItem}
          }
          return val;
        });
          this.setState({isLoaded: true,
            items: finalObj,
           changed:true});       
    }


    trimString(str) {
      const strValue = str.split(' ').join('');
      return strValue;
    }
  
    render() {
      const { error, isLoaded, items } = this.state;
      
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div> 
               <img alt="loading" src="loading.gif" />
          </div>;
      } else {
        return (
          <Tabs>
            {items.map(item => (
              <div label={item.alphabet} count={item.itemCollection.length} ref={this.myRef}>
                 {
                   item.itemCollection.map( (coll, index) => (
          
                    <ExpandableList title={`${coll.name.last}, ${coll.name.first}`} isOpen={coll.isOpen} onClick={this.onClick}>
                    <ContactItem
                      key={index}
                      name={`${coll.name.last}, ${(coll.name.first).toUpperCase()}`}
                      email={coll.email}
                      pic={coll.picture.thumbnail}
                    />
                  </ExpandableList>
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