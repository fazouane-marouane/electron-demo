import * as React from 'react';
import { Text } from 'react-desktop/macOs';
import { Tabs } from './components/Tabs';
import {inject, ILogger, ServicesIDs, Services} from './services';
import {Dummy} from './data-models/dummy';

let counter = 0;

export class App extends React.Component<undefined, undefined> {
  @inject(ServicesIDs.LoggerID)
  private logger: ILogger;

  render() {
    return (
      <Tabs>
        {
          {
            'Tab 1': <Text onClick={async () => this.logger.info('getAll', await Services.dummyAccess.getAll())}>GetAll</Text>,
            'Tab 2': <Text onClick={(async () => {
              const obj = Dummy.create();
              obj.name = `toto${counter++}`;
              this.logger.info('create', obj, await Services.dummyAccess.putOne(obj));
            })}>Content 2</Text>,
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
