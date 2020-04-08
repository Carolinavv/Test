
import * as React from 'react';
import IListaCodigosPostalesState from './IListaCodigosPostalesState';
import IListaCodigosPostales from '../ItemCodigoPostal/ICodigoPostalItem';
import { sp } from "@pnp/sp/presets/all";
import "@pnp/polyfill-ie11";


export default class CodigosPostales extends React.Component<IListaCodigosPostalesState> {
 
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };

        this.getListaProveedores = this.getListaProveedores.bind(this);

    }


private getListaProveedores() {
    let arrayCodigos: IListaCodigosPostales[] = [];
    sp.web.lists.getByTitle("CodigosPostales").items.get().then((data: any[]) => {

        for (let index = 0; index < data.length; index++) {
            arrayCodigos.push({
                ID: data[index]["ID"],
                title: data[index]["Title"],
                codPosCodigo: data[index]["Codigo"],
                codPostalProvinciaCodigo: data[index]["CodPostalCodigo"]
            });
        }
        this.setState({ items: arrayCodigos, loading: false });
    });
}

}