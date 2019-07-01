import React, { Component } from 'react';
import './App.css';
import api from './api'
import  { Alert, Card, Layout } from 'antd'
const { Content } = Layout;

class App extends Component {

  constructor() {
    super()
    this.state = {
      tracks: [],
      errorMessage: null,
      selectedGenre: 'rock'
    }
  }

  componentDidMount() {
    this.fetch()
  }

  sortArrayByProperty(array, propertyName) {
    return array.sort(function (a, b) {
      if(a[propertyName] < b[propertyName]) { return -1; }
      if(a[propertyName] > b[propertyName]) { return 1; }
      return 0;
    })
  }

  fetch = () => {
    this.setState({ loading: true })

    api.tracks
      .get()
      .then(
      data => {
        const rockTracks = data.filter(x => x.genre === this.state.selectedGenre)
        const alphabeticalTracks = this.sortArrayByProperty(rockTracks, 'title')
        console.log(alphabeticalTracks)
        this.setState({
            tracks: alphabeticalTracks,
          })
        },
        reason => {
          const errorMessage = `Failed to get tracks - ${reason.message}`
          console.log(errorMessage)
          this.setState({ errorMessage })
        },
      )
  }

  render() {
    return (
      <div className="App">
         <Layout>
          <Content id='content' style={{ background: '#ECECEC', padding: '30px' }}>
            {this.state.tracks.map(track => {
              return (
                <Card key={track.id} title={track.title} style={{ width: 300 }}>
                  <p>Genre: {track.genre}</p>
                </Card>
              )
            })
            }
          </Content>
        </Layout>


        {this.state.errorMessage ? (
            <Alert message={this.state.errorMessage} type="error" />
          ) : null
        }
       </div>
    );
  }
}

export default App;