import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';
import PropTypes from 'prop-types';

const ContainerElem = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

class Container extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
  };

  render() {
    console.log('render container');
    return (
      <ContainerElem
        style={{ background: `url("${Koji.config.general.backgroundImage}?auto=format,compress&fit=max&h=${window.innerHeight * 2}&w=${window.innerWidth * 2}") no-repeat center center / cover` }}
      >
        {this.props.children}
      </ContainerElem>
    )
  }
}

export default Container;
