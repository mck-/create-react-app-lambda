import React, { Component } from "react"
import { Input, Row, Col, Layout, Table } from 'antd';
import "./App.css"
const { Search } = Input;
const { Header, Content } = Layout;


const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];


class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state

    return (
      <p>
        <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
        <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
        <br />
        <span>{msg}</span>
      </p>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <Layout>
        <Header>
          <Row>
            <Col span={12}>
              <Search
                placeholder="Which search term would you like to analyze?"
                onSearch={value => handleSearch(value)}
                size="large"/>
            </Col>
          </Row>
        </Header>
        <Content>
          <Row>
            <Col span={6} offset={1}>
              <Table dataSource={dataSource} columns={columns} />
            </Col>
            <Col span={6} offset={1}>
              <Table dataSource={dataSource} columns={columns} />
            </Col>
          </Row>
          <LambdaDemo />
        </Content>
      </Layout>
      </div>
    )
  }
}

export default App

function handleSearch(keywords) {
  console.log('searching with: ' + keywords);
  fetch("/.netlify/functions/scrape", {
    method: 'POST',
    body: 'test'
  })
    .then((err, res) => {
      console.log(err);
      console.log(res);
    });
}
