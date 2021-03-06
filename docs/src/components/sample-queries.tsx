import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  Selection,
  SelectionMode,
  CheckboxVisibility,
} from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';
import queries from './sample-queries-json.json';
import './sample-queries.css';

interface Item {
  key: number;
  num: number;
  soql: string;
}

// tslint:disable-next-line:no-empty-interface
export interface ISampleQueriesProps {
  onQuerySelected: (soql: string) => void;
}
export interface ISampleQueriesState {
  columns: IColumn[];
  items: Item[];
  selection: Selection;
}

export default class SampleQueries extends React.Component<ISampleQueriesProps, ISampleQueriesState> {
  constructor(props: ISampleQueriesProps) {
    super(props);
    this.state = {
      columns: this.getColumns(),
      items: this.getItems(),
      selection: new Selection({ onSelectionChanged: this.onSelectionChanged }),
    };
  }

  componentDidMount() {
    this.props.onQuerySelected(this.state.items[0].soql);
  }

  public getColumns = (): IColumn[] => {
    return [
      {
        key: 'column1',
        fieldName: 'num',
        name: '#',
        minWidth: 25,
        maxWidth: 25,
        isResizable: false,
        ariaLabel: '#',
        className: 'query-cell',
      },
      {
        key: 'column2',
        name: 'Query',
        fieldName: 'soql',
        minWidth: 1000,
        isResizable: false,
        ariaLabel: 'SOQL Query',
        className: 'query-cell',
        maxWidth: 700,
        isMultiline: true,
      },
    ];
  };

  public getItems = (): Item[] => {
    return queries.map((soql, key) => ({ key, num: key, soql }));
  };

  public onItemInvoked = (ev: any) => {
    // tslint:disable-next-line:no-console
    console.log(ev);
  };

  public onSelectionChanged = () => {
    this.props.onQuerySelected(this.state.items[this.state.selection.getSelectedIndices()[0]].soql);
  };

  public render() {
    return (
      <div>
        <div className="logo ms-font-xl">
          <div>Example Queries</div>
        </div>
        <DetailsList
          items={this.state.items}
          columns={this.state.columns}
          setKey="set"
          compact={true}
          initialFocusedIndex={0}
          layoutMode={DetailsListLayoutMode.fixedColumns}
          selectionMode={SelectionMode.single}
          onItemInvoked={this.onItemInvoked}
          checkboxVisibility={CheckboxVisibility.hidden}
          selection={this.state.selection}
        />
      </div>
    );
  }
}
