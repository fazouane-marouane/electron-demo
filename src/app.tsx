import * as React from 'react';
import { Text } from 'react-desktop/macOs';
import { Tabs } from './components/Tabs';

export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <Tabs>
        {
          {
            'Tab 1': <Text>Content 1</Text>,
            'Tab 2': <Text>Content 2</Text>,
            'Tab 3': (
              <Tabs>
                {
                  {
                    'Tab 1': <Text>Content 1</Text>,
                    'Tab 2': <Text>Content 2</Text>,
                    'Tab 3': <Text>Content 3</Text>,
                    'Tab 4': <Text>Content 4</Text>
                  }
                }
              </Tabs>),
            'Tab 4': <Text>Content 4</Text>
          }
        }
      </Tabs>
    );
  }
}
