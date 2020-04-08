import * as React from 'react';
import styles from './DevTest.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';


import IDevTestProps from './IDevTestProps';
import IDevTestState from './IDevTestState';
import ICodigoPostalItem from './ItemCodigoPostal/ICodigoPostalItem';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import "@pnp/polyfioll-ie11";
import { sp } from "@pnp/sp/presets/all";
import { escape } from '@microsoft/sp-lodash-subset';


export default class DevTest extends React.Component<IDevTestProps, {}> {

  private _columns: IColumn[];
  private _select: Selection;

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      ID: null,
      title: null,
      codPosCodigo: null,
      codPostalProvinciaCodigo: null,
      selectedItem: null
    };
    this.getItemsFromList = this.getItemsFromList.bind(this);

    this._columns = [
      {
        key: 'column1',
        name: 'ID',
        fieldName: 'id',
        minWidth: 10,
        maxWidth: 20,
        isResizable: false,
        data: 'number',
        onRender: (item: ICodigoPostalItem) => {
          return <span>{item.ID}</span>;
        },
        isPadded: true
      },
      {
        key: 'column2',
        name: 'Titulo',
        fieldName: 'title',
        minWidth: 170,
        maxWidth: 260,
        isRowHeader: true,
        isResizable: true,
        data: 'string',
        onRender: (item: ICodigoPostalItem) => {
          return <span>{item.title}</span>;
        },
        isPadded: true
      },
      {
        key: 'column3',
        name: 'Codigo',
        fieldName: 'codPosCodigo',
        minWidth: 70,
        maxWidth: 95,
        isResizable: true,
        data: 'string',
        onRender: (item: ICodigoPostalItem) => {
          return <span>{item.codPosCodigo}</span>;
        },
        isPadded: true
      },
      {
        key: 'column4',
        name: 'Provincia Codigo',
        fieldName: 'codPostalProvinciaCodigo',
        minWidth: 75,
        maxWidth: 90,
        isResizable: true,
        data: 'string',
        onRender: (item: ICodigoPostalItem) => {
          return <span>{item.codPostalProvinciaCodigo}</span>;
        }
      }
    ];

    this._select = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectedItem: this.getSelection()
        });
      }
    });

  }

  public componentDidMount() {
    this.getItemsFromList();
  }

  public getSelection() {
    const selectionCount = this._select.getSelectedCount();
    switch (selectionCount) {
      case 0:
        return null;
      case 1:
        return (this._select.getSelection()[0] as ICodigoPostalItem);
      default:
        return null;
    }
  }

  private getItemsFromList = () => {
    let arrayCodigos: ICodigoPostalItem[] = [];
    sp.web.lists.getByTitle("CodigosPostales").items.get().then((data: any[]) => {

      for (let index = 0; index < data.length; index++) {
        arrayCodigos.push({
          ID: data[index]["ID"],
          title: data[index]["title"],
          codPosCodigo: data[index]["codPosCodigo"],
          codPostalProvinciaCodigo: data[index]["CodPostalCodigo"]
        });
      }
      this.setState({ items: arrayCodigos });
    });
  }

  private _getKey(item: any, index?: number): string {
    return item.key;
  }




  public render(): React.ReactElement<IDevTestProps> {
    return (
      <div className={styles.devTest}>
        <DetailsList
          items={this.state.items}
          columns={this._columns}
          selectionMode={SelectionMode.single}
          selection={this._select}
          getKey={this._getKey}
          setKey="multiple"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
          selectionPreservedOnEmptyClick={false}
          enterModalSelectionOnTouch={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="Row checkbox"
        />
      </div>
    );
  }
}
