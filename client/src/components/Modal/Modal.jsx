import '../Modal/Modal.css';
const Modal = ({show, onClose, onConfirm, children}) =>{
    if(!show){
        return null;
    }

    return(
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-cont">
                    {children}
                </div>
                <div className="modal-actions">
                    <button className="btn-confi" onClick={onConfirm}>Confirm</button>
                    <button className="btn-canc" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;