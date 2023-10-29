import React, { Component } from 'react';
import Persons from '../components/persons/Persons';
import Search from '../components/search/Search';

interface ParentState {
    messageSearch: string;
}
interface IProps {}
  

class Main extends Component <object, ParentState>  {
    constructor(props: IProps) {
        super(props);
        this.state = {
          messageSearch: '',
        };
      }
    
    handleRequestBookData = (search: string) => {
        this.setState({messageSearch: search})
    }

    render() {
        const { messageSearch } = this.state;
        
        return (
            <div>
                {messageSearch}
                <Search onSendRequest={this.handleRequestBookData} />
  
                <Persons search={messageSearch}/>
            </div>
        );
    }
}

export default Main;