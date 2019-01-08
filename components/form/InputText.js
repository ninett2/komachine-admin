import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  state = { hasText: false, hasFocus: false };
  handleChange = () => {
    if (this.input.current.value) {
      this.setState(() => ({ hasText: true }));
    } else {
      this.setState(() => ({ hasText: false }));
    }
  };
  handleFocus = () => {
    const { focusHandler } = this.props;
    this.setState(
      () => ({ hasFocus: true }),
      () => {
        if (focusHandler) {
          focusHandler(true);
        }
      },
    );
  };
  handleBlur = () => {
    const { focusHandler } = this.props;
    this.setState(
      () => ({ hasFocus: false }),
      () => {
        if (focusHandler) {
          focusHandler(false);
        }
      },
    );
  };
  render() {
    const { id, label, type, width, isCombine } = this.props;
    const { hasFocus } = this.state;
    return (
      <Wrapper width={width} hasFocus={hasFocus} isCombine={isCombine}>
        <Div>
          <Input
            ref={this.input}
            type={type}
            id={id}
            onChange={this.handleChange}
            width={width}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          <Label htmlFor={id} hasText={this.state.hasText}>
            {label}
          </Label>
        </Div>
      </Wrapper>
    );
  }
}

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string,
  isCombine: PropTypes.bool,
  focusHandler: PropTypes.func,
};

InputText.defaultProps = {
  label: '',
  type: 'text',
  width: '100%',
  isCombine: false,
  focusHandler: null,
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  margin: -1px -1px 0 0;
  width: ${props => props.width};
  border: 1px solid lightgray;
  background-color: white;
  vertical-align: top;
  ${props =>
    props.hasFocus &&
    css`
      border-color: black;
      z-index: 10;
    `};
  ${props =>
    props.isCombine &&
    css`
      border: 0;
      margin: 0;
    `};
`;

const Div = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
`;

export const Input = styled.input`
  width: calc(${props => props.width} - 3.8rem);
  border: 0;
  border-top: 1.8rem solid white;
  border-left: 1.8rem solid white;
  border-right: 1rem solid white;
  border-bottom: 0.5rem solid white;
  outline: 0;
  border-radius: 0;
  outline-style: none;
  appearance: none;
`;

const Label = styled.label`
  cursor: text;
  left: 1.8rem;
  position: absolute;
  margin: auto;
  color: #a3a3a3;
  user-select: none;
  transform-origin: 0 -3.2rem;
  transition: all 0.2s;
  ${props =>
    props.hasText &&
    `
    transform: scale(0.7);
  `};
  ${Input}:focus+& {
    transform: scale(0.7);
  }
`;
export default InputText;
