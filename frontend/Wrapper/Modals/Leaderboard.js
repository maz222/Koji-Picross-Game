import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Koji from '@withkoji/vcc';
import Modal from 'react-modal';
import styled from 'styled-components';
import LeaderboardForm from '../Forms/Leaderboard';

const CloseModalButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border: 0;
  background: 0;
  padding: 16px;
  font-size: 24px;
  cursor: pointer;
  color: ${({ textColor }) => textColor};
`;

class Leaderboard extends PureComponent {
  static propTypes = {
    onCloseClick: PropTypes.func,
  };

  static defaultProps = {
    onCloseClick() {},
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        contentLabel={'Leaderboard'}
        style={{
          content: {
            background: Koji.config.general.primaryColor,
            color: Koji.config.general.textColor,
            padding: 0,
            width: '90vw',
            minWidth: '280px',
            maxWidth: '480px',
            margin: '0 auto',
          },
          overlay: {
            padding: 0,
          }
        }}
      >
        <div>
          <CloseModalButton
            onClick={this.props.onCloseClick}
            textColor={Koji.config.general.textColor}
          >
            {'Close'}
          </CloseModalButton>
          <LeaderboardForm />
        </div>
      </Modal>
    );
  }
}

export default Leaderboard;