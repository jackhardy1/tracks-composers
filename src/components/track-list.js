import React, { Component } from 'react';
import api from '../api'
import  { Alert, Card, Layout } from 'antd'
const { Content, Header } = Layout;

class TrackList extends Component {

  constructor() {
    super()
    this.state = {
      tracks: [],
      composers: [],
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

  findComposer(composerId) {
    const composerInfo = this.state.composers.find(x => x.id === composerId)
    if (composerInfo) {
      return `${composerInfo.firstName} ${composerInfo.lastName}`
    }
    return 'Unknown'
  }

  fetch = () => {
    this.getTracks()
    this.getComposers()
  }

  getComposers() {
    api.composers
      .get()
      .then(
        data => {
          this.setState({
              composers: data,
            })
          },
          reason => {
            const errorMessage = `Failed to get composers - ${reason.message}`
            console.log(errorMessage)
            this.setState({ errorMessage })
        },
    )
  }

  getTracks() {
    api.tracks
      .get()
      .then(
        data => {
          const rockTracks = data.filter(x => x.genre === this.state.selectedGenre)
          const alphabeticalTracks = this.sortArrayByProperty(rockTracks, 'title')
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
      <div>
        <Layout>
        <Header style={{background: '#4da6ff'}}>
          <h1>Tracks</h1>
        </Header>
        <Content id='content' style={{ background: '#ECECEC', padding: '30px' }}>
          {this.state.tracks.map(track => {
            return (
              <Card key={track.id} title={track.title} style={{ width: 300 }}>
                <p>Genre: {track.genre}</p>
                <p>Composer: {this.findComposer(track.composerId)}</p>
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

export default TrackList;