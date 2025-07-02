import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
import './ModalProduto.css';
import FormProduto from '../formproduto/FormProduto';


function ModalProduto() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='px-4 py-2 border border-white rounded-2xl bg-gray-800 text-white hover:bg-gray-700 hover:text-gray-100 transition-colors duration-300'>
                        Novo Produto
                    </button>
                }
                modal
            >
                 <FormProduto/>
            </Popup>
        </>
    );
}

export default ModalProduto;