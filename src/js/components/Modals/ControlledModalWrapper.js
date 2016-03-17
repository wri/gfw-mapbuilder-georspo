import React, { PropTypes } from 'react';

const closeSvg = '<use xlink:href="#shape-close" />';

/**
* Should be wrapped in a component with relative or absolute position
*/
export default function ControlledModalWrapper (props) {
  return (
    <div className='modal-container'>
      <div className='modal-background' onClick={props.onClose} />
      <article className='modal shadow'>
        <div title='close' className='close-icon pointer' onClick={props.onClose} >
          <svg dangerouslySetInnerHTML={{ __html: closeSvg }}/>
        </div>
          <div className='modal-content custom-scroll'>
            {props.children}
          </div>
      </article>
    </div>
  );
}

ControlledModalWrapper.propTypes = {
  onClose: PropTypes.func.isRequired
};
