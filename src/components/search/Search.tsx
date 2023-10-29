import React, { Component, ChangeEvent } from 'react';

interface SeacrhState {
  searchValue: string;
}

interface IProps {
  onSendRequest: (search: string) => void
}

class Seacrh extends Component<IProps, SeacrhState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchValue = event.target.value 

    this.setState({  searchValue });
  }

  onClickSearch = () =>{
    localStorage.setItem('searchValue', this.state.searchValue)
    this.props.onSendRequest(this.state.searchValue)
  }

  render() {
  return (
      <div>

        <input
          type="text"
          value={this.state.searchValue}
          onChange={this.handleInputChange}
        />
        <button onClick={this.onClickSearch}>Search</button>
      </div>
    );
  }
}

export default Seacrh;