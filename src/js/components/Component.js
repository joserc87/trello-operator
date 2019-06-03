import $ from 'jquery'

export class Component {

  constructor(mountingPoint) {
    this.mountingPoint = mountingPoint
  }

  render() {
    return ''
  }

  mount() {
    $(this.mountingPoint).append(this.render())
  }

}
