import ICodigoPostalItem from './ItemCodigoPostal/ICodigoPostalItem';

export default interface IDevTestState {
    ID: number;
    title: string;
    codPosCodigo: string;
    codPostalProvinciaCodigo: string;
    items: ICodigoPostalItem[]
    selectedItem: ICodigoPostalItem;
    
}