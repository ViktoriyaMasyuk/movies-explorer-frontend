import './Popup.css';

function Popup ({ isOpen, onClose, text }) {
    return (
        <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__container'>
                <button className='popup__close' type='button' onClick={onClose}></button>
                <p className='popup__text'>{text}</p>
            </div>
        </section>
    )
}
export default Popup;