import React, { Component } from 'react';
import './persons.css'


interface IResponsePerson {
  results: Array<{
    name: string; 
    height: string; 
    mass: string; 
    hair_color: string; 
    skin_color: string; 
    eye_color: string; 
    gender: string; 
    url: string; 
}>
}

interface IStatePerson {
    data: IResponsePerson | null;
    loading: boolean;
    error: boolean |null;
    currentPage: number;
}

interface IProps {
  search: string;
}


class Persons extends Component<IProps, IStatePerson> {
    constructor(props: IProps) {
        super(props);
        this.state = {
          data:  null,
          loading: true,
          error: null,
          currentPage: 1,
        };
      }
    
      componentDidMount() {
        fetch(`https://swapi.dev/api/people/?page=${this.state.currentPage}&search=`,{
          method: 'GET', 
       })
         .then((response) => {
           if (!response.ok) {
             throw new Error('Network response was not ok');
           }
           return response.json();
         })
         .then((data:IResponsePerson) => {
           this.setState({ data, loading: false, error: null });
         })
         .catch((error) => {
           this.setState({ error, loading: false });
         });
      }

      componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IStatePerson>): void {
        if (this.state.currentPage !== prevState.currentPage) {
          fetch(`https://swapi.dev/api/people/?page=${this.state.currentPage}&search=${this.props.search}`,{
            method: 'GET', 
         })
           .then((response) => {
             if (!response.ok) {
               throw new Error('Network response was not ok');
             }
             return response.json();
           })
           .then((data:IResponsePerson) => {
             this.setState({ data, loading: false, error: null });
           })
           .catch((error) => {
             this.setState({ error, loading: false });
           });
        }

        if (this.props.search !== prevProps.search) {
          fetch(`https://swapi.dev/api/people/?page=1&search=${this.props.search}`,{
            method: 'GET', 
         })
           .then((response) => {
             if (!response.ok) {
               throw new Error('Network response was not ok');
             }
             return response.json();
           })
           .then((data:IResponsePerson) => {
             this.setState({ data, loading: false, error: null });
           })
           .catch((error) => {
             this.setState({ error, loading: false });
           });
        }
      }
      
      componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
          console.log(error)
          console.log(errorInfo)
      }
    
      handlePageChange = (newPage: number) => {
        this.setState({ currentPage: newPage, loading: true });
      }
    
    render() {
      const { currentPage, loading, data } = this.state;
      
      if(loading){
        return <div className='persons_center'>Загрузка</div>
      }
   
      if(!data?.results.length){
        return <div className='persons_center'>not found</div>
      }
      
      return (
      <div className='persons_center'>
        <div className='persons_flex'>

        {this.state.data?.results.map(person => 
        <div className='persons_flex_item' key={person.url}>
          <div>Fullname: {person.name}</div>
          <div>Height: {person.height || '-'}</div>
          <div>Color hair: {person.hair_color || '-'}</div>
          <div>Color skin: {person.skin_color || '-'}</div>
        </div>)
        }
        </div>
        <div className='person_pagination'>
          {currentPage}
          <button
            onClick={() => this.handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <button
            onClick={() => this.handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
      );
    }
}

export default Persons;