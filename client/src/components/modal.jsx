import React from 'react'

import ModalStore from '../stores/modal'

import './modal.css'

const getState = () => ({
  display: ModalStore.get('display'),
  message: ModalStore.get('message'),
  onSuccess: ModalStore.get('onSuccess'),
  onFail: ModalStore.get('onFail')
})

class Modal extends React.Component {

  constructor () {
    super()
    this.state = getState()
  }

  componentDidMount () {
    ModalStore.on('change', this._onChange, this);
  }

  componentWillUnmount () {
    ModalStore.off('change', this._onChange, this);
  }

  render () {
    if (! this.state.display) return null;

    return (
      <div className='modal'>
        <p className='message'>{this.state.message}</p>
        <div className='buttons'>
          <button className='secondary' type='button' onClick={this.state.onSuccess}>
            <span className='halflings ok'>Yes</span>
          </button>
          <button className='secondary' type='button' onClick={this.state.onFail}>
            <span className='halflings remove'>No</span>
          </button>
        </div>
      </div>
    );
  }

  _onChange () {
    this.setState(getState());
  }
}

export default Modal
