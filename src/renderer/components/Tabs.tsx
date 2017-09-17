import * as React from 'react';
import { SegmentedControl, SegmentedControlItem } from 'react-desktop/macOs';

export class Tabs extends React.Component<any, any> {
  constructor() {
    super();
    this.state = { selected: 0 };
  }

  render() {
    return (
      <SegmentedControl box>
        {this.renderItems()}
      </SegmentedControl>
    );
  }

  renderItems() {
    return Object.keys(this.props.children || {})
      .map((key, index) => this.renderItem(index, key, this.props.children[key]));
  }

  renderItem(key: string | number, title: string, content: React.Component<any, any>) {
    return (
      <SegmentedControlItem
        key={key}
        title={title}
        selected={this.state.selected === key}
        onSelect={() => this.setState({ selected: key })}
      >
        {content}
      </SegmentedControlItem>
    );
  }
}