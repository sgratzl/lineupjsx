import * as React from 'react';
import * as ReactDOM from 'react-dom';
import LineUp, {LineUpRanking, LineUpSupportColumn, LineUpColumn} from '../src';

const arr: any[] = [];
const cats = ['c1', 'c2', 'c3'];
for (let i = 0; i < 100; ++i) {
  arr.push({
    a: Math.random() * 10,
    d: `Row ${i}`,
    cat: cats[Math.floor(Math.random() * 3)],
    cat2: cats[Math.floor(Math.random() * 3)]
  });
}

interface IBuilder3State {
  selection: number[];
  sidePanelCollapsed: boolean;
  arr: any[];
  groupBy: string;
}

class Builder3 extends React.PureComponent<{}, IBuilder3State> {
  constructor(props: {}, context: any) {
    super(props, context);

    this.state =  {
      selection: [],
      sidePanelCollapsed: true,
      arr,
      groupBy: 'cat'
    };
  }

  render() {
    return <React.Fragment>
        <LineUp data={this.state.arr} sidePanel sidePanelCollapsed={this.state.sidePanelCollapsed} selection={this.state.selection} onSelectionChanged={(s) => this.setState({ selection: s})}>
        <LineUpRanking groupBy={this.state.groupBy} sortBy="a:desc">
          <LineUpSupportColumn type="*" />
          <LineUpColumn column="*" />
        </LineUpRanking>
        </LineUp>
        <div>
          <button onClick={() => this.setState({sidePanelCollapsed: !this.state.sidePanelCollapsed})}>Panel</button>
          <button onClick={() => this.setState({arr: this.state.arr.slice(10)})}>Data</button>
          <button onClick={() => this.setState({groupBy: this.state.groupBy === 'cat' ? 'cat2' : 'cat'})}>Group</button>
          {this.state.selection.map((d) => <div key={d}>{d}</div>)}
        </div>
      </React.Fragment>;
  }
}

ReactDOM.render(
  React.createElement(Builder3),
  document.querySelector('div')
);