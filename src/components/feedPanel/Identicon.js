// Based on https://github.com/stewartlord/identicon.js

/* eslint-disable */
import React from 'react';
import md5 from 'md5';

class Identicon extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    background: React.PropTypes.string,
    padding: React.PropTypes.number,
    size: React.PropTypes.number
  }

  static defaultProps = {
    background: '#F0F0F0',
    padding: 5,
    size: 30
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.canvas = this.refs.canvas.getContext('2d');
    this.renderIdenticon();
  }

  componentDidUpdate() {
    this.renderIdenticon();
  }

  squareSize() {
    let { padding, size } = this.props;
    return (size - (padding * 2)) / 5;
  }

  fillBlock(x, y, color, canvas) {
    let squareSize = this.squareSize();
    canvas.beginPath();
    canvas.rect(
      this.props.padding + x * squareSize,
      this.props.padding + y * squareSize,
      squareSize,
      squareSize
    );
    canvas.fillStyle = 'rgb('+color.join(',')+')';
    canvas.fill();
  }

  // Generates a consistent color from a hash value
  generateColor(hash) {
    let hue = parseInt(hash.substr(-7), 16) / 0xfffffff,
        saturation = .5,
        lightness = .7;
    return this.hsl2rgb(hue, saturation, lightness);
  }

  hsl2rgb(h, s, b) {
    h *= 6;
    s = [
      b += s *= b < .5 ? b : 1 - b,
      b - h % 1 * s * 2,
      b -= s *= 2,
      b,
      b + h % 1 * s,
      b + s
    ];
    return [
      Math.floor(s[ ~~h    % 6 ] * 255),  // red
      Math.floor(s[ (h|16) % 6 ] * 255),  // green
      Math.floor(s[ (h|8)  % 6 ] * 255)   // blue
    ];
  }

  renderIdenticon() {
    let canvas = this.canvas;
    let id = this.props.id;
    let hash = md5(id);
    let color = this.generateColor(hash);
    let size = this.props.size;

    canvas.beginPath();
    canvas.rect(0, 0, size, size);
    canvas.fillStyle = this.props.background;
    canvas.fill();

    var i;
    for (i = 0; i < 15; i++) {
      if(parseInt(hash.charAt(i), 16) % 2) {
        if (i < 5) {
          this.fillBlock(2, i, color, canvas);
        } else if (i < 10) {
          this.fillBlock(1, (i - 5), color, canvas);
          this.fillBlock(3, (i - 5), color, canvas);
        } else if (i < 15) {
          this.fillBlock(0, (i - 10), color, canvas);
          this.fillBlock(4, (i - 10), color, canvas);
        }
      }
    }
  };

  render() {
    let size = this.props.size;
    return <canvas ref="canvas" width={size} height={size} />;
  }
}

export default Identicon