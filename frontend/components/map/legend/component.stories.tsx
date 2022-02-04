import { useCallback, useState } from 'react';
import { Story } from '@storybook/react/types-6-0';

import Legend, { LegendProps } from './component';
import LegendItem from './item';

import LegendTypeBasic from './types/basic';
import LegendTypeChoropleth from './types/choropleth';
import LegendTypeGradient from './types/gradient';

import ITEMS from './mock';

export default {
  title: 'Components/Map/Legend',
  component: Legend,
};

const Template: Story<LegendProps> = (args) => {
  const [items, setItems] = useState(ITEMS);

  // Callbacks
  const onRemove = useCallback(
    (id) => {
      setItems(items.filter((x) => x.id !== id));
    },
    [items],
  );
  const onVisibilityChange = useCallback(
    (id, visibility) => {
      setItems(items.map((el) => (el.id === id ? { ...el, visibility } : el)));
    },
    [items],
  );

  return (
    <div className="bg-gray-50 p-10">
      <div style={{ maxWidth: 500 }}>
        <Legend {...args}>
          {items.map((i) => {
            const { type, items } = i;
            return (
              <LegendItem key={i.id} {...i} onRemove={onRemove} onVisibilityChange={onVisibilityChange}>
                {type === 'basic' && <LegendTypeBasic items={items} />}
                {type === 'choropleth' && <LegendTypeChoropleth items={items} />}
                {type === 'gradient' && <LegendTypeGradient items={items} />}
              </LegendItem>
            );
          })}
        </Legend>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  className: '',
};

export const MaxHeight = Template.bind({});
MaxHeight.args = {
  className: '',
  maxHeight: 300,
};
